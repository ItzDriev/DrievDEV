import { useEffect, useState } from "react";

function useTypewriter(text: string, active: boolean, speed = 25) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplay("");
      return;
    }

    let i = 0;
    setDisplay("");
    const interval = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [active, text, speed]);

  return display;
}

export default useTypewriter;
