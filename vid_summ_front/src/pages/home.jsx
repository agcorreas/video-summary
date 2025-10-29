import NavBar from "../components/navBar"
import IntroBlock from "../components/introBlock"
import { useState } from "react"
import axios from "axios"
import { Infinity } from "ldrs/react"
import "ldrs/react/Infinity.css"
import { useAuth } from "../components/authContext"
import ReactMarkdown from "react-markdown"
import Markdown from "react-markdown"
import { BookmarkPlus, Loader2, BookmarkCheck } from "lucide-react"
import { set } from "mongoose"

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
    <>
      <NavBar></NavBar>
      <br></br>
      <br></br>
      <div className="flex-grow container mx-auto mt-10 px-4 sm:px-0">
        <div className="max-w-3xl mx-auto bg-indigo-900 p-6 rounded-lg shadow-md flex flex-col">
          <IntroBlock></IntroBlock>
          <br></br>
          <LinkBox
            set_YoutubeLink={setYoutubeLink}
            handle_YTQuery={handleYTQuery}
          ></LinkBox>
          {isLoading && (
            <div className="flex justify-center my-16 mb-0">
              <Infinity
                size="70"
                stroke="4"
                strokeLength="0.15"
                bgOpacity="0.1"
                speed="1.3"
                color="#cbd5e1"
              />
            </div>
          )}
          <section className="container mx-auto mt-16 px-4 sm:px-0 max-w-3xl flex-grow">
            <h2 className="text-xl mb-4 font-semibold text-slate-300">
              Summary Generated
            </h2>
            {response && (
              <div className="relative p-2">
                <div
                  id="resContent"
                  className="whitespace-pre-wrap mt-2 text-slate-400 space-y-4 p-4"
                >
                  <Markdown>{response}</Markdown>
                </div>
                <button
                  className="absolute bottom-0 right-0  flex items-center justify-center p-2 rounded text-slate-300 hover:text-white cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddSumm}
                  disabled={addButtonState === "loading" || addButtonState === "done"}
                >
                  {addButtonState === "idle" && (
                    <BookmarkPlus className="w-5 h-5" />
                  )}
                  {addButtonState === "loading" && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  {addButtonState === "done" && (
                    <BookmarkCheck className="w-5 h-5" />
                  )}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

function LinkBox({ set_YoutubeLink, handle_YTQuery }) {
  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold text-slate-300">
        Paste YouTube Link
      </h2>
      <div className="flex">
        <input
          id="youtubeLink"
          onChange={(e) => set_YoutubeLink(e.target.value)}
          type="url"
          placeholder="Paste Link..."
          className="flex-grow p-2 border border-slate-300 rounded-l-md placeholder: text-slate-300 focus:outline-none "
        ></input>
        <button
          id="generateBlogButton"
          className="bg-slate-300 text-indigo-500 px-4 py-2 rounded-r-md hover:bg-slate-400 cursor-pointer"
          onClick={handle_YTQuery}
        >
          Summarize
        </button>
      </div>
    </div>
  )
}

export default Home
