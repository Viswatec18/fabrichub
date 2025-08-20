import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import VendorContactCard from './components/VendorContactCard';
import ReviewSection from './components/ReviewSection';
import StickyActionBar from './components/StickyActionBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FabricProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(50);
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const product = {
    id: 'fab-001',
    name: 'Premium Cotton Blend Fabric',
    description: 'High-quality cotton blend fabric perfect for fashion garments, home textiles, and upholstery. Features excellent durability and comfort.',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=800&fit=crop'
    ],
    colorVariants: [
      {
        id: 'var-1',
        name: 'Natural White',
        colorCode: '#F8F9FA',
        images: [
          'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=800&fit=crop',
          'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop'
        ]
      },
      {
        id: 'var-2',
        name: 'Cream Beige',
        colorCode: '#F5F5DC',
        images: [
          'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=800&fit=crop',
          'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=800&fit=crop'
        ]
      },
      {
        id: 'var-3',
        name: 'Light Gray',
        colorCode: '#D3D3D3',
        images: [
          'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop'
        ]
      }
    ],
    vendor: {
      id: 'vendor-001',
      name: 'Premium Textiles Co.',
      rating: 4.8,
      location: 'Mumbai, India',
      isVerified: true
    },
    composition: [
      { material: 'Cotton', percentage: 70 },
      { material: 'Polyester', percentage: 25 },
      { material: 'Elastane', percentage: 5 }
    ],
    gsm: '180 GSM',
    width: '58 inches',
    weave: 'Plain Weave',
    careInstructions: 'Machine wash cold',
    origin: 'India',
    stockQuantity: 2500,
    moq: 50,
    priceTiers: [
      { minQuantity: 50, maxQuantity: 199, pricePerMeter: 15.50 },
      { minQuantity: 200, maxQuantity: 499, pricePerMeter: 14.25 },
      { minQuantity: 500, maxQuantity: 999, pricePerMeter: 13.00 },
      { minQuantity: 1000, maxQuantity: 999999, pricePerMeter: 11.75 }
    ]
  };

  useEffect(() => {
    // Initialize with first color variant
    if (product?.colorVariants?.length > 0) {
      setSelectedVariant(product?.colorVariants?.[0]);
    }
    setQuantity(product?.moq);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleColorVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = (productData) => {
    console.log('Adding to cart:', productData);
    // Add to cart logic here
    navigate('/shopping-cart-checkout');
  };

  const handleRequestQuote = () => {
    console.log('Requesting quote for:', product?.id);
    // Request quote logic here
  };

  const handleToggleWishlist = (productId) => {
    console.log('Toggle wishlist for:', productId);
    // Wishlist logic here
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/fabric-catalog-browse', icon: 'Home', isActive: false },
    { label: 'Catalog', path: '/fabric-catalog-browse', icon: 'Search', isActive: false },
    { label: 'Cotton Blends', path: '/fabric-catalog-browse?category=cotton', icon: 'Package', isActive: false },
    { label: product?.name, path: location?.pathname, icon: 'Package', isActive: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="buyer" />
        <div className="pt-16">
          <div className="container mx-auto px-6 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="buyer" />
      <div className="pt-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb customItems={breadcrumbItems} />

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Image Gallery - 6 columns */}
            <div className="lg:col-span-6">
              <ImageGallery
                product={product}
                onColorVariantChange={handleColorVariantChange}
              />
            </div>

            {/* Product Information - 6 columns */}
            <div className="lg:col-span-6">
              <ProductInfo
                product={product}
                selectedVariant={selectedVariant}
                onAddToCart={handleAddToCart}
                onRequestQuote={handleRequestQuote}
                onToggleWishlist={handleToggleWishlist}
              />
            </div>
          </div>

          {/* Below Fold Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Main Content - 8 columns */}
            <div className="lg:col-span-8 space-y-12">
              {/* Product Tabs */}
              <ProductTabs product={product} />

              {/* Reviews Section */}
              <ReviewSection productId={product?.id} />
            </div>

            {/* Sidebar - 4 columns */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Vendor Contact Card */}
                <VendorContactCard vendor={product?.vendor} />

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      iconName="Share2"
                      iconPosition="left"
                    >
                      Share Product
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Specs
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      iconName="Calculator"
                      iconPosition="left"
                    >
                      Price Calculator
                    </Button>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground">Why Choose Us</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Shield" size={16} className="text-success" />
                      <span className="text-sm text-foreground">Quality Guaranteed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Truck" size={16} className="text-success" />
                      <span className="text-sm text-foreground">Fast Shipping</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="RotateCcw" size={16} className="text-success" />
                      <span className="text-sm text-foreground">Easy Returns</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Headphones" size={16} className="text-success" />
                      <span className="text-sm text-foreground">24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky Action Bar for Mobile */}
      <StickyActionBar
        product={product}
        selectedVariant={selectedVariant}
        quantity={quantity}
        onAddToCart={handleAddToCart}
        onRequestQuote={handleRequestQuote}
      />
      {/* Add bottom padding for mobile sticky bar */}
      <div className="h-32 md:h-0"></div>
    </div>
  );
};

export default FabricProductDetail;