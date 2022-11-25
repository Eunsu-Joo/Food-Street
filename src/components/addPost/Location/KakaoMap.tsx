import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import Status = kakao.maps.services.Status;
import { Button, Skeleton, Stack, Typography } from "@mui/material";
interface KakaoMapProps {
  address: string;
  uploadAddress: (data: any) => void;
}
const KakaoMap = ({ address, uploadAddress }: KakaoMapProps) => {
  const [center, setCenter] = useState<any>(null);

  useEffect(() => {
    if (window) {
      const { kakao } = window as any;
      const geoCoder = new kakao.maps.services.Geocoder();
      geoCoder.addressSearch(address, (result: any, status: Status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coders = new kakao.maps.LatLng(result[0].x, result[0].y);
          setCenter({
            lat: coders.La,
            lng: coders.Ma,
          });
        }
      });
    }
  }, [address]);
  return (
    <>
      <Stack direction="row" alignItems={"center"} mb={1}>
        <Typography component={"span"} mr={1}>
          {address}
        </Typography>
        <Button
          variant={"text"}
          color={"primary"}
          size={"small"}
          onClick={uploadAddress}
        >
          위치 다시 찾기
        </Button>
      </Stack>
      {center ? (
        <Map
          center={center}
          style={{ width: "100%", height: "200px" }}
          level={3}
        >
          <MapMarker position={center} />
          <ZoomControl position={kakao.maps.ControlPosition.BOTTOMLEFT} />
        </Map>
      ) : (
        <Skeleton variant={"rectangular"} width={"100%"} height={"200px"} />
      )}
    </>
  );
};
export default KakaoMap;
