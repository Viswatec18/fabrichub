import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';
import Icon from '../AppIcon';

const Header = ({ userRole, currentUser, onNavigate }) => {
  const { user, userProfile, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      onNavigate?.('/login-registration');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleAuthAction = () => {
    onNavigate?.('/login-registration');
  };

  const currentUserData = user ? {
    name: userProfile?.full_name || user?.email?.split('@')?.[0] || 'User',
    email: user?.email,
    role: userProfile?.role || 'buyer'
  } : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-macos border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Palette" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">FabricHub</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate?.('/fabric-catalog-browse')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Browse Fabrics
            </button>
            <button 
              onClick={() => onNavigate?.('/designer-directory-profiles')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Designers
            </button>
            <button 
              onClick={() => onNavigate?.('/vendor-dashboard-inventory')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Vendors
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {currentUserData ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate?.('/shopping-cart-checkout')}
                >
                  <Icon name="ShoppingCart" size={18} />
                </Button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {currentUserData?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-foreground">
                        {currentUserData?.name}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {currentUserData?.role}
                      </div>
                    </div>
                    <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onNavigate?.('/order-management-dashboard');
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
                      >
                        <Icon name="Package" size={16} className="inline mr-2" />
                        Orders
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to profile
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
                      >
                        <Icon name="User" size={16} className="inline mr-2" />
                        Profile
                      </button>
                      <hr className="my-2 border-border" />
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors text-error"
                      >
                        <Icon name="LogOut" size={16} className="inline mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthAction}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAuthAction}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 bg-black/20 md:hidden" 
          onClick={() => setShowUserMenu(false)} 
        />
      )}
    </header>
  );
};

export default Header;