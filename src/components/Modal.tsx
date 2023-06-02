import {ReactNode} from 'react';

interface IModalProps {
  isOpen: boolean,
  children: ReactNode
  actionList: ReactNode[]
}
const Modal = ({ isOpen, children, actionList } : IModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white rounded-lg z-20 p-2 min-w-[35%] max-w-[40%] flex flex-col">
            <div className="py-4">{children}</div>
            <div className="w-full border-t-2 flex justify-end">
              <div className="mt-2 flex space-x-2">
                {...actionList}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;