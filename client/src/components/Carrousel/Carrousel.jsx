import React from 'react'

export default function Carrousel() {
    const carrousel = [
        { image: '/images/banner sonic.jpg', title: 'Sonic 3', subtitle: 'Sonic, Knuckles y Tails vuelven en su aventura más gloriosa. El equipo se reúne para enfrentarse a un nuevo y formidable enemigo, Shadow, un misterioso erizo con poderes nunca vistos.' },
        { image: '/images/Banner Marvel.jpg', title: 'Avengers: Infinity War', subtitle: 'Con el poderoso Thanos a punto de descargar la destrucción sobre el universo, los Vengadores y sus aliados superhéroes lo arriesgan todo en el mayor enfrentamiento de todos los tiempos.' },
        { image: '/images/Breaking-Bad-Banner.jpg', title: 'Breaking Bad', subtitle: 'Un profesor de química con cáncer terminal se asocia con un exalumno suyo para fabricar y vender metanfetamina a fin de que su familia no pase apuros económicos.' },
        { image: '/images/THOR-banner.jpg', title: 'Thor: Love and Thunder', subtitle: 'El Dios del Trueno (Chris Hemsworth) se alía con la rey Valkiria, Korg y su exnovia convertida en la Poderosa Thor, Jane Foster (Natalie Portman) para acabar con un asesino galáctico conocido como Gorr, el Carnicero de Dioses (Christian Bale).' },
    ]

    return (
        <div className="carousel w-full">
            {carrousel.map((item, index) => (
                <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full">
                    <img
                        src={item.image}
                        className="w-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <h2 className="text-4xl font-bold">{item.title}</h2>
                        <p className="text-xl mx-32 text-center">{item.subtitle}</p>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href={`#slide${index === 0 ? carrousel.length : index}`} className="btn btn-circle">❮</a>
                        <a href={`#slide${index === carrousel.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            ))}
        </div>
    )
}