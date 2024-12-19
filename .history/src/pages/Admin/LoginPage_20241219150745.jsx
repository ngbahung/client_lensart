import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from 'react-icons/bi';
import axios from 'axios';
import Logo from '../../components/Logo';
import InputField from '../../components/Admin/Login/InputField';
import LoginButton from '../../components/Admin/Login/Button';
import { adminLogin } from '../../api/authAPI';

const LoginPage = () => {
    useEffect(() => {
        document.title = 'Login Admin | LensArt';
    }, []);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Vui lòng điền đầy đủ thông tin');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        try {
            const token = await adminLogin({
                email: formData.email,
                password: formData.password
            });

            // Store admin token
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminEmail', formData.email);

            // Set Authorization header for subsequent requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full bg-white rounded-[20px] shadow-lg p-8">
            <div className="flex justify-center mb-6">
                <Logo />
            </div>
            
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                Đăng nhập
            </h1>
            
            <form onSubmit={handleLogin}>
                <InputField
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                    error={error}
                />
                
                <InputField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    error={error}
                    icon={
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                        </button>
                    }
                />
                
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                
                <div className="mt-8 flex justify-center">
                    <LoginButton
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </LoginButton>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
