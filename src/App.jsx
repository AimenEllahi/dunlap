import Scene from "./Components/Scene";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navigation from "./Components/Navigation";
import Overlay from "./Components/Overlay";
import MusicOverlay from "./Components/MusicOverlay";

const routes = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/about",
    element: <About />,
  },
];
function App() {
  return (
    <Router>
      <Navigation />
      <MusicOverlay />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
