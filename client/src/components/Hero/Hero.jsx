import React from 'react'

export default function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://www.teleadhesivo.com/blog/wp-content/uploads/2022/06/los-mejores-posters-de-pel%C3%ADculas.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
      <div
        className="absolute inset-0 bg-black opacity-75"
      ></div>
      <div className="hero-content flex-col lg:flex-row-reverse relative z-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-primary-color">¡Unete a KevFlix!</h1>
          <p className="py-6 text-2xl">
          Disfruta de tu sitio web de streaming favorito en el que podrás ver la mejor selección de películas y series online gratis desde cualquier dispositivo en la mejor calidad, sin cortes y con unas gran variedad de idiomas.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">¿No tienes cuenta? - Registrate</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
