import { useNavigate } from "react-router-dom"
function NavBar({ isSigned, setToken }) {
  return (
    <nav class="bg-indigo-800 p-4 text-slate-300 flex justify-around items-center">
      <div>
        <a href="/" className="text-3xl font-bold">
          Video Summary Generator
        </a>
      </div>
      {isSigned && (
        <div>
          <a href="/allblogs" className="text-slate-300 hover:underline">
            All Blogs
          </a>
        </div>
      )}
      <div>
        <a href="/login" className="text-slate-300 hover:underline">
          Login
        </a>
        {" | "}
        <a href="/signup" className="text-slate-300 hover:underline">
          Sign Up
        </a>
        {" | "}
        {isSigned && (
          <button
            className=" text-slate-300 hover:underline cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token")
              setToken(null)
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
