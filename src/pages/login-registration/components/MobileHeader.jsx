import React from 'react';
import Icon from '../../../components/AppIcon';

const MobileHeader = () => {
  return (
    <div className="lg:hidden bg-primary text-white p-6 text-center">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <Icon name="Layers" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">FabricHub</h1>
          <p className="text-white/80 text-sm">B2B Textile Marketplace</p>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">Welcome to FabricHub</h2>
      <p className="text-white/90 text-sm">
        Connect with verified vendors and discover premium fabrics for your business
      </p>
    </div>
  );
};

export default MobileHeader;