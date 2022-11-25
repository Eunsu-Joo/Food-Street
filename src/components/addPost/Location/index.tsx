import UploadBox from "../_common/UploadBox";
import Box from "@mui/material/Box";
import { useState } from "react";
import DaumPostcode, { useDaumPostcodePopup } from "react-daum-postcode";
import KakaoMap from "./KakaoMap";
import { Button, Typography, Stack } from "@mui/material";
interface LocationProps {
  onChangeAddress: (address: string) => void;
  address: string;
}
const Location = ({ onChangeAddress, address }: LocationProps) => {
  const open = useDaumPostcodePopup();
  const uploadAddress = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onChangeAddress(fullAddress);
  };

  return (
    <Box>
      {address ? (
        <KakaoMap address={address as string} uploadAddress={uploadAddress} />
      ) : (
        <UploadBox title={"위치 업로드"} onClick={uploadAddress} />
      )}
    </Box>
  );
};
export default Location;
