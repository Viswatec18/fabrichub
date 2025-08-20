import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderSummary = ({ 
  items, 
  selectedItems, 
  onProceedToCheckout, 
  isCheckoutDisabled 
}) => {
  const selectedCartItems = items?.filter(item => selectedItems?.includes(item?.id));
  
  const subtotal = selectedCartItems?.reduce((sum, item) => sum + (item?.quantity * item?.pricePerUnit), 0);
  
  // Group by vendor to calculate shipping
  const vendorGroups = selectedCartItems?.reduce((groups, item) => {
    if (!groups?.[item?.vendorId]) {
      groups[item.vendorId] = {
        items: [],
        vendor: item?.vendor
      };
    }
    groups?.[item?.vendorId]?.items?.push(item);
    return groups;
  }, {});

  const totalShipping = Object.values(vendorGroups)?.reduce((sum, group) => {
    const vendorSubtotal = group?.items?.reduce((itemSum, item) => itemSum + (item?.quantity * item?.pricePerUnit), 0);
    const shipping = vendorSubtotal > group?.vendor?.freeShippingThreshold ? 0 : group?.vendor?.shippingCost;
    return sum + shipping;
  }, 0);

  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + totalShipping + tax;

  const savings = items?.reduce((sum, item) => {
    if (selectedItems?.includes(item?.id) && item?.originalPrice > item?.pricePerUnit) {
      return sum + ((item?.originalPrice - item?.pricePerUnit) * item?.quantity);
    }
    return sum;
  }, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Order Summary
      </h2>
      {/* Selected Items Count */}
      <div className="flex items-center justify-between py-2 border-b border-border">
        <span className="text-sm text-muted-foreground">
          Items ({selectedCartItems?.length})
        </span>
        <span className="text-sm font-medium text-foreground">
          ${subtotal?.toFixed(2)}
        </span>
      </div>
      {/* Shipping */}
      <div className="flex items-center justify-between py-2 border-b border-border">
        <span className="text-sm text-muted-foreground">
          Shipping
        </span>
        <span className="text-sm font-medium text-foreground">
          {totalShipping === 0 ? 'Free' : `$${totalShipping?.toFixed(2)}`}
        </span>
      </div>
      {/* Tax */}
      <div className="flex items-center justify-between py-2 border-b border-border">
        <span className="text-sm text-muted-foreground">
          Tax (8%)
        </span>
        <span className="text-sm font-medium text-foreground">
          ${tax?.toFixed(2)}
        </span>
      </div>
      {/* Savings */}
      {savings > 0 && (
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-success">
            You save
          </span>
          <span className="text-sm font-medium text-success">
            -${savings?.toFixed(2)}
          </span>
        </div>
      )}
      {/* Total */}
      <div className="flex items-center justify-between py-3 mt-2">
        <span className="text-base font-semibold text-foreground">
          Total
        </span>
        <span className="text-lg font-bold text-foreground">
          ${total?.toFixed(2)}
        </span>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        fullWidth
        onClick={onProceedToCheckout}
        disabled={isCheckoutDisabled || selectedCartItems?.length === 0}
        className="mt-4"
        iconName="CreditCard"
        iconPosition="left"
      >
        Proceed to Checkout
      </Button>
      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 mt-4 p-3 bg-muted rounded-lg">
        <Icon name="Shield" size={16} className="text-success" />
        <span className="text-xs text-muted-foreground">
          Secure SSL encrypted checkout
        </span>
      </div>
      {/* Vendor Breakdown */}
      {Object.keys(vendorGroups)?.length > 1 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Vendor Breakdown
          </h3>
          <div className="space-y-2">
            {Object.values(vendorGroups)?.map((group) => {
              const vendorSubtotal = group?.items?.reduce((sum, item) => sum + (item?.quantity * item?.pricePerUnit), 0);
              const vendorShipping = vendorSubtotal > group?.vendor?.freeShippingThreshold ? 0 : group?.vendor?.shippingCost;
              const vendorTotal = vendorSubtotal + vendorShipping;
              
              return (
                <div key={group?.vendor?.id} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate">
                    {group?.vendor?.name}
                  </span>
                  <span className="text-foreground font-medium">
                    ${vendorTotal?.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;