import NavBar from "../components/navBar"
import IntroBlock from "../components/introBlock"
import { useState } from "react"
import axios from "axios"
import { Infinity } from "ldrs/react"
import "ldrs/react/Infinity.css"
import {useAuth} from "../components/authContext"
import ReactMarkdown from "react-markdown"
import Markdown from "react-markdown"

function Home() {
  const [youtubeLink, setYoutubeLink] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {token, setToken} = useAuth();

  async function handleAddSumm(e) {
    e.preventDefault()
    if(!token){
      alert("You need to be logged in to add the summary to your blog posts.")
      return;
    }

    try{
      const res = await axios.post("http://localhost:5000/addsummary", {response, youtubeLink, token})
      alert("Summary added to your blog posts!")
    } catch(err){
      console.error(err)
      alert(
        err.response?.data?.message ||
          "Error adding summary to blog posts. Please try again."
      )
    }
  }

  async function handleYTQuery(e) {
    e.preventDefault()
    setResponse("")
    if (!youtubeLink) {
      alert("Please enter a YouTube link.")
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
            <div className="flex justify-center my-16">
            <Infinity
              size="70"
              stroke="4"
              strokeLength="0.15"
              bgOpacity="0.1"
              speed="1.3"
              color="#34d399"
            />
            </div>
          )}
          <section className="container mx-auto mt-16 px-4 sm:px-0 max-w-3xl flex-grow">
            <h2 className="text-xl mb-4 font-semibold text-emerald-400">
              Summary Generated
            </h2>
            {response && (<div className="relative">
              <div id="resContent" className="whitespace-pre-wrap mt-2 text-emerald-500 space-y-4 p-4">
                <Markdown>{response}</Markdown>
              </div>
              <button className="absolute bottom-0 right-0  bg-emerald-500 text-white px-3 py-3 rounded-full shadow hover:bg-emerald-600 cursor-pointer" onClick={handleAddSumm}></button>
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
      <h2 className="text-xl mb-4 font-semibold text-emerald-400">
        Pegar Link de YoutTube
      </h2>
      <div className="flex">
        <input
          id="youtubeLink"
          onChange={(e) => set_YoutubeLink(e.target.value)}
          type="url"
          placeholder="Pegar Link..."
          className="flex-grow p-2 border border-emerald-300 rounded-l-md placeholder: text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        ></input>
        <button
          id="generateBlogButton"
          className="bg-emerald-400 text-white px-4 py-2 rounded-r-md hover:bg-emerald-500 cursor-pointer"
          onClick={handle_YTQuery}
        >
          Resumir
        </button>
      </div>
    </div>
  )
}

export default Home
