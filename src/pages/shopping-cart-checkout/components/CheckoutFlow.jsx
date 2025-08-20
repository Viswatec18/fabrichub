import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CheckoutFlow = ({ items, onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Address
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    
    // Payment Method
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Billing Address
    billingAddressSame: true,
    billingAddress: {}
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, title: 'Shipping', icon: 'Truck' },
    { id: 2, title: 'Payment', icon: 'CreditCard' },
    { id: 3, title: 'Review', icon: 'CheckCircle' }
  ];

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' }
  ];

  const states = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' }
  ];

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Shipping validation
      if (!formData?.firstName) newErrors.firstName = 'First name is required';
      if (!formData?.lastName) newErrors.lastName = 'Last name is required';
      if (!formData?.address1) newErrors.address1 = 'Address is required';
      if (!formData?.city) newErrors.city = 'City is required';
      if (!formData?.state) newErrors.state = 'State is required';
      if (!formData?.zipCode) newErrors.zipCode = 'ZIP code is required';
      if (!formData?.phone) newErrors.phone = 'Phone number is required';
    } else if (step === 2) {
      // Payment validation
      if (formData?.paymentMethod === 'card') {
        if (!formData?.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData?.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData?.cvv) newErrors.cvv = 'CVV is required';
        if (!formData?.cardName) newErrors.cardName = 'Cardholder name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete({
        orderData: formData,
        items: items
      });
    }, 2000);
  };

  const subtotal = items?.reduce((sum, item) => sum + (item?.quantity * item?.pricePerUnit), 0);
  const shipping = 25.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className={`flex items-center space-x-2 ${
              currentStep >= step?.id ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step?.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step?.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span className="text-sm font-medium">{step?.title}</span>
            </div>
            {index < steps?.length - 1 && (
              <div className={`w-12 h-px mx-4 ${
                currentStep > step?.id ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Address */}
          {currentStep === 1 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Shipping Address
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={formData?.firstName}
                  onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                  error={errors?.firstName}
                  required
                />
                
                <Input
                  label="Last Name"
                  type="text"
                  value={formData?.lastName}
                  onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                  error={errors?.lastName}
                  required
                />
                
                <div className="md:col-span-2">
                  <Input
                    label="Company (Optional)"
                    type="text"
                    value={formData?.company}
                    onChange={(e) => handleInputChange('company', e?.target?.value)}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Input
                    label="Address Line 1"
                    type="text"
                    value={formData?.address1}
                    onChange={(e) => handleInputChange('address1', e?.target?.value)}
                    error={errors?.address1}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Input
                    label="Address Line 2 (Optional)"
                    type="text"
                    value={formData?.address2}
                    onChange={(e) => handleInputChange('address2', e?.target?.value)}
                  />
                </div>
                
                <Input
                  label="City"
                  type="text"
                  value={formData?.city}
                  onChange={(e) => handleInputChange('city', e?.target?.value)}
                  error={errors?.city}
                  required
                />
                
                <Select
                  label="State"
                  options={states}
                  value={formData?.state}
                  onChange={(value) => handleInputChange('state', value)}
                  error={errors?.state}
                  required
                />
                
                <Input
                  label="ZIP Code"
                  type="text"
                  value={formData?.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                  error={errors?.zipCode}
                  required
                />
                
                <Select
                  label="Country"
                  options={countries}
                  value={formData?.country}
                  onChange={(value) => handleInputChange('country', value)}
                  required
                />
                
                <div className="md:col-span-2">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData?.phone}
                    onChange={(e) => handleInputChange('phone', e?.target?.value)}
                    error={errors?.phone}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Payment Method
              </h2>
              
              <Select
                label="Payment Method"
                options={paymentMethods}
                value={formData?.paymentMethod}
                onChange={(value) => handleInputChange('paymentMethod', value)}
                className="mb-6"
              />
              
              {formData?.paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData?.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
                    error={errors?.cardNumber}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      type="text"
                      placeholder="MM/YY"
                      value={formData?.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
                      error={errors?.expiryDate}
                      required
                    />
                    
                    <Input
                      label="CVV"
                      type="text"
                      placeholder="123"
                      value={formData?.cvv}
                      onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                      error={errors?.cvv}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Cardholder Name"
                    type="text"
                    value={formData?.cardName}
                    onChange={(e) => handleInputChange('cardName', e?.target?.value)}
                    error={errors?.cardName}
                    required
                  />
                </div>
              )}
              
              {formData?.paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                </div>
              )}
              
              {formData?.paymentMethod === 'bank' && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Bank Transfer Details</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Account: FabricHub Business Account
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Routing: 123456789
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Account: 987654321
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review Order */}
          {currentStep === 3 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Review Your Order
              </h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items?.map((item) => (
                  <div key={item?.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <div className="w-16 h-16 bg-background rounded-lg overflow-hidden">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item?.quantity} • ${item?.pricePerUnit}/unit
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">
                        ${(item?.quantity * item?.pricePerUnit)?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Shipping Address Summary */}
              <div className="border-t border-border pt-4 mb-4">
                <h3 className="font-medium text-foreground mb-2">Shipping Address</h3>
                <p className="text-sm text-muted-foreground">
                  {formData?.firstName} {formData?.lastName}<br />
                  {formData?.address1}<br />
                  {formData?.city}, {formData?.state} {formData?.zipCode}
                </p>
              </div>
              
              {/* Payment Method Summary */}
              <div className="border-t border-border pt-4">
                <h3 className="font-medium text-foreground mb-2">Payment Method</h3>
                <p className="text-sm text-muted-foreground">
                  {formData?.paymentMethod === 'card' && `Card ending in ${formData?.cardNumber?.slice(-4)}`}
                  {formData?.paymentMethod === 'paypal' && 'PayPal'}
                  {formData?.paymentMethod === 'bank' && 'Bank Transfer'}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onBack : handlePrevious}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              {currentStep === 1 ? 'Back to Cart' : 'Previous'}
            </Button>
            
            {currentStep < 3 ? (
              <Button
                variant="default"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleComplete}
                loading={isProcessing}
                iconName="Check"
                iconPosition="left"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Order Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${subtotal?.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">${shipping?.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">${tax?.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-lg text-foreground">${total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;