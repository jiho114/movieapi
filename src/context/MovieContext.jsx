import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trending/all/day`, {
          params: { api_key: API_KEY,  language: "ko-KR", },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("영상 데이터를 불러오는 도중 에러가 발생했습니다.", error);
      }
    };
    fetchMovies();
  }, [API_KEY]);

  return (
    <MovieContext.Provider value={{ movies }}>
      {children}
    </MovieContext.Provider>
  );
};