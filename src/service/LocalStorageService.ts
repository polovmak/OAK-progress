import {ITask} from "../core/startup.ts";

export const updateActiveStageLocaleStorage = (activeStage: number) => {
  localStorage.setItem('activeStage', JSON.stringify(activeStage))
}

export const updateProgressLocaleStorage = (tasks: ITask[]) => {
  localStorage.setItem('progress', JSON.stringify(tasks))
}