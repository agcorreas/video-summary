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
    <nav class="bg-indigo-800 p-4 text-slate-300 flex justify-around items-center">
      <div>
        <a href="/" className="text-3xl font-bold">
          Video Summary Generator
        </a>
      </div>
      {token && (
        <div>
          <a href="/allsummaries" className="text-slate-300 hover:underline">
            Saved Summaries
          </a>
        </div>
      )}
      <div>
        {!token && (
        <a href="/login" className="text-slate-300 hover:underline">
          Login
        </a>
        )}
        {" | "}
        <a href="/signup" className="text-slate-300 hover:underline">
          Sign Up
        </a>
        {" | "}
        {token && (
          <button
            className=" text-slate-300 hover:underline cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
