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
          <Recommend />
          <LastMovies />
          <LastSeries />

          <div className="fixed bottom-4 right-4">
            <div className="ring-primary ring-offset-base-100 w-16 h-16 rounded-full ring ring-offset-2">
              <button
                className="w-full h-full rounded-full overflow-hidden focus:outline-none"
                onClick={() => document.getElementById("my_modal_2").showModal()}
              >
                <img
                  src="/images/Designer.jpeg"
                  alt="Chatbot"
                  className="w-full h-full object-cover opacity-80 hover:opacity-40"
                />
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <Chatbot />
                  <p className="py-4">Presiona ESC para cerrar el chat.</p>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
