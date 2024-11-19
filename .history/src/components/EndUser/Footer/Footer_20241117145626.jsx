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
    <Link to='/' className="flex-shrink-0">
      <img 
        src="/src/assets/images/Logo_Footer.png" 
        alt="Logo" 
        className="h-12 w-auto sm:h-16 md:h-20 lg:h-24 transition-all duration-200"
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Để lại email của bạn"
          className="flex-1 px-4 py-2 rounded-full bg-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
          required
        />
        <button
          type="submit"
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <BsArrowRight className="w-6 h-6 text-white" />
        </button>
      </form>
      {isSubmitted && (
        <p className="text-white mt-2 text-sm">Cảm ơn bạn đã đăng ký!</p>
      )}
    </div>
  );
};

const ContactInfo = () => (
  <div className="text-white">
    <h3 className="mb-4 font-medium">THÔNG TIN LIÊN HỆ</h3>
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <BsTelephone className="w-4 h-4" />
        <p>19001234</p>
      </div>
      <div className="flex items-center gap-2">
        <BsEnvelope className="w-4 h-4" />
        <p>marketing@lensart.com</p>
      </div>
      <div className="flex items-center gap-4 mt-4">
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
    <footer className="bg-teal-400 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Logo />
          <Newsletter />
          <ContactInfo />
        </div>
        <div className="text-white/90 text-sm text-center border-t border-white/20 pt-4 space-y-1">
          <p>Bản quyền {currentYear} LensArt Eyewear. Bảo lưu mọi quyền.</p>
          <p>LensArt Eyewear và logo LensArt Eyewear đã đăng ký bảo hộ của LensArt L.P.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;