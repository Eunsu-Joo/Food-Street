import PlacesSearchResultItem = kakao.maps.services.PlacesSearchResultItem;
interface KakaoMapProps {
  onChangeAddress: (address: string) => void;
}
interface PositionType {
  lng: number;
  lat: number;
}
interface CustomMarkerItemType extends Pick<PlacesSearchResultItem, "address_name" | "place_name"> {
  position: PositionType;
  rate: number;
}
interface MarkerListItemProps {
  marker: CustomMarkerItemType;
}
export type { KakaoMapProps, MarkerListItemProps, CustomMarkerItemType, PositionType };
