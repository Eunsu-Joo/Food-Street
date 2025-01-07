import { useEffect, useState } from "react";

type ObjType = {
  [key: string]: string;
};

interface InitValuesTypes {
  isError: boolean;
  message: ObjType;
}
const RegExp = {
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
  trim: /\s/g
};

const initValues: InitValuesTypes = {
  isError: false,
  message: {}
};

const useValidator = (inputs: ObjType) => {
  const [error, setError] = useState(initValues);
  let isError = false;
  let message: ObjType = {};

  const validateLogin = () => {
    if (inputs.email) {
      if (!RegExp.email.test(inputs.email)) {
        isError = true;
        message["email"] = "이메일을 형식으로 입력해주세요";
      }
    } else {
      isError = true;
      message["email"] = "이메일을 입력해주세요.";
    }
    if (!inputs.password) {
      isError = true;
      message["password"] = "비밀번호를 입력해주세요.";
    }
    setError({ isError, message });
    return !isError;
  };

  const validateSignup = () => {
    const { username, email, password, passwordCheck, questionAnswer } = inputs;
    //username
    if (!username) {
      isError = true;
      message["username"] = "닉네임을 입력해주세요.";
    }
    //email
    if (email) {
      if (!RegExp.email.test(email)) {
        isError = true;
        message["email"] = "이메일을 형식으로 입력해주세요";
      }
    } else {
      isError = true;
      message["email"] = "이메일을 입력해주세요.";
    }
    //password
    if (!password) {
      isError = true;
      message["password"] = "비밀번호를 입력해주세요.";
    }
    if (password) {
      if (!RegExp.password.test(password)) {
        isError = true;
        message["password"] = "비밀번호는 특수문자와 숫자를 포함하여 8-15자로 작성하세요.";
      }
    }
    //passwordCheck
    if (!passwordCheck) {
      isError = true;
      message["passwordCheck"] = "비밀번호를 다시 한번 입력해주세요.";
    }
    if (password !== passwordCheck) {
      isError = true;
      message["passwordCheck"] = "비밀번호가 일치하지 않습니다.";
    }
    if (!questionAnswer) {
      isError = true;
      message["questionAnswer"] = "질문에 답을 해야 합니다.";
    }
    setError({ isError, message });
    return !isError;
  };

  const validateEmail = () => {
    const { email, questionAnswer } = inputs;
    if (email) {
      if (!RegExp.email.test(email)) {
        isError = true;
        message["email"] = "이메일 형식으로 입력해주세요";
      }
    } else {
      isError = true;
      message["email"] = "이메일을 입력해주세요.";
    }
    if (!questionAnswer) {
      isError = true;
      message["questionAnswer"] = "답변을 입력해주세요.";
    }
    setError({ isError, message });
    return !isError;
  };
  const validateAddPost = () => {
    const { title, contents, ...rest } = inputs;

    if (!title) {
      isError = true;
      message["title"] = "상호명은 필수 입력 항목입니다.";
    }
    if (title && title.length > 20) {
      isError = true;
      message["title"] = "상호명을 20자 이내로 작성해주세요.";
    }
    if (!contents) {
      isError = true;
      message["contents"] = "상세내용은 필수 입력 항목입니다.";
    }
    if (contents && contents.length > 300) {
      isError = true;
      message["contents"] = "상세내용은 300자 이내로 작성해주세요.";
    }
    setError({ isError, message });
    return !isError;
  };
  const validateUserInfo = () => {
    const { email, username, questionAnswer } = inputs;
    if (email) {
      if (!RegExp.email.test(email)) {
        isError = true;
        message["email"] = "이메일을 형식으로 입력해주세요";
      }
    } else {
      isError = true;
      message["email"] = "이메일을 입력해주세요.";
    }
    if (!username) {
      isError = true;
      message["username"] = "닉네임을 입력해주세요.";
    }
    if (!questionAnswer) {
      isError = true;
      message["questionAnswer"] = "질문의 답을 적어주세요.";
    }
    // //password
    // if (!password) {
    //   isError = true;
    //   message["password"] = "비밀번호를 입력해주세요.";
    // }
    // if (password) {
    //   if (!RegExp.password.test(password)) {
    //     isError = true;
    //     message["password"] = "비밀번호는 특수문자와 숫자를 포함하여 8-15자로 작성하세요.";
    //   }
    // }
    setError({ isError, message });
    return !isError;
  };
  const validateChangePw = () => {
    const { currentPassword, password, passwordConfirmation } = inputs;
    //password
    if (!currentPassword) {
      isError = true;
      message["currentPassword"] = "현재 비밀번호를 입력해주세요.";
    }
    if (!password) {
      isError = true;
      message["password"] = "비밀번호를 입력해주세요.";
    }
    if (password) {
      if (!RegExp.password.test(password)) {
        isError = true;
        message["password"] = "비밀번호는 특수문자와 숫자를 포함하여 8-15자로 작성하세요.";
      }
    }
    //passwordCheck
    if (!passwordConfirmation) {
      isError = true;
      message["passwordConfirmation"] = "비밀번호를 다시 한번 입력해주세요.";
    }
    if (password !== passwordConfirmation) {
      isError = true;
      message["passwordConfirmation"] = "비밀번호가 일치하지 않습니다.";
    }
    setError({ isError, message });
    return !isError;
  };
  const validateResetPassword = () => {
    const { password, passwordConfirmation } = inputs;
    //password

    if (!password) {
      isError = true;
      message["password"] = "비밀번호를 입력해주세요.";
    }
    if (password) {
      if (!RegExp.password.test(password)) {
        isError = true;
        message["password"] = "비밀번호는 특수문자와 숫자를 포함하여 8-15자로 작성하세요.";
      }
    }
    //passwordCheck
    if (!passwordConfirmation) {
      isError = true;
      message["passwordConfirmation"] = "비밀번호를 다시 한번 입력해주세요.";
    }
    if (password !== passwordConfirmation) {
      isError = true;
      message["passwordConfirmation"] = "비밀번호가 일치하지 않습니다.";
    }
    setError({ isError, message });
    return !isError;
  };
  useEffect(() => {
    return () => {
      setError(initValues);
    };
  }, []);

  return { error, setError, validateResetPassword, validateLogin, validateSignup, validateEmail, validateAddPost, validateUserInfo, validateChangePw };
};
export default useValidator;
