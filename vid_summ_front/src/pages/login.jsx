import NavBar from "../components/navBar"
import LoginForm from "../components/loginForm"
function Login({ set_Token }) {
  return (
    <>
      <NavBar></NavBar>
      <LoginForm setToken={set_Token}></LoginForm>
    </>
  )
}

export default Login
