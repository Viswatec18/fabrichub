import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VendorContactCard = ({ vendor }) => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitInquiry = (e) => {
    e?.preventDefault();
    console.log('Inquiry submitted:', formData);
    // Handle form submission
    setIsContactFormOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Vendor Header */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Store" size={24} color="white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-foreground">{vendor?.name}</h3>
            {vendor?.isVerified && (
              <Icon name="BadgeCheck" size={18} className="text-success" />
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span>{vendor?.rating}</span>
              <span>(1,234 reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{vendor?.location}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-bold text-foreground">15+</div>
          <div className="text-xs text-muted-foreground">Years</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-bold text-foreground">500+</div>
          <div className="text-xs text-muted-foreground">Products</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-bold text-foreground">98%</div>
          <div className="text-xs text-muted-foreground">On-time</div>
        </div>
      </div>
      {/* Contact Options */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Contact Vendor</h4>
        
        <div className="grid grid-cols-1 gap-3">
          <Button
            variant="default"
            onClick={() => setIsContactFormOpen(!isContactFormOpen)}
            iconName="MessageSquare"
            iconPosition="left"
            className="w-full"
          >
            Send Inquiry
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              iconName="Phone"
              iconPosition="left"
              size="sm"
            >
              Call Now
            </Button>
            <Button
              variant="outline"
              iconName="Mail"
              iconPosition="left"
              size="sm"
            >
              Email
            </Button>
          </div>
        </div>
      </div>
      {/* Contact Form */}
      {isContactFormOpen && (
        <div className="border-t border-border pt-6">
          <form onSubmit={handleSubmitInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                placeholder="Enter your name"
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                placeholder="Enter your phone"
              />
              <Input
                label="Subject"
                type="text"
                value={formData?.subject}
                onChange={(e) => handleInputChange('subject', e?.target?.value)}
                placeholder="Inquiry subject"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                value={formData?.message}
                onChange={(e) => handleInputChange('message', e?.target?.value)}
                placeholder="Enter your message or inquiry details..."
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <Button type="submit" className="flex-1">
                Send Inquiry
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsContactFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Business Hours */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Business Hours</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monday - Friday</span>
            <span className="text-foreground">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saturday</span>
            <span className="text-foreground">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sunday</span>
            <span className="text-foreground">Closed</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 p-2 bg-success/10 border border-success/20 rounded-lg">
          <Icon name="Clock" size={14} className="text-success" />
          <span className="text-sm font-medium text-success">Currently Open</span>
        </div>
      </div>
      {/* Response Time */}
      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Response Time</span>
        </div>
        <span className="text-sm text-muted-foreground">Within 2 hours</span>
      </div>
    </div>
  );
};

export default VendorContactCard;