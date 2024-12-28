import React from 'react';

const PolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <img
            src="/src/assets/images/lensart_policy.png"
            alt="Privacy Policy Banner"
            className="w-full h-48 object-cover rounded-lg mt-6 shadow-lg"
          />
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information that you provide directly to us, including personal
              information such as your name, email address, and any other information
              you choose to provide.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We use the information we collect to provide, maintain, and improve
              our services, to communicate with you, and to comply with legal
              obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Information Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational security measures
              to protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
