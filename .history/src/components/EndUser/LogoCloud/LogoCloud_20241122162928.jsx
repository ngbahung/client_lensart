import React from 'react';
import Slider from 'react-slick';

const LogoCloud = ({ brands }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: "linear",
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <div className="bg-gray-50 py-8">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-8">
                    Thương hiệu nổi tiếng
                </h2>
                <Slider {...settings}>
                    {brands.map((brand) => (
                        <div key={brand.id} className="px-4">
                            <div className="flex items-center justify-center hover:opacity-75 transition-opacity">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="h-20 w-auto md:h-24 object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default LogoCloud;