import { useNavigate } from "react-router-dom"
import { useAuth } from "./authContext"

function NavBar() {
  const { token, setToken } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="bg-indigo-800 p-4 text-slate-300 flex justify-around items-center shadow-lg">
      <div>
        <a href="/" className="text-3xl font-bold hover:text-white transition-colors duration-200 tracking-tight">
          Video Summary Generator
        </a>
      </div>
      {token && (
        <div>
          <a href="/allsummaries" className="text-slate-300 hover:text-white hover:underline transition-all duration-200 font-medium tracking-wide">
            Saved Summaries
          </a>
        </div>
      )}
      <div className="flex items-center gap-3">
        {!token && (
          <a href="/login" className="text-slate-300 hover:text-white hover:underline transition-all duration-200 font-medium tracking-wide">
            Login
          </a>
        )}
        {!token && <span className="text-slate-500 font-light">|</span>}
        <a href="/signup" className="text-slate-300 hover:text-white hover:underline transition-all duration-200 font-medium tracking-wide">
          Sign Up
        </a>
        {token && (
          <>
            <span className="text-slate-500 font-light">|</span>
            <button
              className="text-slate-300 hover:text-white hover:underline cursor-pointer transition-all duration-200 font-medium tracking-wide"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
