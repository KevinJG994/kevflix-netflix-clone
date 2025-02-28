import React from 'react'

export default function Carrousel() {
    return (
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src="/images/banner sonic.jpg"
                    className="w-full object-cover opacity-50" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src="/images/Banner Marvel.jpg"
                    className="w-full object-cover opacity-50" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>

            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src="/images/Breaking-Bad-Banner.jpg"
                    className="w-full object-cover opacity-50" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src="/images/THOR-banner.jpg"
                    className="w-full object-cover opacity-50" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    )
}
