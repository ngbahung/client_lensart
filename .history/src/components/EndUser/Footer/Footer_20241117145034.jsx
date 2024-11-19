import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to subscribe the email
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="w-full">
      <h3 className="text-white mb-2">Đăng ký để nhận thông tin mới nhất</h3>
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
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
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
    <h3 className="mb-2">THÔNG TIN LIÊN HỆ</h3>
    <p className="mb-1">19001234</p>
    <p>marketing@lensart.com</p>
  </div>
);

const Logo = () => (
  <div className="flex items-center">
    <div className="w-12 h-12">
      <svg viewBox="0 0 100 100" className="w-full h-full text-white">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" />
        <path
          d="M50 5 A45 45 0 0 1 95 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
        />
      </svg>
    </div>
    <span className="text-white text-xl ml-2">LENSART</span>
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
        <div className="text-white text-sm text-center border-t border-white/20 pt-4">
          <p>Bản quyền {currentYear} LensArt Eyewear. Bảo lưu mọi quyền.</p>
          <p>LensArt Eyewear và logo LensArt Eyewear đã đăng ký bảo hộ của LensArt L.P.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;