import { Route, Routes as ReactRoutes } from "react-router-dom";
import AddPost from "../components/addPost";
import Login from "../components/account/login";
import Signup from "../components/account/signup";
import React from "react";
import MainInfiniteScroll from "../components/main/mainInfiniteScroll";
import Error from "../components/_common/error";
import Profile from "../components/account/profile";
import ChangePassword from "../components/account/changePassword";
import Main from "../components/main";
import PATH from "../constants/path";
import Search from "../components/search";
import MyList from "../components/account/my_list";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path={PATH.ERROR} element={<Error />} />
      <Route path={PATH.HOME} element={<Main />} />
      <Route path={PATH.ADD_POST} element={<AddPost />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.SIGNUP} element={<Signup />} />
      <Route path={PATH.CHANGE_PW} element={<ChangePassword />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.SEARCH} element={<Search />} />
      {/*<Route path={PATH.FORGOT_PW} element={<ForgotPassword />} />*/}
      {/*<Route path={PATH.RESET_PW} element={<ResetPassword />} />*/}
      {/*<Route path={PATH.MY_LIST} element={<MyList />} />*/}
    </ReactRoutes>
  );
};
export default Routes;
