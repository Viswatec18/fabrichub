import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect, isSelected }) => {
  const [quantity, setQuantity] = useState(item?.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= item?.moq && newQuantity <= item?.maxQuantity) {
      setQuantity(newQuantity);
      onUpdateQuantity(item?.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + item?.moq;
    if (newQuantity <= item?.maxQuantity) {
      handleQuantityChange(newQuantity);
    }
  };

  const decrementQuantity = () => {
    const newQuantity = quantity - item?.moq;
    if (newQuantity >= item?.moq) {
      handleQuantityChange(newQuantity);
    }
  };

  const subtotal = quantity * item?.pricePerUnit;

  return (
    <div className="flex items-start space-x-4 p-4 bg-card border border-border rounded-lg">
      {/* Selection Checkbox */}
      <div className="flex items-center pt-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(item?.id)}
          className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
        />
      </div>
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground truncate">
              {item?.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {item?.material} • {item?.gsm} GSM • {item?.color}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-muted-foreground">
                MOQ: {item?.moq} {item?.unit}
              </span>
              <span className="text-sm font-medium text-foreground">
                ${item?.pricePerUnit?.toFixed(2)}/{item?.unit}
              </span>
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item?.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>

        {/* Quantity Controls and Subtotal */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Quantity:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= item?.moq}
                className="w-8 h-8"
              >
                <Icon name="Minus" size={14} />
              </Button>
              <span className="text-sm font-medium text-foreground min-w-[3rem] text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= item?.maxQuantity}
                className="w-8 h-8"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              {item?.unit}
            </span>
          </div>

          <div className="text-right">
            <div className="text-lg font-semibold text-foreground">
              ${subtotal?.toFixed(2)}
            </div>
            {quantity < item?.moq && (
              <div className="text-xs text-warning">
                Min order: {item?.moq} {item?.unit}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;