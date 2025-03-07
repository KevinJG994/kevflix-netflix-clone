import "./SignupPage.css";
import { useState } from "react";
import authService from "../../services/auth.service";
// import axios from "axios";

function SignupPage({ setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    
    // const authToken = localStorage.getItem("authToken");
    // axios.post(
    //   `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
    //   requestBody, 
    //   { headers: { Authorization: `Bearer ${authToken}` },
    // })
    // .then((response) => {})
    

    // Or using a service
    authService
      .signup(requestBody)
      .then(() => {
        setShowLogin(true)
        // If the POST request is successful redirect to the login page
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <form className="card-body" onSubmit={handleSignupSubmit}>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Nombre</span>
      </label>
      <input type="text" placeholder="Nombre" className="input input-bordered" value={name} onChange={handleName}  required />
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
      <input type="password" placeholder="Contraseña" className="input input-bordered" value={password}
          onChange={handlePassword} required />
    </div>
    {/* <div className="form-control">
      <label className="label">
        <span className="label-text">Foto de perfil</span>
      </label>
      <input type="file" placeholder="Foto de perfil" className="input input-bordered" required />
    </div> */}
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
