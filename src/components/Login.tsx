import React, { useState } from 'react';
import { Heart, Users, Shield, FileText, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const demoAccounts = [
    { email: 'justicea@gmxmail.com', role: 'Parent', icon: Heart, color: 'bg-teal-500' },
    { email: 'ana@ruralhealth.ph', role: 'Rural Health Worker', icon: Heart, color: 'bg-teal-600' },
    { email: 'rosa@civilregistry.gov.ph', role: 'Registry Staff', icon: Shield, color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">islaBirth</h1>
              <p className="text-sm text-gray-500">Birth Registration System</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Features */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-teal-600 p-8 lg:p-16 text-white">
          <div className="max-w-md mx-auto lg:mx-0">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Streamlined Birth Registration for Everyone
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Secure, efficient, and accessible birth registration system connecting parents, healthcare workers, and registry staff.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Mobile-First Design</h3>
                  <p className="text-blue-100">Access from any device - phone, tablet, or computer with responsive design.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Digital Documentation</h3>
                  <p className="text-blue-100">Secure document upload and verification with real-time status tracking.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Secure & Compliant</h3>
                  <p className="text-blue-100">Built with security and data protection standards for sensitive information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your islaBirth account</p>
            </div>

            {/* Demo Accounts */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Health Worker & Registry Access (Password: password123)</h3>
              <div className="grid gap-3">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => setEmail(account.email)}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className={`flex items-center justify-center w-8 h-8 ${account.color} rounded-lg`}>
                      <account.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{account.role}</p>
                      <p className="text-xs text-gray-500">{account.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                Parents can view their children's records using the QR codes provided by health workers.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Learn More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}