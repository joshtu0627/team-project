import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const MainSwiper = styled.div`
  overflow: hidden;
  position: relative;
`;

const SwiperContainer = styled.div`
  position: relative;
  width: auto;
  display: flex;
  align-item: center;
  justify-content: flex-start;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  margin-top: 7rem;
`;

const SwiperSlide = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SwiperSlideBar = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0.5rem;
`;

const SwiperSlideBarItem = styled.div`
  cursor: pointer;
  width: 10px;
  height: 10px;
  background: #cccccc;
  border: none;
  border-radius: 50%;
  margin-right: 6px;
  z-index: 25;

  ${(props: any) =>
    props.isActive &&
    `
    background: #fff;
  `}
`;

export default function Swiper({
  direction,
  autoplay,
  speed,
  width,
  height,
  urls,
}: {
  direction: string;
  speed: number;
  width: number;
  height: number;
  urls: string[];
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDone, setDone] = useState<boolean>(false);

  const timer = useRef<any>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  const startPlaySwiper = () => {
    // console.log("speed", speed);
    // console.log(width);

    if (speed <= 0) return;
    timer.current = setInterval(() => {
      setActiveIndex((preValue) => preValue + 1);
    }, speed * 1000);
  };

  const slideToOne = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    clearInterval(timer?.current);
  };

  useEffect(() => {
    startPlaySwiper();
    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, []);

  useEffect(() => {
    const swiper = document.querySelector("#swiper-container") as any;

    if (direction === "vertical") {
      swiper.style.bottom = (height as string)?.includes("%")
        ? `${activeIndex * +(height as string)?.replace("%", "")}vh`
        : `${activeIndex * +height}px`;
    } else {
      swiper.style.right = `${activeIndex * +width}px`;
    }
    if (activeIndex >= urls.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, urls]);

  return (
    <>
      <MainSwiper style={{ width: "100%" }}>
        <SwiperContainer
          ref={swiperContainerRef}
          id="swiper-container"
          style={{
            height: "auto",
            width,
            flexDirection: direction === "vertical" ? "column" : "row",
          }}
        >
          {urls.map((f: string, index: number) => (
            <SwiperSlide
              style={{
                width: width,
                display: "block",
              }}
            >
              <img
                src={f}
                style={{ width: "100%", height: "auto", overflow: "hidden" }}
                alt=""
              />
            </SwiperSlide>
          ))}
        </SwiperContainer>
        <SwiperSlideBar>
          {urls?.map((f: string, index: number) => (
            <SwiperSlideBarItem
              onClick={() => slideToOne(index)}
              isActive={index === activeIndex}
              onMouseEnter={() => {
                clearInterval(timer?.current);
                timer.current = null;
              }}
              onMouseLeave={() => {
                startPlaySwiper();
              }}
            ></SwiperSlideBarItem>
          ))}
        </SwiperSlideBar>
      </MainSwiper>
    </>
  );
}
