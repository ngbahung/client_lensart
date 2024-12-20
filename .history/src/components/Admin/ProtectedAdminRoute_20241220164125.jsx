import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { toast } from 'react-toastify';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loading, adminUser } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    toast.error('Vui lòng đăng nhập với tư cách quản trị viên');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!adminUser?.role === 'admin') {
    toast.error('Bạn không có quyền truy cập trang này');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
