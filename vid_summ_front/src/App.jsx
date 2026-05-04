import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import AllSummaries from "./pages/allsummaries"
import ProtectedRoute from "./components/protectedRoute"
import { AuthProvider } from "./components/authContext"
import SummDetails from "./pages/summdetails"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/allsummaries"
        element={
          <ProtectedRoute>
            <AllSummaries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/summdetails/:id"
        element={
          <ProtectedRoute>
            <SummDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <div className="bg-indigo-950 min-h-screen">
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </div>
  )
}
export default App
