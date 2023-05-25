import React from "react";
import BottomBar from "./components/_common/bottombar";
import Header from "./components/_common/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./routes";
import MainLayout from "./components/_common/mainLayout";

function App() {
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
      <MainLayout>
        <Routes />
        <BottomBar />
      </MainLayout>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
