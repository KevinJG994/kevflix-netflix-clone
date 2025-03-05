import React from 'react'

export default function AdminForm() {
    return (
        <div className='flex m-auto items-center'>
            <form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nombre</span>
                    </label>
                    <input type="text" placeholder="Nombre" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contraseña</span>
                    </label>
                    <input type="password" placeholder="Contraseña" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Foto de perfil</span>
                    </label>
                    <input type="file" placeholder="Foto de perfil" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Crear cuenta</button>

                </div>
            </form>
        </div>
    )
}
