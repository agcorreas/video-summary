import { useState } from "react"
import SignUp from "../pages/signup"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function LoginForm({ withEmail, setToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    // Handle login logic here
    if (!withEmail) {
      setLoading(true)
      try {
        const res = await axios.post("http://localhost:5000/login", {
          username,
          password,
        })
        const token = res.data.token
        localStorage.setItem("token", token)
        setToken(token)
        navigate("/")
      } catch (err) {
        console.error(err.response?.data || err.message)
        alert("Login failed")
      }
      setLoading(false)
    } else {
      setLoading(true)
      try {
        await axios.post("http://localhost:5000/register", {
          email,
          username,
          password,
        })
        alert("Registration successful. Please login.")
        navigate("/login")
      } catch (err) {
        alert("Registration failed")
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-500 p-8 shadow-md rounded-lg max-w-md w-full">
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold">
            {withEmail ? "Sign Up " : "Login"}
          </h2>
          {withEmail && (
            <LoginBox
              userOrPassOrEmail={"email"}
              on_Change={setEmail}
            ></LoginBox>
          )}
          <LoginBox
            userOrPassOrEmail={"username"}
            on_Change={setUsername}
          ></LoginBox>
          <LoginBox
            userOrPassOrEmail={"password"}
            on_Change={setPassword}
          ></LoginBox>
          <input
            type="submit"
            value={withEmail ? "Sign Up " : "Login"}
            className="w-full bg-slate-800 text-white py-4 px-4 rounded-md hover:bg-slate-700 cursor-pointer"
          ></input>
        </form>
      </div>
    </div>
  )
}

function LoginBox({ userOrPassOrEmail, on_Change }) {
  return (
    <div>
      <label for={userOrPassOrEmail} className="block mb-1 font-medium">
        {userOrPassOrEmail.charAt(0).toUpperCase() + userOrPassOrEmail.slice(1)}
      </label>
      <input
        type={userOrPassOrEmail == "username" ? "text" : userOrPassOrEmail}
        id={userOrPassOrEmail}
        name={userOrPassOrEmail}
        placeholder={`Enter ${
          userOrPassOrEmail.charAt(0).toUpperCase() + userOrPassOrEmail.slice(1)
        }`}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
        onChange={(e) => on_Change(e.target.value)}
      ></input>
    </div>
  )
}

export default LoginForm
