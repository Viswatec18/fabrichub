import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onUpdateStatus, onViewDetails, onGenerateLabel, onContactCustomer }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
      processing: 'bg-purple-50 text-purple-700 border-purple-200',
      shipped: 'bg-green-50 text-green-700 border-green-200',
      delivered: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors?.[status] || colors?.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'Clock',
      confirmed: 'CheckCircle',
      processing: 'Package',
      shipped: 'Truck',
      delivered: 'CheckCircle2'
    };
    return icons?.[status] || 'Clock';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Order #{order?.orderNumber}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {order?.customerName} • {formatDate(order?.orderDate)}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(order?.status)} size={14} />
            <span className="capitalize">{order?.status}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {order?.items?.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-foreground">{item?.name}</span>
            <span className="text-muted-foreground">{item?.quantity} × ${item?.price}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mb-4 pt-2 border-t border-border">
        <span className="font-medium text-foreground">Total Amount</span>
        <span className="font-bold text-lg text-foreground">${order?.totalAmount}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(order)} className="flex-1">
          <Icon name="Eye" size={14} />
          View Details
        </Button>
        
        {order?.status === 'confirmed' && (
          <Button size="sm" onClick={() => onUpdateStatus(order?.id, 'processing')}>
            <Icon name="Package" size={14} />
            Process
          </Button>
        )}
        
        {order?.status === 'processing' && (
          <Button size="sm" onClick={() => onGenerateLabel(order)}>
            <Icon name="Truck" size={14} />
            Ship
          </Button>
        )}
        
        <Button variant="ghost" size="sm" onClick={() => onContactCustomer(order)}>
          <Icon name="MessageCircle" size={14} />
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;