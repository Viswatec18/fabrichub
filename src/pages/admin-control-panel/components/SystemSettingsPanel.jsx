import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemSettingsPanel = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Platform Settings */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Platform Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Platform Name"
            value={formData?.platformName}
            onChange={(e) => handleInputChange('platformName', e?.target?.value)}
          />
          <Input
            label="Support Email"
            type="email"
            value={formData?.supportEmail}
            onChange={(e) => handleInputChange('supportEmail', e?.target?.value)}
          />
          <Input
            label="Commission Rate (%)"
            type="number"
            value={formData?.commissionRate}
            onChange={(e) => handleInputChange('commissionRate', e?.target?.value)}
          />
          <Input
            label="Minimum Order Value ($)"
            type="number"
            value={formData?.minimumOrderValue}
            onChange={(e) => handleInputChange('minimumOrderValue', e?.target?.value)}
          />
        </div>
      </div>
      {/* User Management */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">User Management</h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Auto-approve vendor applications"
            checked={formData?.userManagement?.autoApproveVendors}
            onChange={(e) => handleNestedChange('userManagement', 'autoApproveVendors', e?.target?.checked)}
          />
          <Checkbox
            label="Auto-approve buyer requests"
            checked={formData?.userManagement?.autoApproveBuyers}
            onChange={(e) => handleNestedChange('userManagement', 'autoApproveBuyers', e?.target?.checked)}
          />
          <Checkbox
            label="Require email verification"
            checked={formData?.userManagement?.requireEmailVerification}
            onChange={(e) => handleNestedChange('userManagement', 'requireEmailVerification', e?.target?.checked)}
          />
          <Checkbox
            label="Enable two-factor authentication"
            checked={formData?.userManagement?.enableTwoFactor}
            onChange={(e) => handleNestedChange('userManagement', 'enableTwoFactor', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Content Moderation */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Content Moderation</h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Auto-approve fabric listings"
            checked={formData?.contentModeration?.autoApproveFabrics}
            onChange={(e) => handleNestedChange('contentModeration', 'autoApproveFabrics', e?.target?.checked)}
          />
          <Checkbox
            label="Enable content filtering"
            checked={formData?.contentModeration?.enableContentFiltering}
            onChange={(e) => handleNestedChange('contentModeration', 'enableContentFiltering', e?.target?.checked)}
          />
          <Checkbox
            label="Require image moderation"
            checked={formData?.contentModeration?.requireImageModeration}
            onChange={(e) => handleNestedChange('contentModeration', 'requireImageModeration', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Email notifications for new applications"
            checked={formData?.notifications?.emailNewApplications}
            onChange={(e) => handleNestedChange('notifications', 'emailNewApplications', e?.target?.checked)}
          />
          <Checkbox
            label="SMS notifications for urgent issues"
            checked={formData?.notifications?.smsUrgentIssues}
            onChange={(e) => handleNestedChange('notifications', 'smsUrgentIssues', e?.target?.checked)}
          />
          <Checkbox
            label="Daily summary reports"
            checked={formData?.notifications?.dailySummaryReports}
            onChange={(e) => handleNestedChange('notifications', 'dailySummaryReports', e?.target?.checked)}
          />
          <Checkbox
            label="Weekly analytics reports"
            checked={formData?.notifications?.weeklyAnalytics}
            onChange={(e) => handleNestedChange('notifications', 'weeklyAnalytics', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Payment Settings */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Payment Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Payment Processing Fee (%)"
            type="number"
            value={formData?.paymentSettings?.processingFee}
            onChange={(e) => handleNestedChange('paymentSettings', 'processingFee', e?.target?.value)}
          />
          <Input
            label="Payout Schedule (days)"
            type="number"
            value={formData?.paymentSettings?.payoutSchedule}
            onChange={(e) => handleNestedChange('paymentSettings', 'payoutSchedule', e?.target?.value)}
          />
        </div>
        
        <div className="mt-4 space-y-4">
          <Checkbox
            label="Enable escrow payments"
            checked={formData?.paymentSettings?.enableEscrow}
            onChange={(e) => handleNestedChange('paymentSettings', 'enableEscrow', e?.target?.checked)}
          />
          <Checkbox
            label="Auto-release payments on delivery"
            checked={formData?.paymentSettings?.autoReleasePayments}
            onChange={(e) => handleNestedChange('paymentSettings', 'autoReleasePayments', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemSettingsPanel;