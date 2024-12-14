import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiAccessibility } from 'react-icons/bi';
import TextInput from '../../components/EndUser/Register/TextInput';
import Button from '../../components/EndUser/Button';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { verifyOTP, resendOTP } from '../../api/authAPI';

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

const ResendCode = ({ onResend, countdown }) => (
  <div className="text-center mt-4">
    {countdown > 0 ? (
      <p className="text-gray-500 text-sm">
        Gửi lại mã sau {countdown} giây
      </p>
    ) : (
      <button
        onClick={onResend}
        className="text-teal-400 hover:text-teal-500 text-sm"
      >
        Gửi lại mã
      </button>
    )}
  </div>
);

  const VerificationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const [verificationCode, setVerificationCode] = useState('');
    
    
    useEffect(() => {
      if (!email) {
        navigate('/register');
      }
    }, [email, navigate]);

    const handleVerification = async () => {
      if (!validateOTP()) return;
      
      setLoading(true);
      try {
        await verifyOTP(verificationCode);
        navigate('/login', {
          state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' }
        });
      } catch (error) {
        setError(error.message || 'Mã xác thực không đúng');
      } finally {
        setLoading(false);
      }
    };

    const handleResendCode = async () => {
      try {
        await resendOTP();
        setCountdown(60);
        startCountdown();
      } catch (error) {
        setError('Không thể gửi lại mã. Vui lòng thử lại sau.');
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
        <ResendCode
          onResend={handleResendCode}
          countdown={countdown}
        />
      </div>
    </div>
  );
};

export default VerificationPage;