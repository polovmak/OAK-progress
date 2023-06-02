import {ITask} from "../core/startup.ts";

interface ITaskProps {
  task: ITask
  handleCheck: (stageId: number, taskId: number, isCompleted: boolean) => void
  handleChangeInput: (taskId: number, label: string) => void
}
const Task = ({task, handleCheck, handleChangeInput}: ITaskProps) => {
  return (
    <div className="flex flex-row items-center w-full ml-2">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={e => handleCheck(task.stage, task.id, e.target.checked)}
        className="mr-3 accent-blue-700 w-4 h-4 hover:cursor-pointer"
      />
      <input
        type="text"
        value={task.label}
        onChange={e => handleChangeInput(task.id, e.target.value)}
      />
    </div>
  );
};

export default Task;