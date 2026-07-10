interface DropDownProps {
  children: React.ReactNode;
}

function DropDown({ children }: DropDownProps) {
  return (
    <div className="left-0 z-50 absolute flex flex-col bg-red-500 shadow-lg rounded-b w-50 md:w-50 min-w-37.5">
      {children}
    </div>
  );
}

export default DropDown;
