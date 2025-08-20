import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BuyerRequestCard = ({ request, onApprove, onReject }) => {
  const [comment, setComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await onApprove(request?.id, comment);
    setIsProcessing(false);
    setComment('');
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await onReject(request?.id, comment);
    setIsProcessing(false);
    setComment('');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning text-warning-foreground',
      approved: 'bg-success text-success-foreground',
      rejected: 'bg-error text-error-foreground'
    };
    return colors?.[status] || colors?.pending;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="User" size={24} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{request?.companyName}</h3>
            <p className="text-sm text-muted-foreground">{request?.contactPerson}</p>
            <p className="text-sm text-muted-foreground">{request?.email}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request?.status)}`}>
          {request?.status?.charAt(0)?.toUpperCase() + request?.status?.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Business Type</p>
          <p className="text-sm text-foreground">{request?.businessType}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Monthly Volume</p>
          <p className="text-sm text-foreground">{request?.monthlyVolume}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Requested On</p>
          <p className="text-sm text-foreground">{request?.requestDate}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">Business Requirements</p>
        <p className="text-sm text-foreground bg-muted p-3 rounded-lg">{request?.requirements}</p>
      </div>
      {request?.status === 'pending' && (
        <div className="border-t border-border pt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Admin Comment (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e?.target?.value)}
              placeholder="Add a comment for this decision..."
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="success"
              onClick={handleApprove}
              loading={isProcessing}
              iconName="Check"
              iconPosition="left"
            >
              Approve Access
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              loading={isProcessing}
              iconName="X"
              iconPosition="left"
            >
              Reject Request
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerRequestCard;