import React from "react";
import { Container, GlobalStyles } from "@mui/material";
import Header from "./components/_common/Header";
import CouponList from "./components/coupon/CouponList";
import BottomBar from "./components/_common/BottomBar";

function App() {
  return (
    <div className="App">
      <Container style={{ border: "1px solid black" }} maxWidth={"lg"}>
        <Header />
        <CouponList />
        <BottomBar />
      </Container>
    </div>
  );
}

export default App;
