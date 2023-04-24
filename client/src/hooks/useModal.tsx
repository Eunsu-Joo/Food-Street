import { useEffect, useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controller = () => setIsOpen(!isOpen);
  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);
  return { isOpen, controller };
};
export default useModal;
