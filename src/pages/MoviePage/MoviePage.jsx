import React from 'react'

export default function MoviePage() {
    const movies = [
        { image: 'https://www.lavanguardia.com/peliculas-series/images/movie/poster/2024/3/w1280/6tJWxRfBKWGIPFkfLTod2CgCexU.jpg', title: 'Danmel', year: '2024' },
        { image: 'https://lumiere-a.akamaihd.net/v1/images/image_81e2d881.jpeg?region=0%2C0%2C540%2C810&width=320', title: 'Capitan America 4', year: '2020' },
        { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR96g6yzjwSoAXveuHJQtozPKKWi74tKA2nqA&s', title: 'Thurderbolts', year: '2014' },
        { image: 'https://es.web.img3.acsta.net/c_310_420/img/c6/f8/c6f8e0d63437fb7df22483178e2d8f2c.jpg', title: 'Red One', year: '2021' },
    ]

    return (
        <div className="flex min-h-screen p-10 mt-20">
        <div className="w-4/4 ml-[70px]">
            <h2 className='text-3xl mb-6'>Últimas Películas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((item, index) => (
                    <div key={index} className="relative w-72 h-96 shadow-xl overflow-hidden group">
                        <figure className="w-full h-full">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-lg mb-2">{item.title}</p>
                            <button className="bg-white text-black px-4 py-2 rounded-lg">{item.year}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}
