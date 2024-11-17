import React, { useEffect } from 'react';

const AdminHomePage = () => {
    useEffect(() => {
        document.title = 'Trang chủ Admin | LensArt';
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome to Admin Homepage</h1>
            <p className="text-gray-600 mt-2">This is the admin dashboard.</p>
        </div>
    );
};

export default AdminHomePage;
