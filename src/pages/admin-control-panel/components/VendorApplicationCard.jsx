import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const VendorApplicationCard = ({ application, onApprove, onReject }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [comment, setComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await onApprove(application?.id, comment);
    setIsProcessing(false);
    setComment('');
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await onReject(application?.id, comment);
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
            <Icon name="Building2" size={24} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{application?.businessName}</h3>
            <p className="text-sm text-muted-foreground">{application?.contactPerson}</p>
            <p className="text-sm text-muted-foreground">{application?.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application?.status)}`}>
            {application?.status?.charAt(0)?.toUpperCase() + application?.status?.slice(1)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            iconName={showDetails ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Details
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">GST Number</p>
          <p className="text-sm text-foreground">{application?.gstNumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Business Type</p>
          <p className="text-sm text-foreground">{application?.businessType}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Applied On</p>
          <p className="text-sm text-foreground">{application?.appliedDate}</p>
        </div>
      </div>
      {showDetails && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Business Information</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Address</p>
                  <p className="text-sm text-foreground">{application?.address}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm text-foreground">{application?.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Years in Business</p>
                  <p className="text-sm text-foreground">{application?.yearsInBusiness} years</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Documents</h4>
              <div className="space-y-2">
                {application?.documents?.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{doc?.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" iconName="Download">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {application?.status === 'pending' && (
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
                  Approve Vendor
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  loading={isProcessing}
                  iconName="X"
                  iconPosition="left"
                >
                  Reject Application
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorApplicationCard;