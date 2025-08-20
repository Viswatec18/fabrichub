import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CartItem from './CartItem';

const VendorGroup = ({ 
  vendor, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onToggleSelect, 
  onToggleSelectAll,
  selectedItems 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const vendorItems = items?.filter(item => item?.vendorId === vendor?.id);
  const selectedVendorItems = vendorItems?.filter(item => selectedItems?.includes(item?.id));
  const allVendorItemsSelected = vendorItems?.length > 0 && selectedVendorItems?.length === vendorItems?.length;
  
  const vendorSubtotal = vendorItems?.reduce((sum, item) => sum + (item?.quantity * item?.pricePerUnit), 0);
  const estimatedShipping = vendorSubtotal > vendor?.freeShippingThreshold ? 0 : vendor?.shippingCost;
  const vendorTotal = vendorSubtotal + estimatedShipping;

  const handleToggleSelectAll = () => {
    const vendorItemIds = vendorItems?.map(item => item?.id);
    onToggleSelectAll(vendorItemIds, !allVendorItemsSelected);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Vendor Header */}
      <div className="p-4 bg-muted border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={allVendorItemsSelected}
              onChange={handleToggleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Store" size={16} color="white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {vendor?.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {vendor?.location} • {vendor?.rating}★ ({vendor?.reviews} reviews)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                ${vendorTotal?.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                {vendorItems?.length} item{vendorItems?.length !== 1 ? 's' : ''}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </Button>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Truck" size={12} />
              <span>
                {estimatedShipping === 0 
                  ? 'Free shipping' 
                  : `Shipping: $${estimatedShipping?.toFixed(2)}`
                }
              </span>
            </span>
            <span className="text-muted-foreground">
              Est. delivery: {vendor?.estimatedDelivery}
            </span>
          </div>
          {vendorSubtotal < vendor?.minimumOrder && (
            <span className="text-warning">
              Minimum order: ${vendor?.minimumOrder?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      {/* Vendor Items */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {vendorItems?.map((item) => (
            <CartItem
              key={item?.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
              onToggleSelect={onToggleSelect}
              isSelected={selectedItems?.includes(item?.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorGroup;