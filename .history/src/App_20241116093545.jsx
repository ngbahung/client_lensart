import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/EndUser/Header/Header';
import LoginPage from './pages/Admin/LoginPage';
import Homepage from './pages/EndUser/Homepage';

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
                {/* Admin Routes - Place these first for priority */}
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin/*" element={
                    // <ProtectedRoute>
                        <Routes>
                            <Route path="dashboard" element={<div>Admin Dashboard</div>} />
                        </Routes>
                    </ProtectedRoute>
                } />

                {/* End User Routes */}
                <Route path="/" element={<Homepage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
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