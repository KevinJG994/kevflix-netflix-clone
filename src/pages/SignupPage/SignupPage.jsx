import "./SignupPage.css";
import { useState, useContext } from "react";
import authService from "../../services/auth.service";
import { AlertContext } from "../../context/alert.context";

function SignupPage({ setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { setAlert } = useContext(AlertContext); // Usar el contexto de alerta

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then(() => {
        setAlert(
          <div role="alert" className="alert alert-success transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Usuario creado con éxito.</span>
          </div>
        );
        setTimeout(() => setAlert(null), 5000);
        setShowLogin(true);
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
        setAlert(
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error! El email o contraseña no son validos.</span>
          </div>
        );
        setTimeout(() => setAlert(null), 5000);
      });
  };

  return (
    <form className="card-body" onSubmit={handleSignupSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nombre</span>
        </label>
        <input type="text" placeholder="Nombre" className="input input-bordered" value={name} onChange={handleName} required />
      </div>
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
        <button className="btn btn-primary">Crear cuenta</button>
        <label className="label">
          <a href="#" onClick={() => setShowLogin(true)} className="text-lg flex-auto my-2 label-text-alt link link-hover">¿Ya tienes cuenta? - <span className='text-primary-color'>Inicia sesión</span></a>
        </label>
      </div>
    </form>
  );
}

export default SignupPage;