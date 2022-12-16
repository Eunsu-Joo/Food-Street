import { Route, Routes as ReactRoutes } from "react-router-dom";
import Main from "../../main";
import AddPost from "../../addPost";
import Login from "../../account/login";
import Signup from "../../account/signup";
import ForgotPassword from "../../account/forgotPassword";
import React from "react";
import MainInfiniteScroll from "../../main/mainInfiniteScroll";
import MainPrefetch from "../../main/mainPrefetch";
import PATH from "../../../constants/path";
import Error from "../error";
import useUser from "../../../hooks/useUser";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path={PATH.ERROR} element={<Error />} />
      <Route path={PATH.HOME} element={<Main />} />
      <Route path={`${PATH.MAIN}/prefetch`} element={<MainPrefetch />} />
      <Route path={`${PATH.MAIN}/infinite_scroll`} element={<MainInfiniteScroll />} />
      <Route path={PATH.ADD_POST} element={<AddPost />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.SIGNUP} element={<Signup />} />
      <Route path={PATH.FORGOT_PW} element={<ForgotPassword />} />
    </ReactRoutes>
  );
};
export default Routes;
