import AccountLayout from "../_common/AccountLayout";
import React, { ChangeEvent, FormEvent, useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordConfirm from "./ForgotPasswordConfirm";
export type FormType = {
  email: string;
  password: string;
};
const ForgotPassword = () => {
  const [forms, setForms] = useState<null | FormType>(null);
  return <AccountLayout title={"forgot password"}>{forms ? <ForgotPasswordConfirm forms={forms as FormType} /> : <ForgotPasswordForm setForms={setForms} />}</AccountLayout>;
};
export default ForgotPassword;
