import { Route, Routes as ReactRoutes } from "react-router-dom";
import AddPost from "../components/addPost";
import Login from "../components/account/login";
import Signup from "../components/account/signup";
import React from "react";
import Error from "../components/_common/error";
import Profile from "../components/account/profile";
import ChangePassword from "../components/account/changePassword";
import Main from "../components/main";
import PATH from "../constants/path";
import Search from "../components/search";
import MyList from "../components/account/my_list";
import ForgotPassword from "../components/account/forgotPassword";
import NotFound from "../components/_common/notFound";
import Edit from "../components/edit";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path={PATH.ERROR} element={<Error />} />
      <Route path={PATH.HOME} element={<Main />} />
      <Route path={PATH.ADD_POST} element={<AddPost />} />
      <Route path={PATH.EDIT} element={<Edit />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.SIGNUP} element={<Signup />} />
      <Route path={PATH.CHANGE_PW} element={<ChangePassword />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.SEARCH} element={<Search />} />
      <Route path={PATH.FORGOT_PW} element={<ForgotPassword />} />
      <Route path={PATH.MY_LIST} element={<MyList />} />
      <Route path={"*"} element={<NotFound />} />
    </ReactRoutes>
  );
};
export default Routes;
