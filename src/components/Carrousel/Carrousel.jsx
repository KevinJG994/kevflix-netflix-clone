import React, { useState, useEffect } from 'react';

export default function Carrousel() {
    const carrousel = [
        { image: '/images/Slider-Sonic-3.png', title: 'Sonic 3', subtitle: 'Sonic, Knuckles y Tails vuelven en su aventura más gloriosa. El equipo se reúne para enfrentarse a un nuevo y formidable enemigo, Shadow, un misterioso erizo con poderes nunca vistos.' },
        { image: '/images/Slider-Marvel.jpg', title: 'Avengers: Infinity War', subtitle: 'Con el poderoso Thanos a punto de descargar la destrucción sobre el universo, los Vengadores y sus aliados superhéroes lo arriesgan todo en el mayor enfrentamiento de todos los tiempos.' },
        { image: '/images/Slider-Gladiator.jpg', title: 'Gladiator II', subtitle: 'Dieciséis años después de la muerte de Marco Aurelio, Roma está gobernada por los despiadados emperadores gemelos Geta y Caracalla. El nieto de Aurelio, Lucio Vero, vive bajo el seudónimo de Hanno con su esposa Arishat en el reino norteafricano de Numidia.' },
    ]

    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carrousel.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [carrousel.length]);

    return (
        <div className="carousel w-full">
            {carrousel.map((item, index) => (
                <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full" >
                    <img
                        src={item.image}
                        className="w-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <h2 className="text-4xl font-bold">{item.title}</h2>
                        <p className="text-xl mx-32 text-center hidden md:block my-6">{item.subtitle}</p>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href={`#slide${index === 0 ? carrousel.length : index}`} className="btn btn-circle"  onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + carrousel.length) % carrousel.length)}>❮</a>
                        <a href={`#slide${index === carrousel.length - 1 ? 1 : index + 2}`} className="btn btn-circle" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % carrousel.length)}>❯</a>
                    </div>
                </div>
            ))}
        </div>
    )
}