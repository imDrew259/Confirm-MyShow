import { useState } from "react";

const useFormInput = (validator) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const blurHandler = (value) => {
    setIsValid(validator(value));
  };

  const changeHandler = (value) => {
    if (!isTouched) setIsTouched(true);
    setEnteredValue(value);
    if (!isValid) setIsValid(true);
  };

  return { enteredValue, isValid, isTouched, changeHandler, blurHandler };
};

export default useFormInput;
