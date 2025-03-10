import { useContext, useEffect, useState } from "react";
import userService from "../../services/users.service";
import "../../App.css";
import { AuthContext } from "../../context/auth.context";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user, logOutUser } = useContext(AuthContext); // Obtener el usuario autenticado del contexto

  useEffect(() => {
    if (user && user._id) {
      userService
        .getUserById(user._id)
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          const errorDescription = error.response?.data?.message || "An error occurred";
          setErrorMessage(errorDescription);
        });
    }
  }, [user]);

  const handleDelete = () => {
    const isConfirmed = window.confirm("¿De verdad quieres eliminar el usuario?")

    if (isConfirmed) {
      userService
        .deleteUser(user._id)
        .then(() => {
          logOutUser()
        })
    };
  }

  return (
    <div className="hero bg-base-100 min-h-screen flex flex-col items-center calc-width-navbar">
      <div className="hero-content flex flex-col items-center justify-center text-center lg:text-left lg:flex-row lg:m-auto calc-width">
        {profile ? (
          <>
            <div className="flex flex-col items-center lg:items-center">
              <img
                src={profile.image}
                alt={profile.name}
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div className="flex justify-center mt-4">
                <button
                  className="btn btn-primary mr-4"
                  title="Edit info"
                  onClick={() => document.getElementById('update-profile-modal').showModal()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>


                <dialog id="update-profile-modal" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Mis Datos</h3>
                    <ProfileForm />
                  </div>
                </dialog>

                <button className="btn btn-outline btn-primary" title="Delete" onClick={handleDelete}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-primary-color">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="lg:ml-10 mt-6 lg:mt-0 flex flex-col items-center lg:items-start">
              <h1 className="text-4xl font-bold text-primary-color">{profile.name}</h1>
              <div className="flex flex-col items-center lg:flex-row lg:justify-around my-6 w-full space-y-2 lg:space-y-0">
                <p className="text-lg">Email: {profile.email}</p>
                <div className="hidden lg:block border-l-2 border-primary-color h-6 mx-4"></div>
                <p className="text-lg">Te uniste el: {new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ProfilePage;
