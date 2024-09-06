import Home from "./components/Home";
import Navbar from "./components/Navbar";
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
