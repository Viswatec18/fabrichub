import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AuthCard = ({ isSignUp, onToggleMode, onSuccess }) => {
  const { signIn, signUp, error: authError, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'buyer'
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors?.[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      errors.email = 'Email address is invalid';
    }

    // Password validation
    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Sign up specific validations
    if (isSignUp) {
      if (!formData?.fullName?.trim()) {
        errors.fullName = 'Full name is required';
      }

      if (formData?.password !== formData?.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      let result;
      
      if (isSignUp) {
        result = await signUp(formData?.email, formData?.password, {
          full_name: formData?.fullName,
          role: formData?.role
        });
      } else {
        result = await signIn(formData?.email, formData?.password);
      }

      if (result?.data && !result?.error) {
        onSuccess?.();
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleSocialAuth = async (provider) => {
    console.log(`${provider} authentication not implemented yet`);
  };

  return (
    <div className="card-macos p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Users" size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-muted-foreground">
          {isSignUp 
            ? 'Join FabricHub to connect with designers and vendors' 
            : 'Sign in to your FabricHub account'
          }
        </p>
      </div>
      {/* Error Display */}
      {authError && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{authError}</p>
          </div>
        </div>
      )}
      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name (Sign Up Only) */}
        {isSignUp && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <Input
              type="text"
              name="fullName"
              value={formData?.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              error={formErrors?.fullName}
              disabled={loading}
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            error={formErrors?.email}
            disabled={loading}
          />
        </div>

        {/* Role Selection (Sign Up Only) */}
        {isSignUp && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Account Type
            </label>
            <select
              name="role"
              value={formData?.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              disabled={loading}
            >
              <option value="buyer">Buyer</option>
              <option value="designer">Designer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
        )}

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={formErrors?.password}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              disabled={loading}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
        </div>

        {/* Confirm Password (Sign Up Only) */}
        {isSignUp && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              error={formErrors?.confirmPassword}
              disabled={loading}
            />
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
            </div>
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </Button>
      </form>
      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-4 text-sm text-muted-foreground">or</span>
        <div className="flex-1 border-t border-border"></div>
      </div>
      {/* Social Auth Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => handleSocialAuth('google')}
          disabled={loading}
        >
          <Icon name="Chrome" size={16} className="mr-2" />
          Continue with Google
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => handleSocialAuth('github')}
          disabled={loading}
        >
          <Icon name="Github" size={16} className="mr-2" />
          Continue with GitHub
        </Button>
      </div>
      {/* Toggle Auth Mode */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-primary hover:underline font-medium"
            disabled={loading}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthCard;