import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Shield, ArrowRight } from 'lucide-react';
import Button from './shared/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Welcome to Member Portal
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-indigo-100 sm:text-2xl md:mt-5 md:max-w-3xl">
              Manage your profile, payments, and health information in one secure place.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/validation">
                <Button className="!bg-white !text-indigo-600 hover:!bg-indigo-50">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 rounded-xl p-8">
              <UserCircle className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Easy Profile Management
              </h3>
              <p className="text-gray-600">
                Update your contact information, manage payment methods, and keep your health records up to date.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-8">
              <Shield className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure Access
              </h3>
              <p className="text-gray-600">
                Your information is protected with industry-standard security measures and OTP verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;