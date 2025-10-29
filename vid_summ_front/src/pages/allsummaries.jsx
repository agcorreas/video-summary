import NavBar from "../components/navBar"
import axios from "axios"
import { useState, useEffect, use } from "react"
import { useAuth } from "../components/authContext"
import Markdown from "react-markdown"
import {Trash2} from "lucide-react"
import {Link} from "react-router-dom"

function AllSummaries() {
  const [summaries, setSummaries] = useState([])
  const { token, setToken } = useAuth();
  const [loading, setLoading] = useState(true);

  async function deleteSummary(idToDelete) {
    try {
      await axios.delete(`http://localhost:5000/deletesummary/${idToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummaries(summaries.filter((summary,idToDelete) => summary._id !== idToDelete));
    } catch (err) {
      console.error(err);
      alert("Error deleting summary. Please try again.");
    }
  };

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getsummaries", {
          headers:{Authorization: `Bearer ${token}`,},
        });
        setSummaries(res.data.summaries)
      } catch (err) {
        console.error(err)
      }finally{
        setLoading(false);
      }
    }
    fetchSummaries()
  },[summaries]);
  if(loading){
    return (
      <div>
        <NavBar></NavBar>
        <div className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
          <p className="text-slate-300">Loading summaries...</p>
        </div>
      </div>
    )
  }

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
              <div className="relative bg-indigo-900 p-4 rounded-lg shadow-md">
                <h3 className="text-slate-300 test-lg font-semibold">
                  <Link to={`/summdetails/${summary._id}`}><Markdown>{summary.title}</Markdown></Link>
                </h3>
                <p className="text-slate-300"><Markdown>{summary.summaryText.split('\n')[2]}</Markdown></p>
                <button className="absolute top-2 right-2 text-slate-300 hover:text-white cursor-pointer p-1 rounded transition" onClick={() => deleteSummary(summary._id)}>
                  <Trash2 className="w-5 h-5" />
                </button>
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
