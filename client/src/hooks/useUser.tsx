import { useEffect, useState } from "react";
import SESSION_KEYS from "../constants/sessionKeys";
import { useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../constants/querykeys";

const useUser = () => {
  const { data: user } = useQuery<any>(
    QUERY_KEYS.USER,
    ({ queryKey }) => {
      // stale 이 끝나면 호출
      //  TODO 여기 할 차례.. session에 저장 시킨 데이터 어떻게 처리할 지
      return JSON.parse(sessionStorage.getItem(queryKey![0] as string) as string);
    },
    {
      //1. init데이터를 갖고 있는 시간 (0이면 받자마자 옛날 데이터라고 인식.
      // 길면 길어질수록 query 함수를 불러오는 텀이 길어짐.
      // 여기서는 변경이 거의 없으므로 유저가 페이지에 머무는 시간이라고 가정할꺼임.
      staleTime: 0,
      //호출 된 후 inactive가 되었을 때 캐싱된 상태로 남아있는 시간.
      cacheTime: 1000 * 60 * 15,
      initialData: sessionStorage.getItem(SESSION_KEYS.USER) ? JSON.parse(sessionStorage.getItem(SESSION_KEYS.USER) as string) : null,
      onSuccess: (received: any) => {
        // if (!received) {
        //   clearStoredUser();
        // } else {
        //   setStoredUser(received);
        // }
      }
    }
  );
  return { user };
};
export default useUser;
