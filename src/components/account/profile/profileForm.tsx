import Box from "@mui/material/Box";
import { FormEvent, useState } from "react";
import useUser from "../../../hooks/useUser";

const ProfileForm = () => {
  const { user } = useUser();
  const [inputs, setInputs] = useState({
    username: user?.user.username ?? "",
    email: user?.user.email ?? "",
    password: "",
    passwordCheck: ""
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return <Box component={"form"} onSubmit={handleSubmit}></Box>;
};
export default ProfileForm;
