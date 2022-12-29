import type { Dispatch, SetStateAction } from "react";
import type { UserType } from "./user";
import type { ObjType } from "./index";

export interface LoginUserProps {
  identifier: string;
  password: string;
}
export interface SignupUserProps {
  email: string;
  username: string;
  password: string;
}
export interface AddPostProps {
  name: string;
  contents: string;
  start_time?: string;
  end_time?: string;
  address?: string;
  image?: File;
  user: UserType;
}
export interface UpdateUserInfoProps {
  username: string;
  email: string;
  image?: any;
}
export interface UploadImageProps {
  image: File;
  user: UserType;
}
export interface UsePostsProps {
  currentPage: number;
  isPrefetch: boolean;
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

export interface UseInputsProps {
  defaultValues: ObjType;
}
export interface ChangePasswordProps {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
