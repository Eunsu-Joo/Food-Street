import SESSION_KEYS from "../constants/sessionKeys";
import { useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../constants/querykeys";
import fetcher from "../graphql/fetcher";
import { USER } from "../graphql/user";

const useUser = () => {
  /* 1. QUERY_KEYS.USER의 제일 초기 기본값은 signup, login으로 받는 값임.
     2. 각 컴포넌트에서 useUser를 호출할 때 initalData를 호출해서 그 값이 초기 값이 됨.
     3. 설정해놓은 cacheTime 이 끝나면, fetcher로 가져온 값이 다시 QUERY_KEYS.USER의 값이 됨.
  *
  * */
  const queryClient = useQueryClient();
  // @ts-ignore
  const { data, isLoading, isError } = useQuery<any>(
    QUERY_KEYS.USER,
    () => {
      // cacheTime 이 끝나면 호출
      if (!data?.user) return { user: null };
      // @ts-ignore
      const { user } = data;
      return fetcher(USER, { jwt: user.jwt });
    },
    {
      //1. init데이터를 갖고 있는 시간 (0이면 받자마자 옛날 데이터라고 인식.
      // 길면 길어질수록 query 함수를 불러오는 텀이 길어짐.
      // 여기서는 변경이 거의 없으므로 유저가 페이지에 머무는 시간이라고 가정할꺼임.
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      initialData: () => {
        return {
          user: sessionStorage.getItem(SESSION_KEYS.USER) ? JSON.parse(sessionStorage.getItem(SESSION_KEYS.USER) as string) : null
        };
      },
      enabled: false
    }
  );

  return { data, isLoading, isError };
};
export default useUser;
