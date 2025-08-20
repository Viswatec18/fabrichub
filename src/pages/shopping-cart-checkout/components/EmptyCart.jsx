import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  const suggestedProducts = [
    {
      id: 1,
      name: "Premium Cotton Blend",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=200&fit=crop",
      price: 12.50,
      originalPrice: 15.00,
      rating: 4.8,
      vendor: "TextileCorp"
    },
    {
      id: 2,
      name: "Silk Satin Finish",
      image: "https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?w=300&h=200&fit=crop",
      price: 28.75,
      rating: 4.9,
      vendor: "LuxeFabrics"
    },
    {
      id: 3,
      name: "Organic Linen Weave",
      image: "https://images.pixabay.com/photo/2017/08/30/12/45/fabric-2696005_1280.jpg?w=300&h=200&fit=crop",
      price: 18.90,
      rating: 4.7,
      vendor: "EcoTextiles"
    }
  ];

  const recentlyViewed = [
    {
      id: 4,
      name: "Denim Stretch Fabric",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
      price: 16.25,
      vendor: "DenimWorks"
    },
    {
      id: 5,
      name: "Wool Blend Suiting",
      image: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?w=300&h=200&fit=crop",
      price: 45.00,
      vendor: "SuitingPro"
    }
  ];

  return (
    <div className="text-center py-12">
      {/* Empty State Icon */}
      <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Looks like you haven't added any fabrics to your cart yet. 
        Explore our catalog to find the perfect materials for your project.
      </p>
      <Button
        variant="default"
        onClick={() => navigate('/fabric-catalog-browse')}
        iconName="Search"
        iconPosition="left"
        className="mb-12"
      >
        Browse Fabric Catalog
      </Button>
      {/* Suggested Products */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Suggested for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedProducts?.map((product) => (
            <div key={product?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth">
              <div className="aspect-video bg-muted overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-foreground mb-1 truncate">
                  {product?.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  by {product?.vendor}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-foreground">
                      ${product?.price}
                    </span>
                    {product?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product?.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">
                      {product?.rating}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => navigate('/fabric-product-detail')}
                  className="mt-3"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recently Viewed */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Recently Viewed
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {recentlyViewed?.map((product) => (
            <div key={product?.id} className="flex items-center space-x-4 bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
              <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {product?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  by {product?.vendor}
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  ${product?.price}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/fabric-product-detail')}
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;