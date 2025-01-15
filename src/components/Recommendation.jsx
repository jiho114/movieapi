import { useEffect, useState } from "react";
import axios from "axios";

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
      <h3>오늘의 추천작</h3>
      {tv.map((item, idx)=>(
        <>
        <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="" />
        </>
      ))}
    </div>
  );
};

export default Recommendation;