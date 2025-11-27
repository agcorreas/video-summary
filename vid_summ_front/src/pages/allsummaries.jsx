import NavBar from "../components/navBar"
import axios from "axios"
import { useState, useEffect, use } from "react"
import { useAuth } from "../components/authContext"
import Markdown from "react-markdown"
import {Trash2, BookOpen, ArrowRight, AlertCircle, X} from "lucide-react"
import {Link} from "react-router-dom"
import LoadingSpinner from "../components/loadingSpinner"

function AllSummaries() {
  const [summaries, setSummaries] = useState([])
  const { token, setToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  async function deleteSummary(idToDelete) {
    try {
      await axios.delete(`http://localhost:5000/deletesummary/${idToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummaries(summaries.filter((summary) => summary._id !== idToDelete));
      setError("")
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error deleting summary. Please try again.");
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
      <div className="page-enter">
        <NavBar></NavBar>
        <div className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
          <LoadingSpinner size="lg" text="Loading summaries..." />
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter">
      <NavBar></NavBar>
      <div className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
        <div>
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-200">
                Saved Summaries
              </h2>
              {summaries.length > 0 && (
                <span className="text-slate-400 text-sm font-medium">
                  {summaries.length} {summaries.length === 1 ? 'summary' : 'summaries'}
                </span>
              )}
            </div>
            
            {error && (
              <div className="mb-4 bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 content-fade-in">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm flex-grow">{error}</p>
                <button
                  type="button"
                  onClick={() => setError("")}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {summaries.length === 0 ? (
              <div className="content-fade-in">
                <div className="bg-indigo-900/50 border border-indigo-700/30 rounded-xl p-12 text-center hover-lift">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-indigo-800/50 flex items-center justify-center mb-2">
                      <BookOpen className="w-10 h-10 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-200 mb-2">
                        No summaries yet
                      </h3>
                      <p className="text-slate-400 mb-6 max-w-md">
                        Start creating summaries by pasting a YouTube link on the home page. Your saved summaries will appear here.
                      </p>
                      <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-indigo-500 hover:to-indigo-600 hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Create Your First Summary
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {summaries.map((summary, index) => (
                  <div 
                    key={index} 
                    className="content-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link
                      to={`/summdetails/${summary._id}`}
                      className="relative block bg-indigo-900 p-6 rounded-xl shadow-lg border border-indigo-700/30 hover-lift transition-all duration-300 group cursor-pointer"
                    >
                      <div className="pr-10">
                        <h3 className="text-lg font-semibold text-slate-300 mb-3 hover:text-slate-100 transition-colors duration-200">
                          <Markdown>{summary.title}</Markdown>
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          <Markdown>{summary.summaryText.split('\n')[2]}</Markdown>
                        </p>
                      </div>
                      <button 
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-400 hover:bg-red-900/20 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 z-10" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteSummary(summary._id);
                        }}
                        title="Delete summary"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default AllSummaries
