import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-500 p-8 shadow-md rounded-lg max-w-md w-full">
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold">Login</h2>
          <LoginBox userOrPass={"Username"} onChange={setUsername}></LoginBox>
          <LoginBox userOrPass={"Password"} onChange={setPassword}></LoginBox>
          <input
            type="submit"
            value="Login"
            className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700 cursor-pointer"
          ></input>
        </form>
      </div>
    </div>
  );
}

function LoginBox({ userOrPass, onChange }) {
  return (
    <div>
      <label for={userOrPass} className="block mb-1 font-medium">
        {userOrPass}
      </label>
      <input
        type={`${userOrPass == "Password" ? "password" : "text"}`}
        id={userOrPass}
        name={userOrPass}
        placeholder={`Enter ${userOrPass}`}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
}

export default LoginForm;
