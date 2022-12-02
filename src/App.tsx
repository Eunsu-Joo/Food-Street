import React from "react";
import { Container, GlobalStyles } from "@mui/material";
import BottomBar from "./components/_common/BottomBar";
import Header from "./components/_common/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CustomRoutes from "./components/_common/CustomRoutes";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Container
        sx={{ pt: 10, minHeight: "calc(100vh - 56px)", pb: 10 }}
        maxWidth={"lg"}
      >
        <Header />
        <CustomRoutes />
        <BottomBar />
      </Container>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
