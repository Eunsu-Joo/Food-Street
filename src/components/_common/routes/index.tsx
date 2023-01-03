import { Route, Routes as ReactRoutes } from "react-router-dom";
import AddPost from "../../addPost";
import Login from "../../account/login";
import Signup from "../../account/signup";
import React from "react";
import MainInfiniteScroll from "../../main/mainInfiniteScroll";
import Error from "../error";
import Profile from "../../account/profile";
import ChangePassword from "../../account/changePassword";
import Main from "../../main";
import MainPrefetch from "../../main/mainPrefetch";
import PATH from "../../../constants/path";
import Search from "../../search";
import MyList from "../../account/my_list";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path={PATH.ERROR} element={<Error />} />
      <Route path={PATH.HOME} element={<Main />} />
      <Route path={PATH.PREFETCH} element={<MainPrefetch />} />
      {/*<Route path={`${PATH.MAIN}/infinite_scroll`} element={<MainInfiniteScroll />} />*/}
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
