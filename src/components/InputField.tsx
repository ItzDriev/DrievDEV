interface InputFieldProps {
  value?: string;
  id?: string;
  type?: string;
  onChange?: (e: any) => void;
  onKeyDown?: string;
  onKeyDownFunc?: () => void;
  className?: string;
  placeholder: string;
}

function InputField({
  value,
  id,
  type,
  onChange,
  onKeyDown,
  onKeyDownFunc,
  className,
  placeholder,
}: InputFieldProps) {
  return (
    <input
      id={id}
      value={value}
      type={type}
      onChange={onChange}
      onKeyDown={async (e) => {
        if (e.key === onKeyDown && onKeyDownFunc) {
          onKeyDownFunc();
        }
      }}
      placeholder={placeholder}
      className={
        "px-2 border border-white rounded-xl outline-none placeholder:text-gray-500 text-neutral-50 focus:border-[#747bff] " +
        className
      }
    />
  );
}

export default InputField;
