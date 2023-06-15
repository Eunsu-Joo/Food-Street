import AccountLayout from "../_common/AccountLayout";
import ProfileForm from "./ProfileForm";
import useUser from "../../../hooks/useUser";
import { Link, Navigate } from "react-router-dom";
import PATH from "../../../constants/path";
import { useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../../../constants/querykeys";
import fetcher from "../../../graphql/fetcher";
import { USER } from "../../../graphql/user";
import useModal from "../../../hooks/useModal";
import Modal from "../../modal";
import Loading from "../../_common/loading";
import { Button, Typography } from "@mui/material";
import React from "react";

const Profile = () => {
  const { data, isLoading } = useUser();
  if (isLoading) return <Loading />;
  return (
    <AccountLayout title={"PROFILE"}>
      <ProfileForm user={data.user} />
    </AccountLayout>
  );
};
export default Profile;
