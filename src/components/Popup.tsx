import { createPortal } from "react-dom";

interface Props {
  setHelpShown: (shown: boolean) => void;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

function Popup({
  setHelpShown,
  title,
  className = "max-w-100",
  children,
}: Props) {
  return createPortal(
    <div
      className="top-0 right-0 bottom-0 left-0 z-50 fixed flex justify-center items-center bg-black/70 backdrop-blur-xs animate-fadeIn"
      onClick={() => setHelpShown(false)}
    >
      <div
        className={`z-10 absolute flex flex-col bg-(--mainBG) px-5 py-3 rounded-lg w-[90%] max-h-[85vh] text-white border-red-500 border-2 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0">
          <div className="w-[90%]">
            <h1 className="mb-2 text-2xl underline underline-offset-2">
              {title}
            </h1>
          </div>
          <div className="flex justify-end items-center w-[10%]">
            <i
              className="text-3md text-2xl cursor-pointer fa-solid fa-x"
              onClick={() => setHelpShown(false)}
            />
          </div>
        </header>
        <div className="custom-scrollbar pr-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Popup;
