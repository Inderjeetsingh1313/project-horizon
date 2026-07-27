import { useEffect } from "react";

function useTimer(
  callback: () => void,
  delay: number,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;
     console.log("⏳ Timer Started");

    const timer = setTimeout(callback, delay);

    return () => clearTimeout(timer);
  }, [callback, delay, active]);
}

export default useTimer;