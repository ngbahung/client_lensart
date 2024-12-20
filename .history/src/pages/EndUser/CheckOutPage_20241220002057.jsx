import React, { useEffect } from "react";
import CheckoutForm from "../../components/EndUser/Checkout/CheckoutForm";
import CheckoutSummary from "../../components/EndUser/Checkout/CheckoutSummary";
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from "../../components/EndUser/Breadcrumb/Breadcrumb";
import { toast } from 'react-toastify';

const CheckOutPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  const breadcrumbItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Giỏ hàng', path: '/gio-hang' },
    { label: 'Thanh toán', path: '/checkout' }
  ];

  useEffect(() => {
    document.title = 'Thanh toán | LensArt EyeWear';
    
    // Validate selected items and branch consistency
    const selectedItems = items.filter(item => item.selected);
    if (selectedItems.length === 0) {
      toast.error('Vui lòng chọn sản phẩm để thanh toán');
      navigate('/gio-hang');
      return;
    }

    // Check if all items are from the same branch
    const firstBranchId = selectedItems[0].branch_id;
    const hasDifferentBranches = selectedItems.some(item => item.branch_id !== firstBranchId);
    
    if (hasDifferentBranches) {
      toast.error('Chỉ có thể thanh toán các sản phẩm từ cùng một chi nhánh');
      navigate('/gio-hang');
      return;
    }

    setIsLoading(false);
  }, [items, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <CheckoutForm />
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;