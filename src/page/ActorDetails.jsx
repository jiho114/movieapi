import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import '../css/ActorDetails.css'

const ActorDetails = () => {
  const { actorId } = useParams(); // URL 파라미터에서 actorId 받기
  const [actorDetails, setActorDetails] = useState(null);
  const [knownFor, setKnownFor] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!actorId) return; // actorId가 없으면 API 호출하지 않음

    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}`,
          {
            params: { api_key: API_KEY, language: "ko-KR" },
          }
        );
        setActorDetails(response.data);

        const knownForResponse = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`,
          {
            params: { api_key: API_KEY, language: "ko-KR" },
          }
        );
        setKnownFor(knownForResponse.data.cast);
      } catch (error) {
        console.error("배우 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchActorDetails();
  }, [actorId]); // actorId가 바뀔 때마다 재호출

  if (!actorDetails) return <div>배우 정보를 불러오는 중...</div>;
  console.log(actorDetails);

  return (
    <div className="actordetails">
      <div className="actordetailsMain">
        <div className="actordetailsImgBox">
          <img
            src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
            alt={actorDetails.name}
          />
          <div className="actordetailsTxt">
            <h2>{actorDetails.name}</h2>
            <p>{actorDetails.birthday}</p>
            <p>{actorDetails.gender === 2 ? "남성" : "여성"}</p>
          </div>
        </div>
        <div className="actordetailsTxtndRe">
          <div className="actordetailsRe">
            <ul>
              {knownFor.slice(0,10).map((movie) => (
                <li key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
                  <div className="average">
                   <IoIosStar></IoIosStar>
                   <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
