import RegistrationForm from '../../components/EndUser/Register/RegistrationForm';
import { useEffect } from 'react';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eff9f9] py-12">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default SignUpPage;