import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FabricListingCard = ({ listing, onApprove, onReject }) => {
  const [comment, setComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await onApprove(listing?.id, comment);
    setIsProcessing(false);
    setComment('');
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await onReject(listing?.id, comment);
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
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={listing?.image}
            alt={listing?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{listing?.name}</h3>
              <p className="text-sm text-muted-foreground">by {listing?.vendorName}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing?.status)}`}>
              {listing?.status?.charAt(0)?.toUpperCase() + listing?.status?.slice(1)}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium text-muted-foreground">Material</p>
              <p className="text-foreground">{listing?.material}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">GSM</p>
              <p className="text-foreground">{listing?.gsm}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Price</p>
              <p className="text-foreground">${listing?.price}/yard</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">MOQ</p>
              <p className="text-foreground">{listing?.moq} yards</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
        <p className="text-sm text-foreground bg-muted p-3 rounded-lg">{listing?.description}</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Submitted: {listing?.submittedDate}</span>
          <span>•</span>
          <span>Category: {listing?.category}</span>
        </div>
        <Button variant="ghost" size="sm" iconName="ExternalLink">
          View Full Details
        </Button>
      </div>
      {listing?.status === 'pending' && (
        <div className="border-t border-border pt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Review Comment (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e?.target?.value)}
              placeholder="Add feedback for this listing..."
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
              Approve Listing
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              loading={isProcessing}
              iconName="X"
              iconPosition="left"
            >
              Reject Listing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FabricListingCard;