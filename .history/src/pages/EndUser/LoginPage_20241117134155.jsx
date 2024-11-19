import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from 'react-icons/bi';
import Logo from '../../components/Logo';
import InputField from '../../components/Admin/Login/InputField';
import LoginButton from '../../components/Admin/Login/Button';
import Header from '../../components/EndUser/Header/Header';

const LoginPage = () => {
    useEffect(() => {
        document.title = 'Đăng nhập | LensArt';
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
            // Add your login API call here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            navigate('/');
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <H
        <div className="fixed inset-0 min-h-screen bg-[#eff9f9] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 relative z-10">
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
                    
                    <div className="mt-8">
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
        </div>
    );
};

export default LoginPage;