import {ReactNode} from "react";
import {Check} from "../shared/Check.tsx";
interface IStageProps {
  title: string,
  index: number
  children: ReactNode
  isActive: boolean
  isCompleted: boolean
}

const Stage = ({title, index, children, isActive, isCompleted}: IStageProps) => {
  return (
    <div className={`mb-6 ${!isActive ? 'pointer-events-none opacity-40' : 'pointer-events-auto'}`} >
      <div className="flex flex-row justify-between mb-6 mr-5">
        <div className="flex flex-row">
          <div className="rounded-full w-8 bg-black h-8 text-white text-xl text-center leading-8">{index}</div>
          <span className="text-black text-2xl font-bold ml-5">{title}</span>
        </div>
        {isCompleted && <Check/>}
      </div>
      {children}
    </div>
  );
};

export default Stage;