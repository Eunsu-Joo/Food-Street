import React from "react";
import { Container } from "@mui/material";
import BottomBar from "./components/_common/bottombar";
import Header from "./components/_common/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./routes";
import Loading from "./components/_common/loading";

function App() {
  //   const navigator = useNavigate(); 이 부분 떄문에 쿼리 초기화됨.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        retry: 1,
        cacheTime: 1000 * 60 * 10,
        refetchOnReconnect: false,
        retryOnMount: false,
        refetchOnWindowFocus: false
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Container sx={{ pt: 3 }} maxWidth={"lg"}>
        <Loading />
        <Routes />
        <BottomBar />
      </Container>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
