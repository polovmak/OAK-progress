interface ICheckboxProps {
  checked: boolean
  title: string
  onChange: () => void
}
const Checkbox = ({checked, title, onChange}: ICheckboxProps) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange}/>
      <span>{title}</span>
    </label>
  );
};

export default Checkbox;