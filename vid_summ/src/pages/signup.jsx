import NavBar from "../components/navBar";
import LoginForm from "../components/loginForm";
function SignUp() {
  return (
    <>
      <NavBar></NavBar>
      <LoginForm withEmail={true}></LoginForm>
    </>
  );
}

export default SignUp;
