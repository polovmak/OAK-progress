import './App.css'
import {ReactNode, useContext} from "react";
import {ITask} from "./core/startup.ts";
import {stages} from "./App.const.ts";
import Task from "./components/Task.tsx";
import Modal from "./components/Modal.tsx";
import {Button} from "./shared/Button.tsx";
import {getRandomFact, IRandomFact} from "./api/RandomFact.ts";
import {updateActiveStageLocaleStorage, updateProgressLocaleStorage} from "./service/LocalStorageService.ts";
import {addTaskWhenProgressIsAhead, reopenTask} from "./ModalBodyConst.tsx";
import {ProgressContext} from "./context/ProgressContext.tsx";
import ActionButtons from "./components/ActionButtons.tsx";
import Stages from "./components/Stages.tsx";


function App() {
  const {tasks, setTasks, activeStage, setActiveStage, actionList, setActionList, setIsModalOpen, setModalBody, modalBody, isModalOpen} = useContext(ProgressContext)
  const handleCheck = (stageId: number, taskId: number, isCompleted: boolean) => {
    if(stageId < activeStage) {
      handleReopenTask(stageId, taskId)
    } else {
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, isCompleted };
        }
        return task;
      });

      checkForCompleteStage(updatedTasks, stageId)
      checkForCompleteProgress(updatedTasks)
      updateTasksList(updatedTasks)
    }
  }

  const checkForCompleteStage = (updatedTasks: ITask[], stageId: number) => {
    if(updatedTasks.filter(task => task.stage === stageId).every((task) => task.isCompleted)) {
      updateStage(stageId + 1)
    }
  }

  const checkForCompleteProgress = (updatedTasks: ITask[]) => {
    if(updatedTasks.every(task => task.isCompleted)) {
      getRandomFact().then((res: IRandomFact) => {
        setModalBody(res.text)
        setActionList([<Button text={'Cool'} onClick={() => setIsModalOpen(false)}/>])
      }).catch(() => setModalBody('There should be a fun fact, but server is in trouble.'))
        .finally(() => setIsModalOpen(true))
    }
  }

  const handleReopenTask = (stageId: number, taskId: number) => {
    setModalBody(reopenTask)
    setActionList([
      <Button text={'Cancel'} onClick={() => setIsModalOpen(false)}/>,
      <Button text={'Undo and reset progress'} onClick={() => handleUndoAndResetProgress(stageId, taskId)}/>])
    setIsModalOpen(true)
  }
  const handleChangeInput = (taskId: number, label: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, label };
      }
      return task;
    });

    updateTasksList(updatedTasks)
  }

  const updateStage = (stageId: number) => {
    updateActiveStageLocaleStorage(stageId)
    setActiveStage(stageId)
  }

  const handleCreateTaskAndCheck = (stageId: number) => {
    addTaskToList(stageId, true)
    setIsModalOpen(false)
  }

  const handleUndoAndResetProgress = (stageId: number, taskId: number) => {
    updateStage(stageId)
    const newTasks = tasks.map((task) => task.stage > stageId || taskId === task.id ? {...task, isCompleted: false} : task)
    updateTasksList(newTasks)
    setIsModalOpen(false)
  }

  const handleCreateTaskAndResetProgress = (stageId: number) => {
    updateStage(stageId)
    const newTasks = tasks.map((task) => task.stage > stageId ? {...task, isCompleted: false} : task)
    updateTasksList([...newTasks,
      {
        stage: stageId,
        label: `Task for ${stages[stageId-1]}`,
        id: tasks.length,
        isCompleted: false
      }])
    setIsModalOpen(false)
  }


  const addTask = (stageId: number) => {
    if(stageId < activeStage) {
      setModalBody(
        addTaskWhenProgressIsAhead
      )
      setActionList([
        <Button text={'Cancel'} onClick={() => setIsModalOpen(false)}/>,
        <Button text={'Create and check'} onClick={() => handleCreateTaskAndCheck(stageId)}/>,
        <Button text={'Create and reset progress'} onClick={() => handleCreateTaskAndResetProgress(stageId)}/>])
      setIsModalOpen(true)
    } else {
      addTaskToList(stageId)
    }
  }

  const addTaskToList = (stageId: number, isCompleted: boolean = false) => {
    const newTasks = [...tasks, {
      stage: stageId,
      label: `Task for ${stages[stageId-1]}`,
      id: tasks.length,
      isCompleted: isCompleted}]
    updateTasksList(newTasks)
  }

  const updateTasksList = (tasks: ITask[]) => {
    setTasks(tasks)
    updateProgressLocaleStorage(tasks)
  }

  const renderTasks = (stage: number): ReactNode => {
    const stageTasks = tasks.filter(task => task.stage === stage);

    return stageTasks.map(task => (
      <Task task={task} handleCheck={handleCheck} handleChangeInput={handleChangeInput}/>
    ));
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-300 relative">
      <ActionButtons addTask={addTask}/>
      <div className={"w-1/5 min-w-[300px] h-3/4 min-h-[500px] bg-white p-6 max-w-[300px] rounded"}>
        <h1 className="font-bold text-xl mb-8 sticky">My Startup Progress</h1>
        <Stages renderTasks={renderTasks}/>
      </div>
      <Modal isOpen={isModalOpen} actionList={actionList}>
        {modalBody}
      </Modal>
    </div>
  );
}

export default App;
