// Import các thư viện cần thiết
import React, { memo, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { fetchBanner } from '../../../api/bannerAPI';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Cấu hình cho slider
const sliderSettings = {
    dots: true,          // Hiển thị các chấm điều hướng
    infinite: true,      // Cho phép trượt vô hạn
    speed: 500,          // Tốc độ chuyển slide (ms)
    slidesToShow: 1,     // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1,   // Số lượng slide được trượt mỗi lần
    autoplay: true,      // Tự động chuyển slide
    autoplaySpeed: 3000, // Thời gian giữa các lần chuyển slide (ms)
};

// Component BannerSlider: Hiển thị slider các banner
const BannerSlider = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const bannerData = await fetchBanner();
                setBanners(Array.isArray(bannerData) ? bannerData : [bannerData]); // Handle single or multiple banners
            } catch (error) {
                console.error('Error loading banners:', error);
            }
        };
        loadBanners();
    }, []);

    if (banners.length === 0) return null;

    return (
        <div className="banner-slider mb-8">
            <Slider {...sliderSettings}>
                {banners.filter(banner => banner.status === 'active').map(banner => (
                    <div key={banner.id} className="relative">
                        <img 
                            src={banner.image_url} 
                            alt={banner.image_public_id || "Banner"}
                            className="w-full h-[600px] object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// Xuất component với React.memo để tối ưu hiệu năng
export default memo(BannerSlider);