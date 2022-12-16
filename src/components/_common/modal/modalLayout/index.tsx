import { Fade, Modal as ModalContainer, Typography } from "@mui/material";
import { Backdrop } from "@mui/material";
import Box from "@mui/material/Box";
import ModalDefaultProps from "../modal.interface";
import type { ReactNode } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalLayout = ({
  children,
  isOpen,
  onToggle,
}: ModalDefaultProps & { children: ReactNode }) => {
  return (
    <ModalContainer
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onToggle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography variant="h6" textAlign={"center"}>
            {children}
          </Typography>
        </Box>
      </Fade>
    </ModalContainer>
  );
};
export default ModalLayout;
