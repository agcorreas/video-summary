import { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import AllBlogs from "./pages/allblogs"
import ProtectedRoute from "./components/protectedRoute"
import { AuthProvider } from "./components/authContext"

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/allblogs" element={<ProtectedRoute><AllBlogs/></ProtectedRoute>}/>
      </Routes>
    </Router>
    </AuthProvider>
  )
}
export default App
