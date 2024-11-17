import RegistrationForm from '../../components/EndUser/Register/RegistrationForm';

const SignUpPage = () => {

  useEffect(() => {
    document.title = 'Đăng ký | LensArt';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eff9f9]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default SignUpPage;