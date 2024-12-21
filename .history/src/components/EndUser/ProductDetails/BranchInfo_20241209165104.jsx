import { useState } from 'react';
import { formatPrice } from '../../../utils/formatPrice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const BranchInfo = ({ branchPrices }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">GIÁ TẠI CÁC CHI NHÁNH</h3>
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-2 bg-white rounded-md shadow-sm hover:bg-gray-50"
            >
                <span>Xem giá tại chi nhánh ({branchPrices.length})</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isOpen && (
                <div className="mt-2 space-y-2">
                    {branchPrices.map((branch) => (
                        <div key={branch.branchId} className="bg-white p-3 rounded-md shadow-sm">
                            <div className="font-semibold text-gray-800">{branch.branchName}</div>
                            <div className="text-sm text-gray-600">{branch.address}</div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="font-bold text-teal-600">
                                    {formatPrice(branch.currentPrice)}
                                </span>
                                {branch.originalPrice > branch.currentPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                        {formatPrice(branch.originalPrice)}
                                    </span>
                                )}
                                {!branch.inStock && (
                                    <span className="text-red-500 text-sm">Hết hàng</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BranchInfo;