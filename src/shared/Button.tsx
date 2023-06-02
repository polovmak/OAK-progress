interface IButtonProps {
  text: string,
  onClick: () => void
  color?: string,
}
export const Button = ({ text, color, onClick }: IButtonProps) => {
  return <button
    className={`px-2 py-1 font-semibold rounded min-w-[75px] ${color ?? ''}`}
    onClick={onClick}
  >
    {text}
  </button>
};