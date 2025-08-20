import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductInfo = ({ product, selectedVariant, onAddToCart, onRequestQuote, onToggleWishlist }) => {
  const [quantity, setQuantity] = useState(product?.moq);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantityError, setQuantityError] = useState('');

  const handleQuantityChange = (value) => {
    const numValue = parseInt(value) || 0;
    if (numValue < product?.moq) {
      setQuantityError(`Minimum order quantity is ${product?.moq} meters`);
    } else {
      setQuantityError('');
    }
    setQuantity(numValue);
  };

  const handleAddToCart = () => {
    if (quantity < product?.moq) {
      setQuantityError(`Minimum order quantity is ${product?.moq} meters`);
      return;
    }
    onAddToCart({ ...product, selectedVariant, quantity });
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onToggleWishlist(product?.id);
  };

  const calculateTotalPrice = () => {
    const tierPrice = product?.priceTiers?.find(tier => 
      quantity >= tier?.minQuantity && quantity <= tier?.maxQuantity
    ) || product?.priceTiers?.[product?.priceTiers?.length - 1];
    
    return (quantity * tierPrice?.pricePerMeter)?.toFixed(2);
  };

  const getCurrentPriceTier = () => {
    return product?.priceTiers?.find(tier => 
      quantity >= tier?.minQuantity && quantity <= tier?.maxQuantity
    ) || product?.priceTiers?.[product?.priceTiers?.length - 1];
  };

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">{product?.name}</h1>
        <p className="text-muted-foreground">{product?.description}</p>
      </div>
      {/* Vendor Information */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Store" size={20} color="white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">{product?.vendor?.name}</span>
              {product?.vendor?.isVerified && (
                <Icon name="BadgeCheck" size={16} className="text-success" />
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span>{product?.vendor?.rating}</span>
              </span>
              <span>{product?.vendor?.location}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Contact Vendor
        </Button>
      </div>
      {/* Material Composition */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Material Composition</h3>
        <div className="grid grid-cols-2 gap-4">
          {product?.composition?.map((material, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium text-foreground">{material?.material}</span>
              <span className="text-sm text-muted-foreground">{material?.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
      {/* Technical Specifications */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">GSM</span>
              <span className="text-sm font-medium text-foreground">{product?.gsm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Width</span>
              <span className="text-sm font-medium text-foreground">{product?.width}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Weave</span>
              <span className="text-sm font-medium text-foreground">{product?.weave}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Care</span>
              <span className="text-sm font-medium text-foreground">{product?.careInstructions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Origin</span>
              <span className="text-sm font-medium text-foreground">{product?.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Stock</span>
              <span className={`text-sm font-medium ${
                product?.stockQuantity > 100 ? 'text-success' : 
                product?.stockQuantity > 50 ? 'text-warning' : 'text-error'
              }`}>
                {product?.stockQuantity} meters
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Structure */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Pricing</h3>
        <div className="space-y-2">
          {product?.priceTiers?.map((tier, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 rounded-lg border ${
                getCurrentPriceTier()?.minQuantity === tier?.minQuantity
                  ? 'border-primary bg-primary/5' :'border-border'
              }`}
            >
              <span className="text-sm text-muted-foreground">
                {tier?.minQuantity} - {tier?.maxQuantity === 999999 ? '∞' : tier?.maxQuantity} meters
              </span>
              <span className="text-sm font-bold text-foreground">
                ${tier?.pricePerMeter}/meter
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Quantity Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Quantity</h3>
          <span className="text-sm text-muted-foreground">MOQ: {product?.moq} meters</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(e?.target?.value)}
              placeholder="Enter quantity"
              error={quantityError}
              min={product?.moq}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(Math.max(product?.moq, quantity - 10))}
            >
              <Icon name="Minus" size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 10)}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {quantity} meters × ${getCurrentPriceTier()?.pricePerMeter}/meter
            </span>
            <span className="text-xl font-bold text-foreground">
              ${calculateTotalPrice()}
            </span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <Button
            onClick={handleAddToCart}
            disabled={quantity < product?.moq || quantityError}
            className="flex-1"
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            onClick={onRequestQuote}
            className="flex-1"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Request Quote
          </Button>
        </div>
        
        <Button
          variant="ghost"
          onClick={handleToggleWishlist}
          className="w-full"
          iconName={isWishlisted ? "Heart" : "Heart"}
          iconPosition="left"
        >
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
      </div>
      {/* Availability Status */}
      <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
        <Icon name="CheckCircle" size={16} className="text-success" />
        <span className="text-sm font-medium text-success">In Stock - Ready to Ship</span>
      </div>
    </div>
  );
};

export default ProductInfo;