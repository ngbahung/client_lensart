import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiAccessibility } from 'react-icons/bi';
import TextInput from '../../components/EndUser/Register/TextInput';
import Button from '../../components/EndUser/Button';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { verifyOTP, resendOTP } from '../../api/authAPI';
import { toast } from 'react-toastify';

const VerificationIcon = () => (
  <div className="flex justify-center mb-6">
    <div className="w-16 h-16 rounded-full bg-teal-400/20 flex items-center justify-center">
      <BiAccessibility className="w-8 h-8 text-teal-400" />
    </div>
  </div>
);

const VerificationTitle = () => (
  <div className="text-center mb-8">
    <h1 className="text-xl font-semibold text-gray-800 mb-2">
      Hãy xác nhận đó là bạn
    </h1>
    <p className="text-gray-500 text-sm px-8">
      Hãy nhập mã bảo mật chúng tôi sẽ gửi qua email bạn. Mã sẽ không thay đổi nếu bạn trang lại trang web này
    </p>
  </div>
);


const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const validateOTP = () => {
    if (!verificationCode) {
      setError('Vui lòng nhập mã xác thực');
      return false;
    }
    if (verificationCode.length !== 6) {
      setError('Mã xác thực phải có 6 chữ số');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setVerificationCode(value);
    setError('');
  };

  const handleVerification = async () => {
    if (!validateOTP()) {
      toast.error('Vui lòng nhập mã OTP hợp lệ');
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(verificationCode);
      toast.success('Xác thực email thành công!');
      navigate('/login', {
        state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' }
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Mã xác thực không đúng');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendOTP();
      toast.info('Đã gửi lại mã xác thực');
      setCountdown(60);
      startCountdown();
    } catch (error) {
      toast.error('Không thể gửi lại mã. Vui lòng thử lại sau.');
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#eff9f9] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8">
        <VerificationIcon />
        <VerificationTitle />
        <TextInput
          type="text"
          name="otp"
          value={verificationCode}
          onChange={handleInputChange}
          placeholder="Nhập mã 6 chữ số"
          error={error}
          className="text-center"
          maxLength={6}
          pattern="[0-9]*"
          inputMode="numeric"
        />
        <Button
          onClick={handleVerification}
          className={`w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Tiếp tục'}
        </Button>
        <button
          onClick={handleResendCode}
          disabled={countdown > 0}
          className="text-teal-600 hover:text-teal-700 disabled:text-gray-400"
        >
          {countdown > 0 
            ? `Gửi lại mã (${formatTime(countdown)})` 
            : 'Gửi lại mã'}
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;