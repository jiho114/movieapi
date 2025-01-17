import { useState, useEffect, act } from "react";
import { useParams } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null); // 영화 또는 TV 데이터
  const [mediaType, setMediaType] = useState(""); // 'movie' 또는 'tv' 타입 저장
  const [actors, setActors] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
          {
            params: { api_key: API_KEY, language: "ko-KR" },
          }
        );
        setContent(movieResponse.data);
        setMediaType("movie");

        const movieCredits = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
          {
            params: { api_key: API_KEY, language: "ko-KR" },
          }
        );
        setActors(movieCredits.data.cast);
      } catch {
        try {
          const tvResponse = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`,
            {
              params: { api_key: API_KEY, language: "ko-KR" },
            }
          );
          setContent(tvResponse.data);
          setMediaType("tv");

          const tvCredits = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`,
            {
              params: { api_key: API_KEY, language: "ko-KR" },
            }
          );
          setActors(tvCredits.data.cast);
        } catch (error) {
          console.error("에러 발생", error);
        }
      }
    };
    fetchContent();
  }, [id]);

  if (!content) return <div>영화 데이터를 불러오는 중입니다.</div>;

  return (
    <div className="moviedetail">
      <div className="moviedetailMain">
        <div className="moviedetailImgBox">
          {/* backdrop_path가 없으면 대체 이미지 표시 */}
          {content.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
              alt={content.title || content.name}
            />
          ) : (
            <div
              style={{
                color: "#535353",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              해당 컨텐츠의 이미지가 없습니다.
            </div>
          )}
        </div>
        <div className="moviedetailTxtBox">
          <h2>{content.title || content.name}</h2>
        </div>
      </div>
      <div className="moviedetailNotice">
        <div className="moviedetailDate">
          <p>개봉일자 : {content.release_date}</p>
          <div className="average">
            <IoIosStar />
            <p>{content.vote_average}</p>
          </div>
        </div>
        <div className="moviedetailOverView">
          <p>{content.overview}</p>
        </div>
      </div>
      <div className="moviedetailActor">
        <h2>{content.title ? content.title : content.name}의 출연진</h2>
        <ul className="movieActorList">
          {actors
            .filter((actor) => actor.profile_path) // 프로필 사진이 있는 배우만 필터링
            .slice(0, 8) // 상위 5명만 표시
            .map((actor) => (
              <li key={actor.id}>
                <Link to={`/actor/${actor.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    style={{ width: 100, height: 150 }}
                  />
                </Link>
                <p>{actor.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
