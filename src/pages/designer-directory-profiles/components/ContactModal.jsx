import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactModal = ({ designer, isOpen, onClose, onSendMessage }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: '',
    attachments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    'Fashion Design',
    'Textile Design',
    'Pattern Making',
    'Embroidery Design',
    'Print Design',
    'Sustainable Design',
    'Custom Consultation',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSendMessage(designer?.id, formData);
      setFormData({
        subject: '',
        message: '',
        projectType: '',
        budget: '',
        timeline: '',
        attachments: []
      });
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-lg shadow-elevation-3 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <Image
                  src={designer?.profileImage}
                  alt={designer?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Contact {designer?.name}</h2>
                <p className="text-muted-foreground">{designer?.title}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Type *
                </label>
                <select
                  value={formData?.projectType}
                  onChange={(e) => handleInputChange('projectType', e?.target?.value)}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select project type</option>
                  {projectTypes?.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <Input
                label="Subject *"
                type="text"
                placeholder="Brief description of your project"
                value={formData?.subject}
                onChange={(e) => handleInputChange('subject', e?.target?.value)}
                required
              />

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Details *
                </label>
                <textarea
                  value={formData?.message}
                  onChange={(e) => handleInputChange('message', e?.target?.value)}
                  placeholder="Describe your project requirements, goals, and any specific needs..."
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              {/* Budget and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Budget Range (USD)"
                  type="text"
                  placeholder="e.g., $500-1000"
                  value={formData?.budget}
                  onChange={(e) => handleInputChange('budget', e?.target?.value)}
                />
                <Input
                  label="Timeline"
                  type="text"
                  placeholder="e.g., 2-3 weeks"
                  value={formData?.timeline}
                  onChange={(e) => handleInputChange('timeline', e?.target?.value)}
                />
              </div>

              {/* Designer Info */}
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Designer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Response Time:</span>
                    <div className="font-medium text-foreground">{designer?.responseTime}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Hourly Rate:</span>
                    <div className="font-medium text-foreground">${designer?.hourlyRate}/hr</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Availability:</span>
                    <div className={`font-medium ${
                      designer?.availability === 'available' ? 'text-success' :
                      designer?.availability === 'busy' ? 'text-warning' : 'text-error'
                    }`}>
                      {designer?.availability === 'available' ? 'Available' :
                       designer?.availability === 'busy' ? 'Busy' : 'Unavailable'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h4 className="font-medium text-foreground mb-2">Designer Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {designer?.specializations?.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drop files here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, JPG, PNG (Max 10MB)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e?.target?.files);
                      handleInputChange('attachments', files);
                    }}
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Before contacting:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Be specific about your project requirements</li>
                      <li>• Include your budget and timeline expectations</li>
                      <li>• The designer will respond within their stated response time</li>
                      <li>• Initial consultation may be charged separately</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Your message will be sent directly to {designer?.name}
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={!formData?.subject || !formData?.message || !formData?.projectType}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;