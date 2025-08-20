import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageGallery = ({ product, onColorVariantChange }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedColorVariant, setSelectedColorVariant] = useState(product?.colorVariants?.[0]);

  const handleColorVariantChange = (variant) => {
    setSelectedColorVariant(variant);
    setSelectedImageIndex(0);
    onColorVariantChange(variant);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? selectedColorVariant?.images?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === selectedColorVariant?.images?.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
        <Image
          src={selectedColorVariant?.images?.[selectedImageIndex]}
          alt={`${product?.name} - ${selectedColorVariant?.name}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        
        {/* Navigation Arrows */}
        {selectedColorVariant?.images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Zoom Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-2 right-2 bg-background/80 hover:bg-background w-10 h-10"
        >
          <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={18} />
        </Button>

        {/* Image Counter */}
        {selectedColorVariant?.images?.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
            {selectedImageIndex + 1} / {selectedColorVariant?.images?.length}
          </div>
        )}
      </div>
      {/* Thumbnail Carousel */}
      {selectedColorVariant?.images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {selectedColorVariant?.images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedImageIndex
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image}
                alt={`${product?.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Color Variants */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Available Colors</h4>
        <div className="flex flex-wrap gap-2">
          {product?.colorVariants?.map((variant) => (
            <button
              key={variant?.id}
              onClick={() => handleColorVariantChange(variant)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                selectedColorVariant?.id === variant?.id
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-muted-foreground'
              }`}
            >
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: variant?.colorCode }}
              />
              <span className="text-sm font-medium">{variant?.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;