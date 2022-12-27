import UploadBox from "../ImageUpload/UploadBox";
import Box from "@mui/material/Box";
import { FormEvent, useState } from "react";
import DaumPostcode, { useDaumPostcodePopup } from "react-daum-postcode";
import KakaoMap from "./KakaoMap";
import { Button, Typography, Stack, TextField } from "@mui/material";
interface LocationProps {
  onChangeAddress: (address: string) => void;
  address: string;
}
const Location = ({ onChangeAddress, address }: LocationProps) => {
  const [search, setSearch] = useState("");
  const open = useDaumPostcodePopup();
  const uploadAddress = async () => {
    await open({ onComplete: handleComplete });
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onChangeAddress(fullAddress);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(search);
  };
  return (
    <Stack>
      <Box autoCapitalize={"off"} flexDirection={"row"} alignItems={"center"} component={"form"} mb={2} onSubmit={handleSubmit}>
        <TextField value={search} onChange={(event) => setSearch(event.target.value)} variant={"standard"} sx={{ width: "80%" }} color={"primary"} size={"small"} />
        <Button size={"large"} sx={{ ml: 1 }}>
          검색
        </Button>
      </Box>
      {<KakaoMap address={address as string} uploadAddress={uploadAddress} />}
    </Stack>
  );
};
export default Location;
