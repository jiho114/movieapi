import "../css/Home.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">
        <h1>Movie Site</h1>
      </Link>
    </div>
  );
};

export default Nav;
