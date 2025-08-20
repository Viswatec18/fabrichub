import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthCard from './components/AuthCard';
import BrandingSection from './components/BrandingSection';
import MobileHeader from './components/MobileHeader';

const LoginRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      // Redirect to intended destination or dashboard
      const from = location?.state?.from?.pathname || '/designer-directory-profiles';
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location]);

  // Handle auth mode toggle
  const handleAuthModeToggle = () => {
    setIsSignUp(!isSignUp);
  };

  // Handle successful auth
  const handleAuthSuccess = () => {
    const from = location?.state?.from?.pathname || '/designer-directory-profiles';
    navigate(from, { replace: true });
  };

  // Don't render if user is already logged in
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-macos-gray-1 flex flex-col">
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Branding */}
        <BrandingSection />
        
        {/* Right Side - Auth Form */}
        <div className="flex-1 lg:flex-none lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <AuthCard 
              isSignUp={isSignUp}
              onToggleMode={handleAuthModeToggle}
              onSuccess={handleAuthSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;