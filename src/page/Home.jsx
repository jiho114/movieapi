import { useContext } from "react";
import { Link } from "react-router-dom";
import Recommendation from "../components/Recommendation";
import Actor from "../components/Actor";
import Todaytop from "../components/Todaytop";
import { IoIosStar } from "react-icons/io";
import { MovieContext } from "../context/MovieContext";

import { A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "../css/Home.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Home = () => {
  const { movies } = useContext(MovieContext);

  const sliceHomeSlide = movies.slice(1, 11);

  const actorData = [
    { id: 93405, title: "오징어게임 배우 출연작 보러가기" },
    { id: 278877, title: "전세계 열풍 지금 뜨는 해외 스타들" },
  ];
  return (
    <div className="home">
      <Swiper
        // install Swiper modules
        className="SwiperSlide"
        modules={[A11y, Autoplay]}
        spaceBetween={5}
        slidesPerView={3}
        autoplay={{
          delay: 5000, // 3초마다 자동으로 슬라이드 변경
          disableOnInteraction: false, // 사용자가 슬라이드를 조작한 후에도 autoplay 유지
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
          300: {
            slidesPerView: 1,
          },
          200: {
            slidesPerView: 1,
          },
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {sliceHomeSlide.map((item, idx) => (
          <SwiperSlide key={idx} className="homeSlideBox">
            <div className="homeSlideImgBox">
              <Link to={`/${item.media_type}/${item.id}`} key={item.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  alt={item.title}
                />
              </Link>
            </div>
            <div className="homeSlideTxtBox">
              <h2>{item.title ? item.title : item.name}</h2>
              <p>{item.release_date ? item.release_date : "2025-01-15"}</p>
              <div className="average">
                <IoIosStar />
                <span>{item.vote_average}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Recommendation></Recommendation>
      <Actor actorData={actorData[0]}></Actor>
      <Todaytop></Todaytop>
      <Actor actorData={actorData[1]}></Actor>
    </div>
  );
};

export default Home;
