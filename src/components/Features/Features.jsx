import React from 'react';

// FeatureCard component for individual features
const FeatureCard = ({ title, description, icon }) => (
  <div className="card bg-white shadow-lg hover:shadow-xl p-6 rounded-lg flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:scale-105">
    <div className="text-5xl text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="btn bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none mt-auto">Learn More</button>
  </div>
);

// Main Features Section Component
const Features = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Easy Assignment Creation"
            description="Create assignments effortlessly with our user-friendly interface."
            icon={<i className="fas fa-pencil-alt"></i>}
          />
          <FeatureCard
            title="Real-time Updates"
            description="Receive notifications and updates instantly."
            icon={<i className="fas fa-bell"></i>}
          />
          <FeatureCard
            title="Secure Authentication"
            description="Log in securely with our JWT-based authentication."
            icon={<i className="fas fa-lock"></i>}
          />
          <FeatureCard
            title="Responsive Design"
            description="Enjoy a seamless experience across all devices."
            icon={<i className="fas fa-mobile-alt"></i>}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
