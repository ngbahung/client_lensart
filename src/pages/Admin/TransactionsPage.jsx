import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Admin/Navbar_Header/Navbar';
import Header from '../../components/Admin/Navbar_Header/Header';


const TransactionsPage = () => {
    useEffect(() => {
        document.title = 'Transactions Admin | LensArt';
    }, []);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(''); // Trạng thái lỗi
    const [dashboardData, setDashboardData] = useState(null); // Dữ liệu chính của dashboard

    // Hàm giả lập tải dữ liệu dashboard
    const fetchData = async () => {
        setLoading(true);
        try {
            // Giả lập API gọi dữ liệu
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setDashboardData({
                ordersToday: 20,
                revenue: '$4500',
                newCustomers: 15,
                productsSold: 50,
            });
        } catch (err) {
            setError('Không thể tải dữ liệu Dashboard. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // Tự động tải dữ liệu khi trang Dashboard được render
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Thanh Navbar */}
            <Navbar />

            {/* Phần nội dung bên phải */}
            <div className="flex-1 bg-[#eff9f9] min-h-screen pl-[17%] flex flex-col">
                {/* Header được bao trong một div riêng */}
                <div className="md-4 h-[8%]">
                    <Header/>
                </div>

                {/* Dashboard chiếm phần còn lại */}
                <div className="bg-white rounded-md flex-grow m-7 h-[98%]">
                    Transactions...
                </div>
            </div>
        </div>

    );
};

export default TransactionsPage
