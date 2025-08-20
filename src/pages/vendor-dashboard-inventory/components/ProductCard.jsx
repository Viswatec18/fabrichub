import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onEdit, onDuplicate, onArchive, onUpdateStock }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [stockValue, setStockValue] = useState(product?.stock);

  const getStockStatus = () => {
    if (product?.stock === 0) return { status: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    if (product?.stock <= product?.lowStockThreshold) return { status: 'Low Stock', color: 'text-amber-600 bg-amber-50' };
    return { status: 'In Stock', color: 'text-green-600 bg-green-50' };
  };

  const stockStatus = getStockStatus();

  const handleStockUpdate = () => {
    onUpdateStock(product?.id, stockValue);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <Image 
            src={product?.image} 
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${stockStatus?.color}`}>
          {stockStatus?.status}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{product?.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product?.material} • {product?.gsm} GSM</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold text-foreground">${product?.price}</p>
            <p className="text-xs text-muted-foreground">per {product?.unit}</p>
          </div>
          <div className="text-right">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={stockValue}
                  onChange={(e) => setStockValue(parseInt(e?.target?.value) || 0)}
                  className="w-16 px-2 py-1 text-sm border border-border rounded"
                  min="0"
                />
                <Button size="xs" onClick={handleStockUpdate}>
                  <Icon name="Check" size={12} />
                </Button>
                <Button variant="ghost" size="xs" onClick={() => setIsEditing(false)}>
                  <Icon name="X" size={12} />
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-foreground">{product?.stock} {product?.unit}s</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-primary hover:underline"
                >
                  Update Stock
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>MOQ: {product?.moq} {product?.unit}s</span>
          <span>SKU: {product?.sku}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="flex-1">
            <Icon name="Edit" size={14} />
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDuplicate(product)}>
            <Icon name="Copy" size={14} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onArchive(product)}>
            <Icon name="Archive" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;