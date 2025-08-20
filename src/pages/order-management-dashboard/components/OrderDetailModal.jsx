import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const OrderDetailModal = ({ order, isOpen, onClose, onStatusUpdate, userRole = 'buyer' }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !order) return null;

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const getStatusTimeline = () => {
    const timeline = [
      { status: 'created', label: 'Order Created', date: order?.createdAt, completed: true },
      { status: 'confirmed', label: 'Order Confirmed', date: order?.confirmedAt, completed: ['confirmed', 'shipped', 'delivered']?.includes(order?.status) },
      { status: 'shipped', label: 'Order Shipped', date: order?.shippedAt, completed: ['shipped', 'delivered']?.includes(order?.status) },
      { status: 'delivered', label: 'Order Delivered', date: order?.deliveredAt, completed: order?.status === 'delivered' }
    ];
    return timeline;
  };

  const tabs = [
    { id: 'details', label: 'Order Details', icon: 'Package' },
    { id: 'timeline', label: 'Status Timeline', icon: 'Clock' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-foreground">Order #{order?.id}</h2>
            <StatusBadge status={order?.status} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-smooth ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Order Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Date:</span>
                      <span className="text-foreground">{formatDate(order?.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order ID:</span>
                      <span className="font-mono text-primary">#{order?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <StatusBadge status={order?.status} size="sm" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Items:</span>
                      <span className="text-foreground">{order?.items}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Parties</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Icon name="Store" size={14} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{order?.vendor}</p>
                        <p className="text-xs text-muted-foreground">Vendor</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{order?.buyer}</p>
                        <p className="text-xs text-muted-foreground">Buyer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Order Items</h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  {order?.orderItems?.map((item, index) => (
                    <div key={index} className={`p-4 ${index > 0 ? 'border-t border-border' : ''}`}>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/assets/images/no_image.png';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item?.name}</h4>
                          <p className="text-sm text-muted-foreground">{item?.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-muted-foreground">
                              Qty: {item?.quantity} {item?.unit}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Price: {formatCurrency(item?.price)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            {formatCurrency(item?.quantity * item?.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="text-foreground">{formatCurrency(order?.subtotal || order?.total * 0.9)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span className="text-foreground">{formatCurrency(order?.shipping || order?.total * 0.05)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax:</span>
                      <span className="text-foreground">{formatCurrency(order?.tax || order?.total * 0.05)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t border-border pt-2">
                      <span className="text-foreground">Total:</span>
                      <span className="text-foreground">{formatCurrency(order?.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Order Status Timeline</h3>
              <div className="space-y-4">
                {getStatusTimeline()?.map((step, index) => (
                  <div key={step?.status} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step?.completed 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step?.completed ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name="Clock" size={16} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        step?.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step?.label}
                      </h4>
                      {step?.date && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(step?.date)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Communication History</h3>
              <div className="space-y-4">
                {order?.communications?.map((comm, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-foreground">{comm?.sender}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(comm?.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{comm?.message}</p>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8">
                    <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No communication history available</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Download Invoice
            </Button>
            <Button
              variant="outline"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Create Support Ticket
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            {userRole === 'vendor' && order?.status === 'created' && (
              <Button
                variant="default"
                onClick={() => onStatusUpdate(order?.id, 'confirmed')}
                iconName="Check"
                iconPosition="left"
              >
                Confirm Order
              </Button>
            )}
            {userRole === 'vendor' && order?.status === 'confirmed' && (
              <Button
                variant="secondary"
                onClick={() => onStatusUpdate(order?.id, 'shipped')}
                iconName="Truck"
                iconPosition="left"
              >
                Mark as Shipped
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;