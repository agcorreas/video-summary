import { useState } from "react";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import AllBlogs from "./pages/allblogs";

export default App;
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllBlogs />} />
      </Routes>
    </Router>
  );
}
