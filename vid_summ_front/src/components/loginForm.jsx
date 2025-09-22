import { useState } from "react";
import SignUp from "../pages/signup";

function LoginForm({ withEmail }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
          <h2 className="text-xl font-semibold">
            {withEmail ? "Sign Up " : "Login"}
          </h2>
          {withEmail && (
            <LoginBox
              userOrPassOrEmail={"email"}
              onChange={setEmail}
            ></LoginBox>
          )}
          <LoginBox
            userOrPassOrEmail={"username"}
            onChange={setUsername}
          ></LoginBox>
          <LoginBox
            userOrPassOrEmail={"password"}
            onChange={setPassword}
          ></LoginBox>
          <input
            type="submit"
            value={withEmail ? "Sign Up " : "Login"}
            className="w-full bg-slate-800 text-white py-4 px-4 rounded-md hover:bg-slate-700 cursor-pointer"
          ></input>
        </form>
      </div>
    </div>
  );
}

function LoginBox({ userOrPassOrEmail, onChange }) {
  return (
    <div>
      <label for={userOrPassOrEmail} className="block mb-1 font-medium">
        {userOrPassOrEmail.charAt(0).toUpperCase() + userOrPassOrEmail.slice(1)}
      </label>
      <input
        type={userOrPassOrEmail}
        id={userOrPassOrEmail}
        name={userOrPassOrEmail}
        placeholder={`Enter ${
          userOrPassOrEmail.charAt(0).toUpperCase() + userOrPassOrEmail.slice(1)
        }`}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
}

export default LoginForm;
