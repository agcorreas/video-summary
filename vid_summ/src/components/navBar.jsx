function NavBar() {
  return (
    <nav class="bg-indigo-800 p-4 text-slate-300 flex justify-between">
      <div>
        <h1 className="text-3xl font-bold">Video Summary Generator</h1>
      </div>
      <div>
        <a href="#" className="text-slate-300 hover:underline">
          Login
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
