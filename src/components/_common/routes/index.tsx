import { Route, Routes as ReactRoutes } from "react-router-dom";
import Main from "../../main";
import AddPost from "../../addPost";
import Login from "../../account/login";
import Signup from "../../account/signup";
import ForgotPassword from "../../account/forgotPassword";
import React from "react";
import MainInfiniteScroll from "../../main/mainInfiniteScroll";
import MainPrefetch from "../../main/mainPrefetch";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path={"/"} element={<Main />} />
      <Route path={"/main/prefetch"} element={<MainPrefetch />} />
      <Route path={"/main/infinite-scroll"} element={<MainInfiniteScroll />} />
      <Route path={"/add_post"} element={<AddPost />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/sign_up"} element={<Signup />} />
      <Route path={"/forgot_password"} element={<ForgotPassword />} />
    </ReactRoutes>
  );
};
export default Routes;
