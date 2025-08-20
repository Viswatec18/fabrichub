import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyActionBar = ({ product, selectedVariant, quantity, onAddToCart, onRequestQuote }) => {
  const getCurrentPriceTier = () => {
    return product?.priceTiers?.find(tier => 
      quantity >= tier?.minQuantity && quantity <= tier?.maxQuantity
    ) || product?.priceTiers?.[product?.priceTiers?.length - 1];
  };

  const calculateTotalPrice = () => {
    const tierPrice = getCurrentPriceTier();
    return (quantity * tierPrice?.pricePerMeter)?.toFixed(2);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-elevation-3 p-4 md:hidden">
      <div className="flex items-center justify-between space-x-4">
        {/* Product Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={selectedVariant?.images?.[0]}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground truncate">{product?.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{quantity} meters</span>
              <span className="text-sm font-bold text-foreground">
                ${calculateTotalPrice()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onRequestQuote}
            iconName="MessageSquare"
            className="px-3"
          >
            Quote
          </Button>
          <Button
            size="sm"
            onClick={onAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="px-4"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-center space-x-6 mt-3 pt-3 border-t border-border">
        <button className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="Heart" size={18} />
          <span className="text-xs">Wishlist</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="Share2" size={18} />
          <span className="text-xs">Share</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="MessageCircle" size={18} />
          <span className="text-xs">Contact</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="Calculator" size={18} />
          <span className="text-xs">Calculate</span>
        </button>
      </div>
    </div>
  );
};

export default StickyActionBar;