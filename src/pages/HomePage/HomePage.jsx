import Carrousel from "../../components/Carrousel/Carrousel";
import CardMovie from "../../components/CardMovie/CardMovie";
import CardSerie from "../../components/CardSerie/CardSerie";

function HomePage() {

  return (
    <div className="flex min-h-screen calc-width-navbar">
      <div className="calc-width w-full">
        <Carrousel />
        <div className="p-6">
          <CardMovie/>
          <CardSerie/>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
