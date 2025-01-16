import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "../css/Home.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Todaytop = () => {
  const { movies } = useContext(MovieContext);
  const sliceMovie = movies.slice(0, 20)

  console.log(sliceMovie)

  return (
    <div className="todaytop">
      <h2>오늘의 TOP 20</h2>
      <Swiper
        className="Swiper"
        // install Swiper modules
        modules={[Navigation, A11y]}
        spaceBetween={25}
        slidesPerView={4}
        navigation
       >
      {sliceMovie.map((item, idx) => (
         <SwiperSlide key={idx} className="todaytopSwiperContainer">
          <h1>{idx+1}</h1>
           <div className="todaytopSlideBox">
                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt={item.id} />
                <div className="todaytopSlideTxtBox">
                  <h3>{item.title ? item.title : item.name}</h3>
                  <span>{item.first_air_date ? item.first_air_date : item.release_date}</span>
                  <span>{item.vote_average}</span>
                </div>
              </div>
       </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
};

export default Todaytop;
