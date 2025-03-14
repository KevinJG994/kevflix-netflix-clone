import Carrousel from "../../components/Carrousel/Carrousel";
import LastMovies from "../../components/LastMovies/LastMovies";
import LastSeries from "../../components/LastSeries/LastSeries";

function HomePage() {

  return (
    <div className="flex min-h-screen calc-width-navbar">
      <div className="calc-width w-full">
        <Carrousel />
        <div className="container mx-auto mt-8">
         <LastMovies/>
         <LastSeries />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
