import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import { HashRouter, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Navbar />
          <Home />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
