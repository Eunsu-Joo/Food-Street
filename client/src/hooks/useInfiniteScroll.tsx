import { RefObject, useEffect, useState } from "react";

const useInfiniteScroll = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([entries], observer) => {
      setInView(entries.isIntersecting);
    });
    io.observe(ref.current as HTMLDivElement);
    return () => io.disconnect();
  }, [ref.current]);
  return inView;
};
export default useInfiniteScroll;
