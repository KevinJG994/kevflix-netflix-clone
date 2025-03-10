import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../../services/users.service';
import { AuthContext } from '../../context/auth.context';

export default function ProfileForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
  
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
  
    useEffect(() => {
      if (user && user._id) {
        userService
          .getUserById(user._id)
          .then((response) => {
            const profile = response.data;
            setName(profile.name);
            setEmail(profile.email);
            setImage(profile.image);
          })
          .catch((error) => {
            const errorDescription = error.response?.data?.message || "An error occurred";
            setErrorMessage(errorDescription);
          });
      }
    }, [user]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = { name, email, image };
  
      userService
        .updateUser(user._id, formData)
        .then((response) => {
          console.log('Usuario editado:', response.data);
          navigate(-1);
        })
        .catch((error) => {
          const errorDescription = error.response?.data?.message || "An error occurred";
          setErrorMessage(errorDescription);
        });
    };

    return (
        <div className='flex m-auto items-center'>
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nombre</span>
                    </label>
                    <input type="text" placeholder="Nombre" className="input input-bordered" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} value={email} disabled/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Foto de perfil</span>
                    </label>
                    <input type="text" placeholder="Foto de perfil" className="input input-bordered" onChange={(e) => setImage(e.target.value)} value={image} required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Modificar datos</button>
                </div>
            </form>
        </div>
    )
}
