import Home from "./page/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { MovieProvider } from "./context/MovieContext";
import './App.css'

function App() {
 
  return (
    <MovieProvider>
      <Nav></Nav>
      <Home></Home>
      <Footer></Footer>
    </MovieProvider>
  )
}

export default App
