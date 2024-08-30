import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {" "}
        <SideBar />{" "}
        <div className="flex-1 p-6">
          {" "}
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
