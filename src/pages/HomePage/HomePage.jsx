import Card from "../../components/Card/Card";
import Carrousel from "../../components/Carrousel/Carrousel";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="flex min-h-screen">
      <div className="w-4/4 ml-[70px]">
        <Carrousel />
        <div className="p-6">
          <h2 className="text-2xl font-bold my-8 flex">Nuestras Películas</h2>
          <Card />
          <h2 className="text-2xl font-bold my-8 flex">Nuestras Series</h2>
          <Card />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
