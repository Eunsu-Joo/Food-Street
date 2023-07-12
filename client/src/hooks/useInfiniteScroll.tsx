import { RefObject, useEffect, useState } from "react";

const useInfiniteScroll = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entries], observer) => {
      setInView(entries.isIntersecting);
    });
    io.observe(ref.current as HTMLDivElement);
    return () => io.disconnect();
    //   어차피 <div />가 보이는 부분에서 inView가 true로 바뀌기 때문에 deps 빈배열로 놔도됨.
  }, []);
  return inView;
};
export default useInfiniteScroll;
