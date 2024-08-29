import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";

import SideBar from "./components/SideBar";

function App() {
  return (
    <Router>
      <div className="flex-h-screen">
        <SideBar />
        <div className="rounded w full flex justify between flex wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
