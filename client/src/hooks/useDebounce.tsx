import { useState, useEffect } from "react";

const useDebounce = () => {
  const [isDebounce, setIsDebounce] = useState(false);

  useEffect(() => {
    if (!isDebounce) return;
    const timer = setTimeout(() => {
      setIsDebounce(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [isDebounce]);
  return { isDebounce, setIsDebounce };
};

export default useDebounce;
