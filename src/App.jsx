import Home from "./page/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MovieDetail from "./page/MovieDetail";
import ActorDetails from "./page/ActorDetails";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <MovieProvider>
      <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route  path="/:media_type/:id" element={<MovieDetail/>}/>
          <Route path="/actor/:actorId" element={<ActorDetails />}/>
        </Routes>
      <Footer></Footer>
    </MovieProvider>
  );
}

export default App;
