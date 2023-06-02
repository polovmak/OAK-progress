import {stages} from "../App.const.ts";
import {Button} from "../shared/Button.tsx";

interface IActionButtonsProps {
  addTask: (stage: number) => void
}
const ActionButtons = ({addTask}: IActionButtonsProps) => {
  return (
    <div className='flex flex-row text-black absolute bottom-0 right-0'>
      <div>
        {stages.map((stage,idx) => <Button text={`Add Task to ${stage}`} onClick={() => addTask(idx + 1)}/>)}
      </div>
    </div>
  );
};

export default ActionButtons;