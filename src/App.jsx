import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <HashRouter>
        {/* Navbar is outside Routes since it's part of the layout */}
        <Navbar />

        {/* Routes should only contain Route components */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
