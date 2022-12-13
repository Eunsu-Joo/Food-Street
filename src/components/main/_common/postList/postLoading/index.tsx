import { Skeleton, Stack } from "@mui/material";

const PostLoading = () => {
  return (
    <Stack spacing={1} mb={2}>
      <Stack direction={"row"}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", ml: 2 }}
          width={"75%"}
        />
      </Stack>
      <Skeleton variant="rectangular" width={"90%"} height={120} />
      <Skeleton variant="rounded" width={"90%"} height={60} />
    </Stack>
  );
};
export default PostLoading;
