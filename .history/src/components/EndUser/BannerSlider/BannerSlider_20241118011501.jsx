
import React, { memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

const BannerSlider = ({ banners }) => (
    <div className="banner-slider mb-8">
        <Slider {...sliderSettings}>
            {banners.map(banner => (
                <div key={banner.id} className="relative">
                    <img 
                        src={banner.image} 
                        alt={banner.alt}
                        className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8">
                        <div className="container mx-auto">
                            <h2 className="text-4xl font-bold text-white mb-2">{banner.alt}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    </div>
);

export default memo(BannerSlider);