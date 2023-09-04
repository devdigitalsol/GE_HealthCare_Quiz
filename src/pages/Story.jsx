import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../context";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import S1 from "./../images/s1.png";
import S2 from "./../images/s2.png";
import S3 from "./../images/s3.png";

const slideData = [
  {
    image: S1,
  },
  {
    image: S2,
  },
  {
    image: S3,
  },
];
export default function Story() {
  let navigate = useNavigate();
  const { info } = useContext(AppContext);
  useEffect(() => {
    if (!info) {
      navigate("/");
    }
  }, [info, navigate]);

  const handleClick = () => {
    navigate("/intro");
  };
  if (info) {
    return (
      <div className="w-full relative">
        <Swiper
          pagination={{
            el: ".swiper-pagination",
          }}
          spaceBetween={0}
          modules={[Pagination]}
          slidesPerView={1}
        >
          {slideData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-[100%] pt-4 px-8">
                <img src={slide.image} alt="slider image" />
                {index === 2 && (
                  <div className="text-center mt-3">
                    <button className="btn" onClick={handleClick}>
                      Next
                    </button>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination !-bottom-[30px] text-center mx-auto w-full gap-2 flex items-center justify-center"></div>
      </div>
    );
  }
}
