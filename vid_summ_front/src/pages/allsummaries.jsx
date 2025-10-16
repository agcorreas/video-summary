import NavBar from "../components/navBar"
import axios from "axios"
import { useState, useEffect, use } from "react"
import { useAuth } from "../components/authContext"
import Markdown from "react-markdown"

function AllSummaries() {
  const [summaries, setSummaries] = useState([])
  const { token, setToken } = useAuth();

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getsummaries", {
          headers:{Authorization: `Bearer ${token}`,},
        });
        setSummaries(res.data.summaries)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSummaries()
  },[]);
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
        <div>
          <section>
            <h2 className="text-xl mb-4 font-semibold text-slate-300">
              Saved Summaries
            </h2>
            {summaries.length === 0 ? (<p className="text-slate-300">No summaries found.</p>) : (
              summaries.map((summary, index) => (
            <div key={index} className="space-y-4 mt-8">
              <div className="bg-indigo-900 p-4 rounded-lg shadow-md">
                <h3 className="text-slate-300 test-lg font-semibold">
                  {summary.title}
                </h3>
                <p className="text-slate-300"><Markdown>{summary.summaryText.split('\n')[0]}</Markdown></p>
              </div>
            </div>
            )))}
          </section>
        </div>
      </div>
    </div>
  )
}

export default AllSummaries
