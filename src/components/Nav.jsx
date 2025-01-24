import "../css/Home.css";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import { CiSearch } from "react-icons/ci";
import { useState } from "react"; // useState 추가

const Nav = () => {
  const [query, setQuery] = useState(""); // 검색어 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const handleSearch = () => {
    if (query.trim()) {
      // 검색어가 입력된 경우 검색 결과 페이지로 이동
      navigate(`/search?query=${encodeURIComponent(query)}`);
    } else {
      alert("검색어를 입력해주세요."); // 검색어가 없을 경우 알림
    }
  };

  return (
    <div className="nav">
      <Link to="/">
        <h1>Movie Site</h1>
      </Link>
      <div className="searchbar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // 입력값 상태 업데이트
          placeholder="영화를 검색하세요..."
        />
        <CiSearch className="icon" onClick={handleSearch} style={{cursor:"pointer"}}/>
      </div>
    </div>
  );
};

export default Nav;
