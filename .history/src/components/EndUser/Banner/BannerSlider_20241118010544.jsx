
import React from 'react';
import Slider from 'react-slick';

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    const banners = [
        '/path/to/banner1.jpg',
        '/path/to/banner2.jpg',
        '/path/to/banner3.jpg'
    ];

    return (
        <div className="w-full max-w-4xl mx-auto mb-8">
            <Slider {...settings}>
                {banners.map((banner, index) => (
                    <div key={index} className="h-[300px]">
                        <img 
                            src={banner} 
                            alt={`Banner ${index + 1}`} 
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default BannerSlider;