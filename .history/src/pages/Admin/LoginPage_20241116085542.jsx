const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleLogin = (e) => {
      e.preventDefault();
      // Add login logic here
      console.log('Login attempt with:', { email, password });
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <Logo />
          
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Đăng nhập
          </h1>
          
          <form onSubmit={handleLogin}>
            <InputField
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={() => (
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <BiHide /> : <BiShow />}
                </div>
              )}
            />
            
            <div className="mt-8">
              <LoginButton onClick={handleLogin} />
            </div>
          </form>
        </div>
      </div>
    );
  };
  
export default LoginForm;