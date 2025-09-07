import NavBar from "../components/navBar";
import IntroBlock from "../components/introBlock";
import LinkBox from "../components/linkBox";
import ContenedorResumen from "../components/contenedorResumen";

function Home() {
  return (
    <>
      <NavBar></NavBar>
      <br></br>
      <br></br>
      <div className="flex-grow container mx-auto mt-10 px-4 sm:px-0">
        <div className="max-w-3xl mx-auto bg-indigo-900 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col">
          <IntroBlock></IntroBlock>
          <br></br>
          <LinkBox></LinkBox>
          <section className="container mx-auto mt-10 px-4 sm:px-0 max-w-3xl flex-grow">
            <h2 className="text-xl mb-4 font-semibold text-emerald-400">
              Resumen Generado
            </h2>
            <ContenedorResumen></ContenedorResumen>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
