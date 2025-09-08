function LoginBox({ userOrPass }) {
  return (
    <div>
      <label for={userOrPass} className="block mb-1 font-medium">
        {userOrPass}
      </label>
      <input
        type="text"
        id={userOrPass}
        name={userOrPass}
        placeholder={`Enter ${userOrPass}`}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
      ></input>
    </div>
  );
}

export default LoginBox;
