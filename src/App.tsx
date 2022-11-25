import React from "react";
import { Container, GlobalStyles } from "@mui/material";
import PostList from "./components/posts/PostList";
import BottomBar from "./components/_common/BottomBar";
import Header from "./components/_common/header";
import { Route, Routes } from "react-router-dom";
import AddPost from "./components/addPost";
import Login from "./components/account/login";
import Signup from "./components/account/signup";
import ForgotPassword from "./components/account/forgotPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Container
        sx={{ pt: 10, minHeight: "calc(100vh - 56px)", pb: 10 }}
        maxWidth={"lg"}
      >
        <Header />
        <Routes>
          <Route path={"/"} element={<PostList />} />
          <Route path={"/add_post"} element={<AddPost />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/sign_up"} element={<Signup />} />
          <Route path={"/forgot_password"} element={<ForgotPassword />} />
        </Routes>
        <BottomBar />
      </Container>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
