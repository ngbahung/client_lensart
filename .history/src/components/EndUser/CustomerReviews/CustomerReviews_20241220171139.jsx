import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import ReviewForm from './ReviewForm';

const RatingStars = ({ rating }) => {
    const stars = [];
    const ratingNum = Number(rating);
    
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(ratingNum)) {
            stars.push(<FaStar key={i} className="text-xl text-yellow-400" />);
        } else if (i === Math.ceil(ratingNum) && !Number.isInteger(ratingNum)) {
            stars.push(<FaStarHalfAlt key={i} className="text-xl text-yellow-400" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-xl text-gray-300" />);
        }
    }
    
    return <div className="flex items-center">{stars}</div>;
};

const ReviewStars = ({ rating }) => {
    const stars = [];
    const ratingNum = Number(rating);
    
    for (let i = 1; i <= 5; i++) {
        if (i <= ratingNum) {
            stars.push(<FaStar key={i} className="text-base text-yellow-400" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-base text-gray-300" />);
        }
    }
    
    return <div className="flex items-center">{stars}</div>;
};

const CustomerReviews = ({ reviews = [], averageRating = '0.0', totalReviews = 0, onSubmitReview }) => {
    const activeReviews = reviews?.filter(review => review.status === 'active') || [];
    
    return (
        <div className="space-y-6">
            {/* Review Form */}
            <ReviewForm onSubmit={onSubmitReview} />

            {/* Review Summary */}
            <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold">Đánh giá từ khách hàng</h3>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{averageRating}</span>
                    <RatingStars rating={averageRating} />
                    <span className="text-gray-500">
                        ({activeReviews.length} đánh giá)
                    </span>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {activeReviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                        Chưa có đánh giá nào.
                    </p>
                ) : (
                    activeReviews.map((review, index) => (
                        <div key={`${review.id || ''}-${index}`} className="border-b pb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <ReviewStars rating={review.rating} />
                                <span className="font-medium">{review.userName}</span>
                                <span className="text-gray-500 text-sm">
                                    {new Date(review.date).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerReviews;