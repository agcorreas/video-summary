import LoginBox from "./loginBox";
function LoginForm() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-500 p-8 shadow-md rounded-lg max-w-md w-full">
        <form className="space-y-4 ">
          <h2 className="text-xl font-semibold">Login</h2>
          <LoginBox userOrPass={"Username"}></LoginBox>
          <LoginBox userOrPass={"Password"}></LoginBox>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
