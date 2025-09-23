import NavBar from "../components/navBar"

function AllBlogs({isSigned, set_Token}) {
  return (
    <div>
      <NavBar isSigned={isSigned} setToken={set_Token}></NavBar>
      <div className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
        <div>
          <section>
            <h2 className="text-xl mb-4 font-semibold text-slate-300">
              All Blog Posts
            </h2>
            <div className="space-y-4 mt-8">
              <div className="bg-indigo-900 p-4 rounded-lg shadow-md">
                <h3 className="text-slate-300 test-lg font-semibold">
                  Blog Post Title 1
                </h3>
                <p className="text-slate-300">content of post</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AllBlogs
