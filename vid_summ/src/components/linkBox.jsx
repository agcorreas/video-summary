function LinkBox() {
  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold text-emerald-400">
        Pegar Link de YoutTube
      </h2>
      <div className="flex">
        <input
          id="youtubeLink"
          type="url"
          placeholder="Pegar Link..."
          className="flex-grow p-2 border border-emerald-300 rounded-l-md placeholder: text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        ></input>
        <button
          id="generateBlogButton"
          className="bg-emerald-400 text-white px-4 py-2 rounded-r-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Resumir
        </button>
      </div>
    </div>
  );
}

export default LinkBox;
