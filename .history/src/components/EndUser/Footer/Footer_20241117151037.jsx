import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BsArrowRight,
  BsTelephone,
  BsEnvelope,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube
} from 'react-icons/bs';

const Logo = () => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link to='/' className="flex-shrink-0 flex justify-center md:justify-start">
      <img 
        src="/src/assets/images/Logo_Footer.png" 
        alt="Logo" 
        className="h-14 w-auto sm:h-16 md:h-20 lg:h-24 transition-all duration-200"
        onError={(e) => {
          setImageError(true);
          e.target.src = '/src/assets/images/fallback-logo.png';
        }}
      />
    </Link>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Vui lòng nhập email hợp lệ');
      return;
    }

    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="w-full">
      <h3 className="text-white mb-2 font-medium">Đăng ký để nhận thông tin mới nhất</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          placeholder="Để lại email của bạn"
          className={`flex-1 px-4 py-2 rounded-full bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 ${
            error ? 'ring-2 ring-red-500' : ''
          }`}
          required
        />
        <button
          type="submit"
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <BsArrowRight className="w-6 h-6 text-white" />
        </button>
      </form>
      {error && (
        <p className="text-red-200 mt-2 text-sm">{error}</p>
      )}
      {isSubmitted && (
        <p className="text-white mt-2 text-sm">Cảm ơn bạn đã đăng ký!</p>
      )}
    </div>
  );
};

const ContactInfo = () => (
  <div className="text-white text-center md:text-right">
    <h3 className="mb-4 font-medium">THÔNG TIN LIÊN HỆ</h3>
    <div className="space-y-3">
      <div className="flex items-center gap-2 justify-center md:justify-end">
        <BsTelephone className="w-4 h-4" />
        <p>19001234</p>
      </div>
      <div className="flex items-center gap-2 justify-center md:justify-end">
        <BsEnvelope className="w-4 h-4" />
        <p>marketing@lensart.com</p>
      </div>
      <div className="flex items-center gap-4 mt-4 justify-center md:justify-end">
        <a href="#" className="hover:text-white/80 transition-colors">
          <BsFacebook className="w-5 h-5" />
        </a>
        <a href="#" className="hover:text-white/80 transition-colors">
          <BsInstagram className="w-5 h-5" />
        </a>
        <a href="#" className="hover:text-white/80 transition-colors">
          <BsTwitter className="w-5 h-5" />
        </a>
        <a href="#" className="hover:text-white/80 transition-colors">
          <BsYoutube className="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#6fd4d2] px-4 sm:px-6 py-6 sm:py-8 fixed bottom-0 left-0 right-0 w-full z-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 mb-6 sm:mb-8">
          <Logo />
          <div className="flex justify-center items-start">
            <Newsletter />
          </div>
          <ContactInfo />
        </div>
        <div className="text-white/90 text-xs sm:text-sm text-center border-t border-white/20 pt-4 space-y-1">
          <p>Bản quyền {currentYear} LensArt Eyewear. Bảo lưu mọi quyền.</p>
          <p>LensArt Eyewear và logo LensArt Eyewear đã đăng ký bảo hộ của LensArt L.P.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;