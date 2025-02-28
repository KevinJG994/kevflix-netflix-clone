
import Card from "../../components/Card/Card";
import Carrousel from "../../components/Carrousel/Carrousel";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <Carrousel/>
      <h2>Sección peliculas</h2>
      <Card/>
      <h2>Sección series</h2>
      <Card/>
    </div>
  );
}

export default HomePage;
