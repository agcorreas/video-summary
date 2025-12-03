import NavBar from "../components/navBar"
import IntroBlock from "../components/introBlock"
import { useState } from "react"
import axios from "axios"
import { useAuth } from "../components/authContext"
import ReactMarkdown from "react-markdown"
import Markdown from "react-markdown"
import { BookmarkPlus, Loader2, BookmarkCheck } from "lucide-react"
import LoadingSpinner from "../components/loadingSpinner"

function Home() {
  const [youtubeLink, setYoutubeLink] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [addButtonState, setAddButtonState] = useState("idle") // idle, loading, done

  const { token, setToken } = useAuth()

  async function handleAddSumm(e) {
    e.preventDefault()
    if (!token) {
      alert("You need to be logged in to add the summary to your blog posts.")
      return
    }
    setAddButtonState("loading")

    try {
      const res = await axios.post("http://localhost:5000/addsummary", {
        response,
        youtubeLink,
        token,
      })
    } catch (err) {
      console.error(err)
      if(err.response?.data?.message === "jwt expired"){
        alert("Your session has expired. Please log in again.")
      }else{
      alert(
        err.response?.data?.message ||
          "Error adding summary to blog posts. Please try again."
      )
    }
    }
    setAddButtonState("done")
  }

  async function handleYTQuery(e) {
    e.preventDefault()
    setResponse("")
    setAddButtonState("idle")
    if (!youtubeLink) {
      return
    }
    setIsLoading(true)
    try {
      const res = await axios.post("http://localhost:5000/summarize", {
        youtubeLink,
      })
      setResponse(res.data.reply)
    } catch (err) {
      console.error(err)
      alert(
        err.response?.data?.message ||
          "Error summarizing the video. Please try again."
      )
    }
    setIsLoading(false)
  }
  return (
    <div className="page-enter">
      <NavBar></NavBar>
      <br></br>
      <br></br>
      <div className="flex-grow container mx-auto mt-10 px-4 sm:px-0">
        <div className="max-w-3xl mx-auto bg-indigo-900 p-8 rounded-xl shadow-2xl flex flex-col hover-lift border border-indigo-700/50">
          <IntroBlock></IntroBlock>
          <div className="my-6">
            <LinkBox
              set_YoutubeLink={setYoutubeLink}
              handle_YTQuery={handleYTQuery}
              isLoading={isLoading}
            ></LinkBox>
          </div>
          {isLoading && (
            <div className="my-16 mb-0 content-fade-in">
              <LoadingSpinner size="xl" text="Generating summary..." />
            </div>
          )}
          <section className="mt-8 flex-grow">
            <h2 className="text-2xl mb-6 font-bold text-slate-200">
              Summary Generated
            </h2>
            {response && (
              <div className="relative content-fade-in">
                <div
                  id="resContent"
                  className="whitespace-pre-wrap text-slate-300 space-y-4 p-6 rounded-lg bg-indigo-950/50 border border-indigo-700/30 transition-all duration-300"
                >
                  <Markdown>{response}</Markdown>
                </div>
                <button
                  className="absolute bottom-2 right-2 flex items-center justify-center p-3 rounded-lg text-slate-300 hover:text-white hover:bg-indigo-900/60 bg-indigo-950/50 backdrop-blur-sm cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-950/50 border border-indigo-700/30 hover:border-indigo-600/50"
                  onClick={handleAddSumm}
                  disabled={addButtonState === "loading" || addButtonState === "done"}
                >
                  {addButtonState === "idle" && (
                    <BookmarkPlus className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
                  )}
                  {addButtonState === "loading" && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  {addButtonState === "done" && (
                    <BookmarkCheck className="w-5 h-5 text-green-400" />
                  )}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

function LinkBox({ set_YoutubeLink, handle_YTQuery, isLoading }) {
  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold text-slate-200">
        Paste YouTube Link
      </h2>
      <div className="flex gap-0">
        <input
          id="youtubeLink"
          onChange={(e) => set_YoutubeLink(e.target.value)}
          type="url"
          placeholder="Paste YouTube link here..."
          disabled={isLoading}
          className="flex-grow p-3 border border-indigo-600/50 rounded-l-lg placeholder:text-slate-500 text-slate-200 bg-indigo-950/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-indigo-500/70"
        ></input>
        <button
          id="generateBlogButton"
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-r-lg hover:from-indigo-500 hover:to-indigo-600 hover:shadow-xl cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={handle_YTQuery}
        >
          {isLoading ? "Processing..." : "Summarize"}
        </button>
      </div>
    </div>
  )
}

export default Home
