import React from 'react';
import { HeartIcon, ShieldCheckIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const AboutSection = ({ title, description, icon }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    {icon}
    <h3 className="mt-4 text-xl font-semibold text-primary-600">{title}</h3>
    <p className="mt-2 text-gray-600 text-center">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary-800 mb-8">About Swasthya Setu</h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Bridging the gap between healthcare and technology for a healthier tomorrow
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AboutSection 
            title="Comprehensive Care" 
            description="We provide a holistic approach to healthcare, ensuring that every aspect of your well-being is addressed."
            icon={<HeartIcon className="h-12 w-12 text-primary-500" />}
          />
          <AboutSection 
            title="Data Security" 
            description="Your health information is sensitive. We employ state-of-the-art security measures to keep your data safe and confidential."
            icon={<ShieldCheckIcon className="h-12 w-12 text-primary-500" />}
          />
          <AboutSection 
            title="Community Focus" 
            description="We believe in the power of community. Our platform connects patients, healthcare providers, and volunteers to create a supportive ecosystem."
            icon={<UserGroupIcon className="h-12 w-12 text-primary-500" />}
          />
          <AboutSection 
            title="Global Reach" 
            description="Healthcare knows no boundaries. We're committed to making quality healthcare accessible to all, regardless of geographical location."
            icon={<GlobeAltIcon className="h-12 w-12 text-primary-500" />}
          />
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-primary-700 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            At Swasthya Setu, our mission is to revolutionize healthcare delivery through innovative technology. 
            We strive to create a seamless connection between patients, healthcare providers, and essential medical resources. 
            By leveraging cutting-edge digital solutions, we aim to enhance accessibility, improve efficiency, and ultimately 
            contribute to better health outcomes for communities across the globe.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Join us in our journey to transform healthcare. Together, we can build a healthier future.
          </p>
          <button className="mt-4 bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;