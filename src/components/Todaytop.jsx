import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "../css/Home.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Todaytop = () => {
  const { movies } = useContext(MovieContext);
  const sliceMovie = movies.slice(0, 20);

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
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
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
      >
        {sliceMovie.map((item, idx) => (
          <SwiperSlide key={idx} className="todaytopSwiperContainer">
            <h1>{idx + 1}</h1>
            <div className="todaytopSlideBox">
              <Link to={`/${item.media_type}/${item.id}`} key={item.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  alt={item.id}
                />
              </Link>
              <div className="todaytopSlideTxtBox">
                <h3>{item.title ? item.title : item.name}</h3>
                <span>
                  {item.first_air_date
                    ? item.first_air_date
                    : item.release_date}
                </span>
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
