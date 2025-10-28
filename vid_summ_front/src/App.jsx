import { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import AllSummaries from "./pages/allsummaries"
import ProtectedRoute from "./components/protectedRoute"
import { AuthProvider } from "./components/authContext"
import SummDetails from "./pages/summdetails"

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
        <Route path="/allsummaries" element={<ProtectedRoute><AllSummaries/></ProtectedRoute>}/>
        <Route path="/summdetails/:idx" element={<ProtectedRoute><SummDetails/></ProtectedRoute>}/>
      </Routes>
    </Router>
    </AuthProvider>
  )
}
export default App
