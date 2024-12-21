// Import các thư viện cần thiết
import React, { memo, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchBanner } from '../../../api/bannerAPI';

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
// banners: Mảng chứa thông tin các banner (hình ảnh, alt text, id)
const BannerSlider = () => {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const data = await fetchBanner();
                setBanners(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadBanners();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading banners: {error}</div>;
    if (!banners.length) return null;

    return (
        <div className="banner-slider mb-8">
            <Slider {...sliderSettings}>
                {banners.map(banner => (
                    <div key={banner.id} className="relative">
                        {/* Hình ảnh banner */}
                        <img 
                            src={banner.image} 
                            alt={banner.alt}
                            className="w-full h-[600px] object-cover"
                        />
                        {/* Phần overlay chứa text, gradient từ đen đến trong suốt */}
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
};

// Xuất component với React.memo để tối ưu hiệu năng
export default memo(BannerSlider);