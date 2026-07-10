import { useState } from "react";
import DropDown from "./DropDown";

interface Props {
  text: string;
  className?: string;
  children?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

function NavLinkDropdown({
  text,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const showDropdown = isLinkHovered;

  return (
    <div
      className="relative flex flex-col justify-center md:h-full"
      onMouseLeave={() => {
        setIsLinkHovered(false);
        onMouseLeave;
      }}
    >
      {/* Parent link */}
      <button
        className={
          "text-white text-[1.2rem] flex items-center cursor-pointer py-1 px-2 rounded-xs " +
          (className || "")
        }
        onMouseEnter={() => {
          setIsLinkHovered(true);
          onMouseEnter;
        }}
      >
        {text}
        <i
          className={`ml-2 fas fa-caret-down transition-transform duration-200 ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown content */}
      {showDropdown && (
        <div className="top-full md:left-0 z-50 absolute flex flex-col items-center">
          <DropDown>{children}</DropDown>
        </div>
      )}
    </div>
  );
}

export default NavLinkDropdown;
