import { Dispatch, SetStateAction } from "react";
import { UserType } from "./user";

export interface ObjType {
  [key: string]: any;
}
export interface LoginUserProps {
  identifier: string;
  password: string;
}
export interface SignupUserProps {
  email: string;
  username: string;
  password: string;
}
export interface UploadImageProps {
  image: File;
  user: UserType;
}
export interface UseSignupProps {
  email: string;
  username: string;
  password: string;
}

export interface HooksDefaultProps {
  validateError?: ObjType;
  setError: Dispatch<SetStateAction<ObjType>>;
}
