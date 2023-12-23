import Swiper from "../Swiper";
import useWindowWidth from "../../../hooks/useWindowWidth";
import "./index.css";

export default function Banner() {
  const windowWidth = useWindowWidth();

  return (
    <>
      <Swiper
        direction={"horizontal"}
        speed={5}
        width={windowWidth}
        height={300}
        urls={[
          "/assets/images/carousel-images/1.png",
          "/assets/images/carousel-images/1.png",
          "/assets/images/carousel-images/1.png",
        ]}
      ></Swiper>
    </>
  );
}
