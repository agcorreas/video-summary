import NavBar from "../components/navBar"
import IntroBlock from "../components/introBlock"
import ContenedorResumen from "../components/contenedorResumen"
import { useState } from "react"
import axios from "axios"

function Home({isSigned, set_Token}) {

  const [youtubeLink, setYoutubeLink] = useState("")
  const [response, setResponse] = useState("")
  
  async function handleYTQuery(e) {
    e.preventDefault()
    if (!youtubeLink) {
      alert("Please enter a YouTube link.")
      return
    }
    try{
      const res = await axios.post("http://localhost:5000/summarize", {youtubeLink})
      setResponse(res.data.reply)
    }
    catch(err){
      console.error(err)
      alert(err.response?.data?.message||"Error summarizing the video. Please try again.")
    }

  }
  return (
    <>
      <NavBar isSigned={isSigned} setToken={set_Token}></NavBar>
      <br></br>
      <br></br>
      <div className="flex-grow container mx-auto mt-10 px-4 sm:px-0">
        <div className="max-w-3xl mx-auto bg-indigo-900 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col">
          <IntroBlock></IntroBlock>
          <br></br>
          <LinkBox set_YoutubeLink={setYoutubeLink} handle_YTQuery={handleYTQuery}></LinkBox>
          <section className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
            <h2 className="text-xl mb-4 font-semibold text-emerald-400">
              Resumen Generado
            </h2>
            {response && (<div id="resContent" className="mt-2 text-emerald-500 space-y-4">
              {response}
            </div>)}
          </section>
        </div>
      </div>
    </>
  )
}


function LinkBox({set_YoutubeLink, handle_YTQuery}) {
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
          className="bg-emerald-400 text-white px-4 py-2 rounded-r-md hover:bg-emerald-500"
          onClick={handle_YTQuery}
        >
          Resumir
        </button>
      </div>
    </div>
  );
}

export default Home
