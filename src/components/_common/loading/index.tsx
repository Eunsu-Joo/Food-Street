import { CircularProgress, Stack, Typography } from "@mui/material";
import { useIsFetching, useIsMutating } from "react-query";

const Loading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <>
      {!!isFetching && (
        <Stack height={"50vh"} mt={10} zIndex={100} bgcolor={"#fff"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} width={"100%"} left={0} top={0} right={0} bottom={0} position={"fixed"} sx={{ touchAction: "none" }}>
          <CircularProgress color={"primary"} size={50} sx={{ opacity: 0.6 }} />
          <Typography component={"p"} letterSpacing={4} ml={3.5} pt={4} fontSize={24} fontFamily={"Montserrat"} color={"primary"}>
            Loading...
          </Typography>
        </Stack>
      )}
    </>
  );
};
export default Loading;
