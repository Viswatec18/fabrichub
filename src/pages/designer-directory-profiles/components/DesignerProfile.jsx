import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DesignerProfile = ({ designer, onClose, onContact, onBookConsultation }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [messageText, setMessageText] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' },
    { id: 'services', label: 'Services', icon: 'Briefcase' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'availability', label: 'Availability', icon: 'Calendar' }
  ];

  const handleSendMessage = () => {
    if (messageText?.trim()) {
      onContact(designer?.id, messageText);
      setMessageText('');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Bio */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
        <p className="text-muted-foreground leading-relaxed">{designer?.fullBio}</p>
      </div>

      {/* Credentials */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Credentials</h3>
        <div className="space-y-3">
          {designer?.credentials?.map((credential, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Award" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-foreground">{credential?.title}</div>
                <div className="text-sm text-muted-foreground">{credential?.institution} • {credential?.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {designer?.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium bg-secondary/10 text-secondary rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Languages</h3>
        <div className="space-y-2">
          {designer?.languages?.map((language, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-foreground">{language?.name}</span>
              <span className="text-sm text-muted-foreground">{language?.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designer?.portfolioProjects?.map((project, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <Image
                src={project?.image}
                alt={project?.title}
                className="w-full h-full object-cover hover:scale-105 transition-smooth"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-2">{project?.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{project?.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{project?.category}</span>
                <span>{project?.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      {designer?.services?.map((service, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground mb-2">{service?.name}</h4>
              <p className="text-muted-foreground mb-3">{service?.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{service?.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="RefreshCw" size={14} />
                  <span>{service?.revisions} revisions</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">${service?.price}</div>
              <div className="text-sm text-muted-foreground">Starting at</div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setSelectedService(service)}
            className="w-full"
          >
            Request Quote
          </Button>
        </div>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      {designer?.reviews?.map((review, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={review?.clientImage}
                alt={review?.clientName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-foreground">{review?.clientName}</div>
                  <div className="text-sm text-muted-foreground">{review?.projectType}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(review?.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">{review?.date}</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{review?.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Booking Calendar</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {designer?.availableSlots?.map((slot, index) => (
            <button
              key={index}
              className={`p-2 text-sm rounded-lg transition-smooth ${
                slot?.available
                  ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              disabled={!slot?.available}
            >
              {slot?.date}
            </button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={() => onBookConsultation(designer?.id)}
          >
            Book Consultation
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 bg-card border border-border rounded-lg shadow-elevation-3 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                <Image
                  src={designer?.profileImage}
                  alt={designer?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{designer?.name}</h2>
                <p className="text-muted-foreground">{designer?.title}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    {renderStars(designer?.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      {designer?.rating} ({designer?.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{designer?.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Tabs */}
            <div className="w-64 border-r border-border p-6">
              <nav className="space-y-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Contact */}
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-3">Quick Message</h4>
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e?.target?.value)}
                  className="mb-3"
                />
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={handleSendMessage}
                  disabled={!messageText?.trim()}
                >
                  Send Message
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'portfolio' && renderPortfolio()}
              {activeTab === 'services' && renderServices()}
              {activeTab === 'reviews' && renderReviews()}
              {activeTab === 'availability' && renderAvailability()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerProfile;