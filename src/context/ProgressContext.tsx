import {createContext, ReactNode, useState} from "react";
import {ITask} from "../core/startup.ts";

interface IProgressContextProps {
  tasks: ITask[],
  setTasks: (tasks: ITask[]) => void,
  activeStage: number,
  setActiveStage: (stage: number) => void,
  isModalOpen: boolean,
  setIsModalOpen: (val: boolean) => void,
  modalBody: ReactNode,
  setModalBody: (body: ReactNode) => void,
  actionList: ReactNode[],
  setActionList: (actionList: ReactNode[]) => void
}
export const ProgressContext = createContext<IProgressContextProps>({
  tasks: [],
  actionList: [],
  activeStage: 1,
  isModalOpen: false,
  modalBody: undefined,
  setActionList(): void {},
  setActiveStage(): void {},
  setIsModalOpen(): void {},
  setModalBody(): void {},
  setTasks(): void {},
});

export const ProgressProvider = ({ children }: {children: ReactNode}) => {
  const [tasks, setTasks] = useState<ITask[]>(JSON.parse(localStorage.getItem('progress') || '[]'));
  const [activeStage, setActiveStage] = useState<number>(JSON.parse(localStorage.getItem('activeStage') || '1'))
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalBody, setModalBody] = useState<ReactNode>()
  const [actionList, setActionList] = useState<ReactNode[]>([])


  const value = {
    tasks,
    setTasks,
    activeStage,
    setActiveStage,
    isModalOpen,
    setIsModalOpen,
    modalBody,
    setModalBody,
    actionList,
    setActionList
  }
  return (
    <ProgressContext.Provider value={
      value
    }>
      {children}
    </ProgressContext.Provider>
  );
};