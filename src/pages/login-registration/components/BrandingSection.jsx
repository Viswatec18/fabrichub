import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BrandingSection = () => {
  const features = [
    {
      icon: 'Shield',
      title: 'Secure & Verified',
      description: 'All vendors are GST verified and background checked for your safety'
    },
    {
      icon: 'Truck',
      title: 'Fast Delivery',
      description: 'Quick processing and reliable shipping across all major cities'
    },
    {
      icon: 'Award',
      title: 'Quality Assured',
      description: 'Premium fabrics with detailed specifications and quality guarantees'
    },
    {
      icon: 'Users',
      title: 'Expert Support',
      description: 'Dedicated support team and designer consultation services'
    }
  ];

  const stats = [
    { value: '500+', label: 'Verified Vendors' },
    { value: '10K+', label: 'Fabric Varieties' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white rounded-full"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-center p-12 text-white">
        {/* Logo and Brand */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Icon name="Layers" size={28} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">FabricHub</h1>
              <p className="text-white/80 text-sm">B2B Textile Marketplace</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Connect. Trade. Grow.
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            The premier B2B platform connecting fabric vendors, buyers, and designers in one seamless marketplace.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name={feature?.icon} size={20} color="white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature?.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/20">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold mb-1">{stat?.value}</div>
              <div className="text-sm text-white/80">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-3">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              alt="Customer testimonial"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">Rajesh Kumar</div>
              <div className="text-sm text-white/80">Textile Buyer, Mumbai</div>
            </div>
          </div>
          <p className="text-sm text-white/90 italic">
            "FabricHub transformed our sourcing process. We found reliable vendors and reduced our procurement time by 60%."
          </p>
          <div className="flex items-center mt-2">
            {[...Array(5)]?.map((_, i) => (
              <Icon key={i} name="Star" size={14} color="#F59E0B" className="fill-current" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection;