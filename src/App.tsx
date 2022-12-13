import React from "react";
import { Container, GlobalStyles } from "@mui/material";
import BottomBar from "./components/_common/bottombar";
import Header from "./components/_common/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./components/_common/routes";
import useUser from "./hooks/useUser";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 20,
        retry: 1,
        cacheTime: 1000 * 60 * 10,
        refetchOnReconnect: false,
        retryOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Container
        sx={{ pt: 10, minHeight: "calc(100vh - 56px)", pb: 10 }}
        maxWidth={"lg"}
      >
        <Header />
        <Routes />
        <BottomBar />
      </Container>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
