import { useState, useEffect } from "react"
import SignUp from "../pages/signup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./authContext"
import LoadingSpinner from "./loadingSpinner"
import { X, AlertCircle, CheckCircle2 } from "lucide-react"



function LoginForm({withEmail}) {
  const {token, setToken} = useAuth();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  // Auto-dismiss error and success messages after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")
    
    // Handle login logic here
    if (!withEmail) {
      setLoading(true)
      try {
        const res = await axios.post("http://localhost:5000/auth/login", {
          username,
          password,
        })
        const token = res.data.token
        setToken(token)
        navigate("/")
      } catch (err) {
        handleCatch(err, setError);
      }
      setLoading(false)
    } else {
      setLoading(true)
      try {
        await axios.post("http://localhost:5000/auth/register", {
          email,
          username,
          password,
        })
        setSuccess("Registration successful. Please login.")
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      } catch (err) {
        handleCatch(err, setError);
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen page-enter bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800">
      <div className="bg-indigo-900 p-8 shadow-2xl rounded-xl max-w-md w-full hover-lift scale-enter border border-indigo-700/50">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">
              {withEmail ? "Sign Up" : "Welcome Back"}
            </h2>
            <p className="text-slate-400 text-sm">
              {withEmail ? "Create your account" : "Login to continue"}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 content-fade-in">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm flex-grow">{error}</p>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {success && (
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3 flex items-center gap-2 content-fade-in">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-green-300 text-sm flex-grow">{success}</p>
              <button
                type="button"
                onClick={() => setSuccess("")}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {withEmail && (
            <LoginBox
              userOrPassOrEmail={"email"}
              on_Change={setEmail}
              disabled={loading}
            ></LoginBox>
          )}
          <LoginBox
            userOrPassOrEmail={"username"}
            on_Change={setUsername}
            disabled={loading}
          ></LoginBox>
          <LoginBox
            userOrPassOrEmail={"password"}
            on_Change={setPassword}
            disabled={loading}
          ></LoginBox>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-indigo-500 hover:to-indigo-600 hover:shadow-xl cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{withEmail ? "Signing Up..." : "Logging in..."}</span>
              </>
            ) : (
              <span>{withEmail ? "Sign Up" : "Login"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

function LoginBox({ userOrPassOrEmail, on_Change, disabled }) {
  return (
    <div>
      <label htmlFor={userOrPassOrEmail} className="block mb-2 font-medium text-slate-200">
        {userOrPassOrEmail.charAt(0).toUpperCase() + userOrPassOrEmail.slice(1)}
      </label>
      <input
        type={userOrPassOrEmail == "username" ? "text" : userOrPassOrEmail}
        id={userOrPassOrEmail}
        name={userOrPassOrEmail}
        placeholder={`Enter ${
          userOrPassOrEmail.charAt(0).toUpperCase() + userOrPassOrEmail.slice(1)
        }`}
        disabled={disabled}
        className="w-full p-3 border border-indigo-600/50 rounded-lg bg-indigo-950/50 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-indigo-500/70"
        onChange={(e) => on_Change(e.target.value)}
      ></input>
    </div>
  )
}

function handleCatch(err, setError) {
  if (err.response) {
    setError(err.response.data.message || "An error occurred. Please try again.")
  } else if (err.request) {
    setError("No response from server. Please try again later.")
  } else {
    setError("Something went wrong: " + err.message)
  }
}

export default LoginForm
