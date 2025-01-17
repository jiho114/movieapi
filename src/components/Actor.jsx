import { useEffect, useState } from "react";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

const Actor = ({ actorData }) => {
  const [actors, setActors] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // 환경변수에서 API 키 가져오기
  const BASE_URL = "https://api.themoviedb.org/3";
  
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tv/${actorData.id}/credits`, {
          params: {
            api_key: API_KEY,
            language: "ko-KR",
          },
        });
        setActors(response.data.cast); // 배우 데이터를 상태로 저장
      } catch (error) {
        console.error("배우 정보를 불러오는 도중 에러가 발생했습니다.", error);
      }
    };

    fetchActors();
  }, [API_KEY]);

  return (
    <div className="actor">
      <h2>{actorData.title}</h2>
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
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1
          },
          300: {
            slidesPerView: 1
          }, 200: {
            slidesPerView: 1
          }
        }}
      >
        {actors.map((item, idx) => (
          <SwiperSlide key={idx} className="actorSwiperContainer">
            <div className="actorSlideBox">
              <div className="actorImgBox">
                <Link to={`/actor/${item.id}`}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                    : "https://via.placeholder.com/w200"
                }
                alt={item.name}
              />
              </Link>
              </div>
              <div className="actorSlideTxtBox">
                <h3>{item.name}</h3>
                <p>{item.character}</p>
                <span>{item.media_type === "tv" ? "배우" : "영화배우"}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Actor;
