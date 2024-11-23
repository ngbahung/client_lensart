import { FaStar } from 'react-icons/fa';

/**
 * Component hiển thị đánh giá của khách hàng
 * @param {Object} props
 * @param {Array} props.reviews - Mảng chứa các đánh giá của khách hàng
 * @returns {JSX.Element} Component hiển thị danh sách đánh giá
 */
const CustomerReviews = ({ reviews }) => {
    // Kiểm tra nếu không có đánh giá
    if (!reviews || reviews.length === 0) {
        return <div>Chưa có đánh giá nào.</div>;
    }

    // Tính điểm đánh giá trung bình
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <div className="space-y-6">
            {/* Phần header hiển thị điểm trung bình và tổng số đánh giá */}
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

            {/* Danh sách các đánh giá chi tiết */}
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    // Chi tiết một đánh giá
                    <div key={index} className="border-b pb-4">
                        {/* Phần header của đánh giá bao gồm số sao, tên người dùng và ngày */}
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
                        {/* Nội dung bình luận */}
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;