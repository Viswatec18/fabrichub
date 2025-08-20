import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSettings = ({ vendorData, onUpdateProfile, onUploadDocument }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: vendorData?.businessName || '',
    contactPerson: vendorData?.contactPerson || '',
    email: vendorData?.email || '',
    phone: vendorData?.phone || '',
    address: vendorData?.address || '',
    gstNumber: vendorData?.gstNumber || '',
    bankAccount: vendorData?.bankAccount || '',
    ifscCode: vendorData?.ifscCode || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleFileUpload = (event, documentType) => {
    const file = event?.target?.files?.[0];
    if (file) {
      onUploadDocument(documentType, file);
    }
  };

  const documents = [
    {
      type: 'gst_certificate',
      name: 'GST Certificate',
      status: vendorData?.documents?.gst_certificate ? 'uploaded' : 'pending',
      uploadDate: vendorData?.documents?.gst_certificate?.uploadDate
    },
    {
      type: 'bank_statement',
      name: 'Bank Statement',
      status: vendorData?.documents?.bank_statement ? 'uploaded' : 'pending',
      uploadDate: vendorData?.documents?.bank_statement?.uploadDate
    },
    {
      type: 'business_license',
      name: 'Business License',
      status: vendorData?.documents?.business_license ? 'uploaded' : 'pending',
      uploadDate: vendorData?.documents?.business_license?.uploadDate
    }
  ];

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Icon name="Edit" size={16} />
              Edit
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Icon name="Save" size={16} />
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Business Name"
            type="text"
            value={formData?.businessName}
            onChange={(e) => handleInputChange('businessName', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Contact Person"
            type="text"
            value={formData?.contactPerson}
            onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <div className="md:col-span-2">
            <Input
              label="Business Address"
              type="text"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              disabled={!isEditing}
              required
            />
          </div>
          
          <Input
            label="GST Number"
            type="text"
            value={formData?.gstNumber}
            onChange={(e) => handleInputChange('gstNumber', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Bank Account Number"
            type="text"
            value={formData?.bankAccount}
            onChange={(e) => handleInputChange('bankAccount', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="IFSC Code"
            type="text"
            value={formData?.ifscCode}
            onChange={(e) => handleInputChange('ifscCode', e?.target?.value)}
            disabled={!isEditing}
            required
          />
        </div>
      </div>
      {/* Document Management */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-6">Document Management</h3>
        
        <div className="space-y-4">
          {documents?.map((doc) => (
            <div key={doc?.type} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  doc?.status === 'uploaded' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
                }`}>
                  <Icon name={doc?.status === 'uploaded' ? 'FileCheck' : 'FileText'} size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{doc?.name}</p>
                  {doc?.status === 'uploaded' && doc?.uploadDate && (
                    <p className="text-sm text-muted-foreground">
                      Uploaded on {new Date(doc.uploadDate)?.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {doc?.status === 'uploaded' ? (
                  <>
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" size={14} />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={14} />
                      Download
                    </Button>
                  </>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, doc?.type)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button size="sm">
                      <Icon name="Upload" size={14} />
                      Upload
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payout Settings */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-6">Payout Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Auto Payout</p>
              <p className="text-sm text-muted-foreground">
                Automatically transfer earnings to your bank account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Payout Frequency</p>
              <p className="text-sm text-muted-foreground">Weekly</p>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={14} />
              Change
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Minimum Payout Amount</p>
              <p className="text-sm text-muted-foreground">$100.00</p>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={14} />
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;