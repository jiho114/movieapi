import Home from "./page/Home";
import { MovieProvider } from "./context/MovieContext";
import './App.css'

function App() {
 
  return (
    <MovieProvider>
      <Home></Home>
    </MovieProvider>
  )
}

export default App
