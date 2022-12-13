import {
  Button,
  Fade,
  Modal as ModalContainer,
  Typography,
} from "@mui/material";
import { Backdrop } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
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

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const title = "애러가 발생했습니다.";

  return (
    <>
      <Button onClick={handleOpen}>클릭</Button>
      <ModalContainer
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Typography variant="h6" textAlign={"center"}>
              {title}
            </Typography>
          </Box>
        </Fade>
      </ModalContainer>
    </>
  );
};
export default Modal;
