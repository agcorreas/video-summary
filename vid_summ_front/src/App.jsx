import { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import AllBlogs from "./pages/allblogs"
import SummDetails from "./pages/summdetails"
import { useNavigate } from "react-router-dom"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home isSigned={token != null} set_Token={setToken} />}
        />
        <Route path="/login" element={<Login set_Token={setToken} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/allblogs" element={<AllBlogs isSigned={token != null} set_Token={setToken} />} />
      </Routes>
    </Router>
  )
}
export default App
