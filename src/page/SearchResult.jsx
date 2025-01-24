import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import '../css/SearchResult.css'
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function SearchResult() {
  const [movies, setMovies] = useState([]); // 영화 데이터 저장
  const [error, setError] = useState(""); // 에러 메시지 저장
  const location = useLocation(); // 현재 URL 정보 가져오기

  // URL에서 검색어 추출
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            language: "ko-KR", // 한국어 결과
            query: query, // 검색어 전달
            page: 1, // 첫 번째 페이지
          },
        });

        const results = response.data.results;
        if (results.length === 0) {
          setError("검색 결과가 없습니다.");
          setMovies([]);
        } else {
          setMovies(results);
          setError("");
        }
      } catch (err) {
        setError("검색 중 오류가 발생했습니다.");
        console.error(err);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]);

  return (
    <div className="searchResult">
      <h1>검색 결과: {query}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul className="searchReultUl">
        {movies.map((movie) => (
          <Link to={`/${movie.media_type}/${movie.id}`} key={movie.id}>
          <li key={movie.id} style={{ margin: "20px 0" }} className="searchResultLi">
            <h3>{movie.title}</h3>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width="150"
              />
            ) : (
              <p>포스터 없음</p>
            )}
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
