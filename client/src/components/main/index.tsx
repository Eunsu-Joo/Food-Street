import MainLayout from "../_common/mainLayout";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useEffect, useRef, useState } from "react";

const Main = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([entries], observer) => {
      console.log(entries);
    });
    io.observe(ref.current as HTMLDivElement);
  }, [ref.current]);
  return (
    <MainLayout>
      <p style={{ height: "200vh" }}>dff</p>
      <div ref={ref} style={{ border: "2px solid black" }} />
    </MainLayout>
  );
};
export default Main;
