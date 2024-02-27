// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Home />
    </div>
  );
}

export default App;
