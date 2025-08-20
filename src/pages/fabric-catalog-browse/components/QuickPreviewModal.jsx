import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickPreviewModal = ({ fabric, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(fabric?.moq || 50);
  const navigate = useNavigate();

  if (!isOpen || !fabric) return null;

  const handleViewFullDetails = () => {
    navigate('/fabric-product-detail', { state: { fabricId: fabric?.id } });
    onClose();
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Added to cart:', fabric?.id, selectedQuantity);
    onClose();
  };

  const handleQuickInquiry = () => {
    // Quick inquiry logic
    console.log('Quick inquiry for:', fabric?.id);
    onClose();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === fabric?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? fabric?.images?.length - 1 : prev - 1
    );
  };

  const totalPrice = (selectedQuantity * fabric?.price)?.toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-card rounded-lg shadow-elevation-3 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Quick Preview</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Image Section */}
          <div className="lg:w-1/2 relative bg-muted">
            <div className="aspect-square relative">
              <Image
                src={fabric?.images?.[currentImageIndex]}
                alt={fabric?.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {fabric?.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {fabric?.images?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {fabric?.isNew && (
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                )}
                {fabric?.isFeatured && (
                  <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {fabric?.images?.length > 1 && (
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2 overflow-x-auto">
                  {fabric?.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${fabric?.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-6 overflow-y-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {fabric?.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-muted-foreground">by</span>
                <span className="font-medium text-foreground">{fabric?.vendor?.name}</span>
                {fabric?.vendor?.verified && (
                  <Icon name="BadgeCheck" size={16} className="text-success" />
                )}
                <div className="flex items-center space-x-1 ml-4">
                  <div className="flex">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(fabric?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({fabric?.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm text-muted-foreground">Material</span>
                <p className="font-medium text-foreground">{fabric?.material}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">GSM</span>
                <p className="font-medium text-foreground">{fabric?.gsm}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Composition</span>
                <p className="font-medium text-foreground">{fabric?.composition}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Width</span>
                <p className="font-medium text-foreground">{fabric?.width}"</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Weight</span>
                <p className="font-medium text-foreground">{fabric?.weight}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Care</span>
                <p className="font-medium text-foreground">{fabric?.care}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {fabric?.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-2xl font-bold text-foreground">
                  ${fabric?.price}
                </span>
                <span className="text-muted-foreground">per yard</span>
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                Minimum Order Quantity: {fabric?.moq} yards
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-foreground">
                  Quantity (yards):
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(fabric?.moq, selectedQuantity - 10))}
                    className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-muted"
                  >
                    <Icon name="Minus" size={14} />
                  </button>
                  <input
                    type="number"
                    min={fabric?.moq}
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(Math.max(fabric?.moq, parseInt(e?.target?.value) || fabric?.moq))}
                    className="w-20 text-center border border-border rounded-md px-2 py-1 bg-background text-foreground"
                  />
                  <button
                    onClick={() => setSelectedQuantity(selectedQuantity + 10)}
                    className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-muted"
                  >
                    <Icon name="Plus" size={14} />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 text-lg font-semibold text-foreground">
                Total: ${totalPrice}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleQuickInquiry}
                  className="flex-1"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Quick Inquiry
                </Button>
                <Button
                  variant="default"
                  onClick={handleAddToCart}
                  className="flex-1"
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Add to Cart
                </Button>
              </div>
              
              <Button
                variant="ghost"
                onClick={handleViewFullDetails}
                className="w-full"
                iconName="ExternalLink"
                iconPosition="right"
              >
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPreviewModal;