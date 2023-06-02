import {stages} from "../App.const.ts";
import Stage from "./Stage.tsx";
import {ReactNode, useContext} from "react";
import {ProgressContext} from "../context/ProgressContext.tsx";

interface IStagesProps {
  renderTasks: (stage: number) => ReactNode
}

const Stages = ({renderTasks}: IStagesProps) => {
  const {activeStage} = useContext(ProgressContext)

  return (
    <div className="h-5/6 overflow-y-auto">
      {
        stages.map((stage, idx) =>
          <Stage title={stage}
                 index={idx+1}
                 key={stage}
                 isActive={activeStage > idx }
                 isCompleted={activeStage > idx + 1 }
          >
            {renderTasks(idx+1)}
          </Stage>
        )
      }
    </div>
  );
};

export default Stages;