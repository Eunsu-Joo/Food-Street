import Box from "@mui/material/Box";
import Coupon from "./Coupon";
import { Grid, styled } from "@mui/material";

const CouponList = () => {
  const CustomGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      border: "1px solid black",
      justifyContent: "center",
    },
  }));
  return (
    <CustomGrid container spacing={2} sx={{ py: 4 }}>
      {Array.from({ length: 20 }).map((item: any, index: number) => (
        <Coupon key={index} />
      ))}
    </CustomGrid>
  );
};
export default CouponList;
