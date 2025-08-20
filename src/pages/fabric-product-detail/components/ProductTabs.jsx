import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('specifications');

  const tabs = [
    { id: 'specifications', label: 'Detailed Specifications', icon: 'FileText' },
    { id: 'vendor', label: 'Vendor Information', icon: 'Store' },
    { id: 'shipping', label: 'Shipping Details', icon: 'Truck' },
    { id: 'related', label: 'Related Products', icon: 'Grid3X3' }
  ];

  const relatedProducts = [
    {
      id: 'rel-1',
      name: 'Premium Cotton Blend',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
      price: '$12.50',
      vendor: 'TextileCraft Co.'
    },
    {
      id: 'rel-2',
      name: 'Organic Linen Fabric',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop',
      price: '$18.75',
      vendor: 'EcoFabrics Ltd.'
    },
    {
      id: 'rel-3',
      name: 'Silk Cotton Mix',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      price: '$22.00',
      vendor: 'LuxuryTextiles Inc.'
    },
    {
      id: 'rel-4',
      name: 'Bamboo Fiber Blend',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=300&fit=crop',
      price: '$15.25',
      vendor: 'GreenFiber Co.'
    }
  ];

  const renderSpecifications = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Physical Properties</h4>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Weight (GSM)</span>
              <span className="font-medium text-foreground">{product?.gsm}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Width</span>
              <span className="font-medium text-foreground">{product?.width}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Weave Type</span>
              <span className="font-medium text-foreground">{product?.weave}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Thread Count</span>
              <span className="font-medium text-foreground">120 TPI</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Shrinkage</span>
              <span className="font-medium text-foreground">&lt; 3%</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Care &amp; Maintenance</h4>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Washing</span>
              <span className="font-medium text-foreground">Machine wash cold</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Drying</span>
              <span className="font-medium text-foreground">Tumble dry low</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Ironing</span>
              <span className="font-medium text-foreground">Medium heat</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Dry Cleaning</span>
              <span className="font-medium text-foreground">Safe</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Bleaching</span>
              <span className="font-medium text-foreground">Non-chlorine only</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Certifications &amp; Standards</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
            <Icon name="Award" size={16} className="text-success" />
            <span className="text-sm font-medium">OEKO-TEX</span>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
            <Icon name="Leaf" size={16} className="text-success" />
            <span className="text-sm font-medium">Organic</span>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
            <Icon name="Recycle" size={16} className="text-success" />
            <span className="text-sm font-medium">Sustainable</span>
          </div>
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm font-medium">ISO 9001</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVendorInfo = () => (
    <div className="space-y-6">
      <div className="flex items-start space-x-4 p-6 bg-muted rounded-lg">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Store" size={24} color="white" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-foreground">{product?.vendor?.name}</h3>
            {product?.vendor?.isVerified && (
              <Icon name="BadgeCheck" size={20} className="text-success" />
            )}
          </div>
          <p className="text-muted-foreground">
            Established textile manufacturer with over 15 years of experience in premium fabric production. 
            Specializing in sustainable and eco-friendly textile solutions for fashion and home decor industries.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4.8</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">1200+</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{product?.vendor?.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">contact@premiumtextiles.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">www.premiumtextiles.com</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Business Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Business Type</span>
              <span className="font-medium text-foreground">Manufacturer</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">GST Number</span>
              <span className="font-medium text-foreground">27AABCU9603R1ZX</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Established</span>
              <span className="font-medium text-foreground">2008</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Employees</span>
              <span className="font-medium text-foreground">50-100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShippingDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Shipping Options</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Truck" size={20} className="text-primary" />
                <div>
                  <div className="font-medium text-foreground">Standard Shipping</div>
                  <div className="text-sm text-muted-foreground">5-7 business days</div>
                </div>
              </div>
              <span className="font-bold text-foreground">$15.00</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Zap" size={20} className="text-warning" />
                <div>
                  <div className="font-medium text-foreground">Express Shipping</div>
                  <div className="text-sm text-muted-foreground">2-3 business days</div>
                </div>
              </div>
              <span className="font-bold text-foreground">$35.00</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} className="text-success" />
                <div>
                  <div className="font-medium text-foreground">Next Day Delivery</div>
                  <div className="text-sm text-muted-foreground">1 business day</div>
                </div>
              </div>
              <span className="font-bold text-foreground">$65.00</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Shipping Policies</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="Package" size={16} className="text-muted-foreground mt-1" />
              <div>
                <div className="font-medium text-foreground">Free Shipping</div>
                <div className="text-sm text-muted-foreground">On orders over $500</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={16} className="text-muted-foreground mt-1" />
              <div>
                <div className="font-medium text-foreground">Insured Shipping</div>
                <div className="text-sm text-muted-foreground">All orders are fully insured</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="RotateCcw" size={16} className="text-muted-foreground mt-1" />
              <div>
                <div className="font-medium text-foreground">Easy Returns</div>
                <div className="text-sm text-muted-foreground">30-day return policy</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground mt-1" />
              <div>
                <div className="font-medium text-foreground">Tracking Included</div>
                <div className="text-sm text-muted-foreground">Real-time order tracking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-semibold text-foreground mb-3">International Shipping</h4>
        <p className="text-sm text-muted-foreground mb-3">
          We ship worldwide with customs documentation included. International shipping rates calculated at checkout.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-foreground">North America</div>
            <div className="text-muted-foreground">7-10 days</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Europe</div>
            <div className="text-muted-foreground">10-14 days</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Asia Pacific</div>
            <div className="text-muted-foreground">12-16 days</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Other Regions</div>
            <div className="text-muted-foreground">14-21 days</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRelatedProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">You Might Also Like</h4>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts?.map((relatedProduct) => (
          <div key={relatedProduct?.id} className="group cursor-pointer">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
              <img
                src={relatedProduct?.image}
                alt={relatedProduct?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-1">
              <h5 className="font-medium text-foreground group-hover:text-primary transition-colors">
                {relatedProduct?.name}
              </h5>
              <p className="text-sm text-muted-foreground">{relatedProduct?.vendor}</p>
              <p className="font-bold text-foreground">{relatedProduct?.price}/meter</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline">
          Load More Products
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'specifications':
        return renderSpecifications();
      case 'vendor':
        return renderVendorInfo();
      case 'shipping':
        return renderShippingDetails();
      case 'related':
        return renderRelatedProducts();
      default:
        return renderSpecifications();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="py-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;