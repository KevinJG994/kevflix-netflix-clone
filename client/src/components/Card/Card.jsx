import React from 'react'

export default function Card() {
    return (
        <div className="relative w-96 shadow-xl overflow-hidden group mb-6">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="w-full h-full object-cover"
                />
            </figure>
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg mb-2">Texto de ejemplo</p>
                <button className="bg-white text-black px-4 py-2 rounded-lg">Ver más</button>
            </div>
        </div>
    )
}
