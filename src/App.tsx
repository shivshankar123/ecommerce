import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {" "}
        {/* Updated background color and layout */}
        <SideBar className="w-1/4 bg-white shadow-md" />{" "}
        {/* Set sidebar width and background color */}
        <div className="flex-1 p-6">
          {" "}
          {/* Added padding and flexible width */}
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
