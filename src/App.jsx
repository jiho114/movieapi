import Home from "./page/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MovieDetail from "./page/MovieDetail";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <MovieProvider>
      <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail/>}/>
        </Routes>
      <Footer></Footer>
    </MovieProvider>
  );
}

export default App;
