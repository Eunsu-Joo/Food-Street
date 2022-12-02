import { CircularProgress, Stack, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      height={"calc(100vh - 300px)"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      sx={{ touchAction: "none" }}
    >
      <CircularProgress color={"primary"} size={50} sx={{ opacity: 0.6 }} />
      <Typography
        component={"p"}
        letterSpacing={4}
        ml={3.5}
        pt={4}
        fontSize={24}
        fontFamily={"Montserrat"}
        color={"primary"}
      >
        Loading...
      </Typography>
    </Stack>
  );
};
export default Loading;
