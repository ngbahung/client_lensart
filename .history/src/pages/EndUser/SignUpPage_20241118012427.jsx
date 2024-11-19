import RegistrationForm from '../../components/EndUser/Register/RegistrationForm';
import { useEffect } from 'react';
import Logo from '../../components/Logo';

const SignUpPage = () => {

  useEffect(() => {
    document.title = 'Đăng ký | LensArt';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eff9f9]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default SignUpPage;