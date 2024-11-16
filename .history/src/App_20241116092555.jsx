import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/EndUser/Header/Header';
import LoginPage from './pages/Admin/LoginPage';

// const ProtectedRoute = ({ children }) => {
//     // Add your auth check logic here
//     const isAuthenticated = localStorage.getItem('authToken');
//     const location = useLocation();

//     if (!isAuthenticated) {
//         return <Navigate to="/admin/login" state={{ from: location }} replace />;
//     }

//     return children;
// };

const AppContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="App">
            {!isAdminRoute && <Header />}
            <Routes>
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin/*" element={
                    <ProtectedRoute>
                        {/* Add your admin routes here */}
                        <div>Admin Dashboard</div>
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/admin/login" replace />} />
            </Routes>
        </div>
    );
};

const App = () => (
    <BrowserRouter>
        <AppContent />
    </BrowserRouter>
);

export default App;