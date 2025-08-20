import React from 'react';
import { Star, Eye, ShoppingCart, Verified } from 'lucide-react';
import AppImage from '../../../components/AppImage';

const FabricCard = ({ fabric, viewMode, onQuickPreview }) => {
  if (!fabric) return null;

  const primaryImage = fabric?.fabric_images?.[0]?.image_url || '/assets/images/no_image.png';
  const vendor = fabric?.vendor || {};
  const isVerified = vendor?.verified || false;

  const handleQuickPreview = () => {
    onQuickPreview?.(fabric);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(price || 0);
  };

  if (viewMode === 'list') {
    return (
      <div className="card-macos p-6 hover-lift">
        <div className="flex gap-6">
          {/* Image */}
          <div className="w-28 h-28 flex-shrink-0">
            <AppImage
              src={primaryImage}
              alt={fabric?.name || 'Fabric'}
              className="w-full h-full object-cover rounded-macos"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-xl text-foreground mb-1 truncate">
                  {fabric?.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base text-muted-foreground">{vendor?.name}</span>
                  {isVerified && (
                    <div className="flex items-center justify-center w-5 h-5 bg-macos-blue rounded-full">
                      <Verified className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {fabric?.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 ml-6">
                <button
                  onClick={handleQuickPreview}
                  className="btn-macos p-3 hover-press focus-ring-macos"
                  title="Quick preview"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button className="btn-macos-primary p-3 hover-press focus-ring-macos">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-macos-gray-2">
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-display font-semibold text-2xl text-foreground">
                    {formatPrice(fabric?.price_per_yard)}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">/yard</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>MOQ: {fabric?.minimum_order_quantity} yards</span>
                  <span className="px-3 py-1 bg-macos-gray-1 rounded-lg font-medium text-foreground">
                    {fabric?.material}
                  </span>
                </div>
              </div>
              
              {fabric?.rating > 0 && (
                <div className="flex items-center gap-1 bg-macos-gray-1 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-current text-macos-yellow" />
                  <span className="text-sm font-medium text-foreground">
                    {fabric?.rating?.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({fabric?.review_count || 0})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-macos overflow-hidden hover-lift group animate-scale-in-macos">
      {/* Image */}
      <div className="relative aspect-square">
        <AppImage
          src={primaryImage}
          alt={fabric?.name || 'Fabric'}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay on hover with macOS-style blur effect */}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-3">
          <button
            onClick={handleQuickPreview}
            className="bg-white bg-opacity-90 backdrop-blur text-foreground p-3 rounded-macos hover:bg-opacity-100 transition-smooth hover-press focus-ring-macos"
            title="Quick preview"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button className="bg-macos-blue bg-opacity-90 backdrop-blur text-white p-3 rounded-macos hover:bg-opacity-100 transition-smooth hover-press focus-ring-macos">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        {/* Badges with macOS styling */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {fabric?.is_featured && (
            <span className="bg-macos-red text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur">
              Featured
            </span>
          )}
          {fabric?.status === 'active' && fabric?.stock_quantity > 0 && (
            <span className="bg-macos-green text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur">
              In Stock
            </span>
          )}
        </div>
        
        {/* Rating badge */}
        {fabric?.rating > 0 && (
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur rounded-macos px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-macos-yellow" />
            <span className="text-sm font-medium text-foreground">
              {fabric?.rating?.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      
      {/* Content with macOS typography */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-1 leading-tight">
          {fabric?.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-muted-foreground">{vendor?.name}</span>
          {isVerified && (
            <div className="flex items-center justify-center w-4 h-4 bg-macos-blue rounded-full">
              <Verified className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="px-3 py-1 bg-macos-gray-1 rounded-lg font-medium text-foreground">
            {fabric?.material}
          </span>
          <span className="text-muted-foreground">{fabric?.gsm} GSM</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-macos-gray-2">
          <div>
            <div className="font-display font-semibold text-xl text-foreground">
              {formatPrice(fabric?.price_per_yard)}
            </div>
            <div className="text-sm text-muted-foreground">per yard</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">MOQ</div>
            <div className="text-sm font-medium text-foreground">
              {fabric?.minimum_order_quantity} yards
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricCard;