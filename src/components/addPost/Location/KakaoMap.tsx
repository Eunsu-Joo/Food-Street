import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import Status = kakao.maps.services.Status;
import { Button, Skeleton, Stack, Typography } from "@mui/material";
interface KakaoMapProps {
  address: string;
  uploadAddress: (data: any) => void;
}
const KakaoMap = ({ address, uploadAddress }: KakaoMapProps) => {
  // const [center, setCenter] = useState<any>(null);
  //
  // useEffect(() => {
  //   if (window) {
  //     const { kakao } = window as any;
  //     const geoCoder = new kakao.maps.services.Geocoder();
  //     geoCoder.addressSearch(address, (result: any, status: Status) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         const coders = new kakao.maps.LatLng(result[0].x, result[0].y);
  //         setCenter({
  //           lat: coders.La,
  //           lng: coders.Ma,
  //         });
  //       }
  //     });
  //   }
  // }, [address]);
  // return (
  //   <>
  //     <Stack direction="row" alignItems={"center"} mb={1}>
  //       <Typography component={"span"} mr={1}>
  //         {address}
  //       </Typography>
  //       <Button
  //         variant={"text"}
  //         color={"primary"}
  //         size={"small"}
  //         onClick={uploadAddress}
  //       >
  //         위치 다시 찾기
  //       </Button>
  //     </Stack>
  //     {center ? (
  //       <Map
  //         center={center}
  //         style={{ width: "100%", height: "200px" }}
  //         level={3}
  //       >
  //         <MapMarker position={center} />
  //         <ZoomControl position={kakao.maps.ControlPosition.BOTTOMLEFT} />
  //       </Map>
  //     ) : (
  //       <Skeleton variant={"rectangular"} width={"100%"} height={"200px"} />
  //     )}
  //   </>
  // );
  const [info, setInfo] = useState<any>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch("경희대 역전할맥", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567
      }}
      style={{
        width: "100%",
        height: "350px"
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker: any) => (
        <MapMarker key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`} position={marker.position} onClick={() => setInfo(marker)}>
          {info && info.content === marker.content && <div style={{ color: "#000" }}>{marker.content}</div>}
        </MapMarker>
      ))}
    </Map>
  );
};
export default KakaoMap;
