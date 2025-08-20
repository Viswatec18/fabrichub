import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VendorGroup from './components/VendorGroup';
import OrderSummary from './components/OrderSummary';
import BulkActions from './components/BulkActions';
import EmptyCart from './components/EmptyCart';
import CheckoutFlow from './components/CheckoutFlow';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('cart'); // 'cart', 'checkout', 'success'
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [vendors, setVendors] = useState([]);

  // Mock data initialization
  useEffect(() => {
    const mockVendors = [
      {
        id: 'vendor-1',
        name: 'TextileCorp Industries',
        location: 'Mumbai, India',
        rating: 4.8,
        reviews: 1247,
        estimatedDelivery: '3-5 business days',
        freeShippingThreshold: 500,
        shippingCost: 25.00,
        minimumOrder: 100.00
      },
      {
        id: 'vendor-2',
        name: 'Premium Fabrics Ltd',
        location: 'Delhi, India',
        rating: 4.9,
        reviews: 892,
        estimatedDelivery: '2-4 business days',
        freeShippingThreshold: 750,
        shippingCost: 35.00,
        minimumOrder: 150.00
      },
      {
        id: 'vendor-3',
        name: 'EcoTextile Solutions',
        location: 'Bangalore, India',
        rating: 4.7,
        reviews: 634,
        estimatedDelivery: '4-6 business days',
        freeShippingThreshold: 400,
        shippingCost: 20.00,
        minimumOrder: 75.00
      }
    ];

    const mockCartItems = [
      {
        id: 'item-1',
        vendorId: 'vendor-1',
        name: 'Premium Cotton Blend Fabric',
        material: 'Cotton Blend',
        gsm: 180,
        color: 'Navy Blue',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop',
        pricePerUnit: 12.50,
        originalPrice: 15.00,
        quantity: 50,
        moq: 25,
        maxQuantity: 500,
        unit: 'meters',
        vendor: mockVendors?.[0]
      },
      {
        id: 'item-2',
        vendorId: 'vendor-1',
        name: 'Organic Linen Weave',
        material: 'Linen',
        gsm: 220,
        color: 'Natural White',
        image: 'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?w=400&h=300&fit=crop',
        pricePerUnit: 18.75,
        quantity: 100,
        moq: 50,
        maxQuantity: 1000,
        unit: 'meters',
        vendor: mockVendors?.[0]
      },
      {
        id: 'item-3',
        vendorId: 'vendor-2',
        name: 'Silk Satin Finish',
        material: 'Silk',
        gsm: 120,
        color: 'Champagne Gold',
        image: 'https://images.pixabay.com/photo/2017/08/30/12/45/fabric-2696005_1280.jpg?w=400&h=300&fit=crop',
        pricePerUnit: 45.00,
        quantity: 25,
        moq: 10,
        maxQuantity: 200,
        unit: 'meters',
        vendor: mockVendors?.[1]
      },
      {
        id: 'item-4',
        vendorId: 'vendor-2',
        name: 'Wool Blend Suiting',
        material: 'Wool Blend',
        gsm: 280,
        color: 'Charcoal Gray',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
        pricePerUnit: 32.25,
        originalPrice: 38.00,
        quantity: 75,
        moq: 25,
        maxQuantity: 300,
        unit: 'meters',
        vendor: mockVendors?.[1]
      },
      {
        id: 'item-5',
        vendorId: 'vendor-3',
        name: 'Bamboo Fiber Blend',
        material: 'Bamboo Fiber',
        gsm: 160,
        color: 'Sage Green',
        image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?w=400&h=300&fit=crop',
        pricePerUnit: 22.50,
        quantity: 40,
        moq: 20,
        maxQuantity: 400,
        unit: 'meters',
        vendor: mockVendors?.[2]
      }
    ];

    setVendors(mockVendors);
    setCartItems(mockCartItems);
    setSelectedItems(mockCartItems?.map(item => item?.id));
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => prev?.map(item => 
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev?.filter(item => item?.id !== itemId));
    setSelectedItems(prev => prev?.filter(id => id !== itemId));
  };

  const handleToggleSelect = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleToggleSelectAll = (vendorItemIds, shouldSelect) => {
    setSelectedItems(prev => {
      if (shouldSelect) {
        return [...new Set([...prev, ...vendorItemIds])];
      } else {
        return prev?.filter(id => !vendorItemIds?.includes(id));
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedItems(cartItems?.map(item => item?.id));
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleRemoveSelected = () => {
    setCartItems(prev => prev?.filter(item => !selectedItems?.includes(item?.id)));
    setSelectedItems([]);
  };

  const handleSaveForLater = () => {
    // Mock save for later functionality
    console.log('Saving selected items for later:', selectedItems);
    handleRemoveSelected();
  };

  const handleProceedToCheckout = () => {
    const selectedCartItems = cartItems?.filter(item => selectedItems?.includes(item?.id));
    if (selectedCartItems?.length > 0) {
      setCurrentView('checkout');
    }
  };

  const handleBackToCart = () => {
    setCurrentView('cart');
  };

  const handleOrderComplete = (orderData) => {
    console.log('Order completed:', orderData);
    setCurrentView('success');
    
    // Clear cart after successful order
    setTimeout(() => {
      setCartItems([]);
      setSelectedItems([]);
      navigate('/order-management-dashboard');
    }, 3000);
  };

  const selectedCartItems = cartItems?.filter(item => selectedItems?.includes(item?.id));
  const isCheckoutDisabled = selectedItems?.length === 0;

  // Group vendors that have items in cart
  const vendorsWithItems = vendors?.filter(vendor => 
    cartItems?.some(item => item?.vendorId === vendor?.id)
  );

  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="buyer" />
        <main className="pt-16">
          <div className="container mx-auto px-6 py-8">
            <CheckoutFlow
              items={selectedCartItems}
              onBack={handleBackToCart}
              onComplete={handleOrderComplete}
            />
          </div>
        </main>
      </div>
    );
  }

  if (currentView === 'success') {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="buyer" />
        <main className="pt-16">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} color="white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your order. You will receive a confirmation email shortly.
                Redirecting to your orders...
              </p>
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="buyer" />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          <Breadcrumb />
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-muted-foreground mt-2">
                {cartItems?.length} item{cartItems?.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            
            {cartItems?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => navigate('/fabric-catalog-browse')}
                iconName="Plus"
                iconPosition="left"
              >
                Continue Shopping
              </Button>
            )}
          </div>

          {cartItems?.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                {/* Bulk Actions */}
                <BulkActions
                  totalItems={cartItems?.length}
                  selectedItems={selectedItems}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onRemoveSelected={handleRemoveSelected}
                  onSaveForLater={handleSaveForLater}
                />

                {/* Vendor Groups */}
                <div className="space-y-6 mt-6">
                  {vendorsWithItems?.map((vendor) => (
                    <VendorGroup
                      key={vendor?.id}
                      vendor={vendor}
                      items={cartItems}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      onToggleSelect={handleToggleSelect}
                      onToggleSelectAll={handleToggleSelectAll}
                      selectedItems={selectedItems}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <OrderSummary
                  items={cartItems}
                  selectedItems={selectedItems}
                  onProceedToCheckout={handleProceedToCheckout}
                  isCheckoutDisabled={isCheckoutDisabled}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShoppingCartCheckout;