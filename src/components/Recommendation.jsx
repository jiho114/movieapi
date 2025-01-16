import { useEffect, useState } from "react";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

const Recommendation = () => {
  const [tv, setTv] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const recSlide = tv.slice(0, 10)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trending/tv/day`, {
          params: { api_key: API_KEY,  language: "ko-KR", },
        });
        setTv(response.data.results);
      } catch (error) {
        console.error("영상 데이터를 불러오는 도중 에러가 발생했습니다.", error);
      }
    };
    fetchMovies();
  }, [API_KEY]);

  console.log(tv)
  return (
    <div className='recommendation'>
      <h2>오늘의 추천작</h2>
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
              slidesPerView: 1
            }
          }}
        >
          {recSlide.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="recommendationSwiperContainer"
            >
              <div className="recommendationSlideBox">
                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt={item.id} />
                <div className="recommendationSlideTxtBox">
                  <h3>{item.name}</h3>
                  <span>{item.media_type === "tv" ? "TV" : "Movie"}</span>
                  <span>{item.first_air_date}</span>
                  <span>{item.vote_average}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
};

export default Recommendation;