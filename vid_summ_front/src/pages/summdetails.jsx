import NavBar from "../components/navBar"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../components/authContext"
import Markdown from "react-markdown"
import LoadingSpinner from "../components/loadingSpinner"
import { ExternalLink } from "lucide-react"

function SummDetails() {
  const { id } = useParams()
  const [summary, setSummary] = useState(null)
  const { token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        console.log("Fetching summary with id:", id)
        const res = await axios.get(
          `http://localhost:5000/getsummary/?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setSummary(res.data.summary)
      } catch (err) {
        console.error(err)
        setError(err.response?.data?.message || "Error fetching summary.")
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [id, token])

  if (loading) {
    return (
      <div className="page-enter">
        <NavBar></NavBar>
        <div className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
          <LoadingSpinner size="lg" text="Loading summary..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-enter">
        <NavBar></NavBar>
        <div className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 content-fade-in">
            <p className="text-red-300">Error loading summary: {error}</p>
          </div>
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
            <h2 className="text-xl mb-4 font-semibold text-slate-300 mt-10 px-4 sm:px-0 max-w-3xl">
              Summary Details
            </h2>
            <div className="bg-indigo-900 p-4 rounded-lg shadow-md whitespace-pre-wrap mt-2 text-slate-400 space-y-4 p-4 hover-lift content-fade-in transition-all duration-300">
              <h3 className="text-lg font-semibold text-slate-300">
                <Link
                  to={summary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-100 transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <Markdown>{summary.title}</Markdown>
                  <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200 flex-shrink-0" />
                </Link>
              </h3>
              <p className="text-slate-300">
                <Markdown>
                  {summary.summaryText.split("\n").slice(1).join("\n")}
                </Markdown>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default SummDetails
