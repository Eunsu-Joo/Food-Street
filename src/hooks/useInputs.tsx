import { ChangeEvent, useState } from "react";
import { UseInputsProps } from "../types/hooks";

const useInputs = ({ defaultValues }: UseInputsProps) => {
  const [inputs, setInputs] = useState(defaultValues);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  return { inputs, onChange, setInputs };
};
export default useInputs;
