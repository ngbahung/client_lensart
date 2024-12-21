import { FaStar } from 'react-icons/fa';
import ReviewForm from './ReviewForm';

const CustomerReviews = ({ reviews = [], averageRating = '0.0', totalReviews = 0, onSubmitReview }) => {
    const activeReviews = reviews.filter(review => review.status === 'active');
    
    return (
        <div className="space-y-6">
            {/* Review Form */}
            <ReviewForm onSubmit={onSubmitReview} />

            {/* Review Summary */}
            <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold">Đánh giá từ khách hàng</h3>
                <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">{averageRating}</span>
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={`text-xl ${
                                    index < Math.round(Number(averageRating)) 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-200'
                                }`}
                            />
                        ))}
                    </div>
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
                    activeReviews.map((review) => (
                        <div key={review.id} className="border-b pb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, idx) => (
                                        <FaStar
                                            key={idx}
                                            className={`text-base ${
                                                idx < Number(review.rating) 
                                                ? 'text-yellow-400' 
                                                : 'text-gray-200'
                                            }`}
                                        />
                                    ))}
                                </div>
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