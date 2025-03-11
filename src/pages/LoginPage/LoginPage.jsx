import "../../App.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { AlertContext } from "../../context/alert.context";
import authService from "../../services/auth.service";
import SignupPage from "../SignupPage/SignupPage";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showLogin, setShowLogin] = useState(true); // Estado para controlar qué formulario se muestra

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const { alert, setAlert } = useContext(AlertContext); // Usar el contexto de alerta

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
        setAlert(
          <div role="alert" className="alert alert-error animate-fadeOut">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error! El email o contraseña no son correctos.</span>
          </div>
        );
        setTimeout(() => setAlert(null), 5000);
      });
  };

  return (
    <div
      className="hero min-h-screen calc-width-navbar"
      style={{
        backgroundImage: "url(https://www.teleadhesivo.com/blog/wp-content/uploads/2022/06/los-mejores-posters-de-pel%C3%ADculas.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="hero-content flex-col lg:flex-row-reverse relative z-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-primary-color">¡Unete a KevFlix!</h1>
          <p className="py-6 text-2xl">
            Disfruta de tu sitio web de streaming favorito en el que podrás ver la mejor selección de películas y series online gratis desde cualquier dispositivo en la mejor calidad, sin cortes y con unas gran variedad de idiomas.
          </p>

          <p className='py-6 text-xl'>
            {showLogin ? "Inicia sesión para acceder a todo el contenido que ofrece KevFlix." : "Crea una cuenta para disfrutar de todo el contenido que ofrece KevFlix."}
          </p>

          {/* Mostrar el alert */}
          {alert}

        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-6">
          {showLogin ? (
            <form className="card-body" onSubmit={handleLoginSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" className="input input-bordered" value={email} onChange={handleEmail} required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contraseña</span>
                </label>
                <input type="password" placeholder="Contraseña" className="input input-bordered" value={password} onChange={handlePassword} required />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                <label className="label">
                  <a href="#" onClick={() => setShowLogin(false)} className="text-lg flex-auto my-2 label-text-alt link link-hover">¿No tienes cuenta? - <span className='text-primary-color'>Registrate</span></a>
                </label>
              </div>
            </form>
          ) : (
            <SignupPage setShowLogin={setShowLogin} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;