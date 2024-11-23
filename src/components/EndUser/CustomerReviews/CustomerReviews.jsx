import { FaStar } from 'react-icons/fa';

const CustomerReviews = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <div>Chưa có đánh giá nào.</div>;
    }

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold">Đánh giá từ khách hàng</h3>
                <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={`text-xl ${
                                    index < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-gray-500">({reviews.length} đánh giá)</span>
                </div>
            </div>

            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, idx) => (
                                    <FaStar
                                        key={idx}
                                        className={`text-base ${
                                            idx < review.rating ? 'text-yellow-400' : 'text-gray-200'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="font-medium">{review.userName}</span>
                            <span className="text-gray-500 text-sm">
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;