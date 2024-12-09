
import { useState } from 'react';

const ImageGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                    src={images[selectedImage]}
                    alt="Selected product"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                            selectedImage === idx ? 'ring-2 ring-teal-500' : ''
                        }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;