import React, { useState } from 'react';
import { BiAccessibility } from 'react-icons/bi';
import TextInput from '../../components/EndUser/Register/TextInput';
import Button from '../../components/EndUser/Button';

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
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setVerificationCode(value);
    setError('');
  };

  const handleVerification = async () => {
    if (!verificationCode) {
      setError('Vui lòng nhập mã xác nhận');
      return;
    }

    if (verificationCode.length !== 6) {
      setError('Mã xác nhận phải có 6 chữ số');
      return;
    }

    if (!/^\d{6}$/.test(verificationCode)) {
      setError('Mã xác nhận chỉ được chứa chữ số');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Verify code logic here
      if (verificationCode === '123456') {
        console.log('Verification successful');
        // Handle success (e.g., redirect)
      } else {
        setError('Mã xác nhận không đúng');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    // Simulate sending new code
    setCountdown(60);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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