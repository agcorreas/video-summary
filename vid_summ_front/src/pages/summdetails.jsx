import NavBar from "../components/navBar"

function SummDetails() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
        <div>
          <section>
            <h2 className="test-xl mb-4 font-semibold text-slate-300 mt-10 px-4 sm:px-0 max-w-3xl">
              Summary Details
            </h2>
            <div className="bg-indigo-900 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-300">
                <a href="#">Summary Title</a>
              </h3>
              <p className="text-slate-300">Summary content goes here...</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default SummDetails
