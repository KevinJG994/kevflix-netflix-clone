import Carrousel from "../../components/Carrousel/Carrousel";
import Chatbot from "../../components/ChatBot/Chatbot";
import LastMovies from "../../components/LastMovies/LastMovies";
import LastSeries from "../../components/LastSeries/LastSeries";
import Recommend from "../../components/Recommend/Recommend";

function HomePage() {

  return (
    <div className="flex min-h-screen calc-width-navbar">
      <div className="calc-width w-full">
        <Carrousel />
        <div className="container mx-auto mt-8">
         <Recommend/>
         <LastMovies/>
         <LastSeries />
         <Chatbot />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
