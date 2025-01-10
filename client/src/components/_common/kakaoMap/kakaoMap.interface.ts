import PlacesSearchResultItem = kakao.maps.services.PlacesSearchResultItem;
import Address = kakao.maps.services.Address;
import RoadAaddress = kakao.maps.services.RoadAaddress;
interface KakaoMapProps {
  onChangeAddress: (address: string, place: string) => void;
  address: string;
  place_name: string;
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
type AddressSearchResultType = Array<{
  /**
   * 전체 지번 주소 또는 전체 도로명 주소, 입력에 따라 결정됨
   */
  address_name: string;
  /**
   * address_name의 값의 타입(Type)
   * 다음 중 하나:
   * REGION(지명)
   * ROAD(도로명)
   * REGION_ADDR(지번 주소)
   * ROAD_ADDR(도로명 주소)
   */
  address_type: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR";
  /**
   * X 좌표값, 경위도인 경우 경도(longitude)
   */
  x: string;
  /**
   * Y 좌표값, 경위도인 경우 위도(latitude)
   */
  y: string;
  /**
   * 지번 주소 상세 정보
   */
  address: Address;
  /**
   * 도로명 주소 상세 정보
   */
  road_address: RoadAaddress;
}>;
export type { AddressSearchResultType, KakaoMapProps, MarkerListItemProps, CustomMarkerItemType, PositionType };
