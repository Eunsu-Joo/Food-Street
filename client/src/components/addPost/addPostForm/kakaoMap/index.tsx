import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { Button, Divider, Skeleton, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PlacesSearchResult = kakao.maps.services.PlacesSearchResult;
import type { CustomMarkerItemType, MarkerListItemProps, KakaoMapProps, PositionType } from "./kakaoMap.interface";
import { lightBlue } from "@mui/material/colors";

const defaultCenter = {
  lat: 33.450701,
  lng: 126.570667
};

const KakaoMap = ({ onChangeAddress }: KakaoMapProps) => {
  const [info, setInfo] = useState<null | CustomMarkerItemType>(null);
  const [markers, setMarkers] = useState<CustomMarkerItemType[]>([]);
  const [map, setMap] = useState<null | kakao.maps.Map>(null);
  const [center, setCenter] = useState<null | PositionType>(null);
  const [search, setSearch] = useState("");

  const displayPlaces = (data: PlacesSearchResult) => {
    if (!map) return;
    const bounds = new kakao.maps.LatLngBounds();
    let markers: CustomMarkerItemType[] = [];
    for (let i = 0; i < data.length; i++) {
      // @ts-ignore
      markers.push({
        position: {
          lat: +data[i].y,
          lng: +data[i].x
        },
        place_name: data[i].place_name,
        address_name: data[i].address_name,
        rate: i + 1
      });
      // @ts-ignore
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }
    setMarkers(markers);
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  };

  const searchPlaces = () => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(search, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search) {
      searchPlaces();
    }
  };

  const changeInfo = (marker: CustomMarkerItemType) => {
    setCenter(marker.position);
    setInfo(marker);
  };

  useEffect(() => {
    if (window) {
      const { kakao } = window as any;
      // 현재 위치 받아옴.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude: lat, longitude: lng } = pos.coords;
            setCenter({ lat, lng });
          },
          () => {
            alert("현재위치를 찾을 수 없습니다. 기본 위치로 이동합니다.");
            setCenter(defaultCenter);
          }
        );
      }
    }
  }, []);

  const MarkerListItem = ({ marker }: MarkerListItemProps) => {
    const isSelected = marker === info;
    return (
      <>
        <Stack flexDirection={"row"} bgcolor={isSelected ? lightBlue["50"] : "inherit"} alignItems={"flex-start"} pb={2} pt={1}>
          <Typography fontWeight={700} px={2} pt={0.8}>
            {marker.rate}
          </Typography>
          <Box fontSize={"0.9em"}>
            <Box display={"flex"} alignItems={"center"}>
              <Box component={"button"} bgcolor={"inherit"} border={0} fontSize={14} fontWeight={600} sx={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => changeInfo(marker)}>
                {marker.place_name}
              </Box>
              {isSelected && (
                <Button size={"small"} onClick={() => onChangeAddress(marker.address_name)}>
                  선택
                </Button>
              )}
            </Box>
            <p>주소 : {marker.address_name}</p>
          </Box>
        </Stack>
        <Divider />
      </>
    );
  };
  if (!center) return <Skeleton variant={"rectangular"} width={"100%"} height={"300px"} />;
  return (
    <Stack flexDirection={{ xs: "column", lg: "row" }} width={"100%"}>
      <Stack width={{ xs: "100%", md: "100%" }} height={{ xs: 200, md: 300 }} sx={{ overflowY: "scroll" }} id={"MarkersList"} order={{ xs: 3, md: 1 }}>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} component={"form"} mb={2} onSubmit={handleSubmit}>
          <TextField autoComplete={"off"} sx={{width:"calc(100% - 64px)"}} placeholder={"지역 + 상호명을 검색해주세요"} value={search} onChange={(event) => setSearch(event.target.value)} variant={"standard"} color={"primary"} size={"small"} />
          <Button size={"small"}>검색</Button>
        </Box>
        {markers.map((marker: CustomMarkerItemType) => (
          <MarkerListItem key={marker.rate} marker={marker} />
        ))}
      </Stack>

      <Map // 로드뷰를 표시할 Container
        // 지도 중심 좌표
        center={center}
        isPanto={true}
        style={{
          width: "100%",
          height: "300px",
          order: 2
        }}
        // 지도 확대 레벨
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker: CustomMarkerItemType) => (
          <MapMarker key={`marker-${marker.place_name}-${marker.position.lat},${marker.position.lng}`} position={marker.position} onClick={() => setInfo(marker)}>
            {info && info.place_name === marker.place_name && (
              <p>
                {marker.rate} {marker.place_name}
              </p>
            )}
          </MapMarker>
        ))}
        <ZoomControl position={kakao.maps.ControlPosition.BOTTOMLEFT} />
      </Map>
    </Stack>
  );
};
export default React.memo(KakaoMap);
