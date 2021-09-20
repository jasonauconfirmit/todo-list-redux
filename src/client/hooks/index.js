import { useRef } from "react";

export const useInitialMount = () => {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;

    // return true the very first render
    return true;
  }

  // return false every following render
  return false;
};
