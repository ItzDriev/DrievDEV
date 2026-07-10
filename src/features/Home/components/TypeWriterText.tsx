import useTypewriter from "../../../hooks/useTypewriter";

interface TypewriterTextProps {
  text: string;
  active: boolean;
  className?: string;
}

function TypewriterText({ text, active, className }: TypewriterTextProps) {
  const display = useTypewriter(text, active);
  const typing = active && display.length < text.length;

  return (
    <span className={`whitespace-nowrap ${className ?? ""}`}>
      {display}
      {typing && (
        <span className="inline-block bg-current opacity-70 ml-0.5 w-0.5 h-[1em] align-middle animate-pulse" />
      )}
    </span>
  );
}

export default TypewriterText;
