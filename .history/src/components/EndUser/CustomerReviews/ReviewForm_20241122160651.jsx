
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Vui lòng chọn số sao đánh giá');
            return;
        }
        onSubmit({ rating, comment });
        setRating(0);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
            <h4 className="font-semibold">Viết đánh giá của bạn</h4>
            
            <div className="flex gap-1">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            onClick={() => setRating(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                            className="text-2xl focus:outline-none"
                        >
                            <FaStar 
                                className={`${
                                    ratingValue <= (hover || rating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded-lg p-2 min-h-[100px]"
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                required
            />

            <button 
                type="submit"
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
            >
                Gửi đánh giá
            </button>
        </form>
    );
};

export default ReviewForm;