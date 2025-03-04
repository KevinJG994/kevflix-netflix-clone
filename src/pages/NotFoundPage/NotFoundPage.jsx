import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen p-10 mt-20 m-auto">
      <h2 className="text-3xl">Page Not Found</h2>
   
      <img src="/images/404.gif" className="my-10 mx-auto"/>
        <p className="text-2xl">Ayuda a John Travolta a volver a Kevflix</p>
        <Link to="/Home">
        <button className="btn btn-primary mt-6">Volver a KevFlix</button>   
        </Link>
    </div>
  );
}

export default NotFoundPage;
