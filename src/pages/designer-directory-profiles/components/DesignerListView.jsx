import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DesignerListView = ({ designer, onViewProfile, onContact }) => {
  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'busy':
        return 'bg-warning text-warning-foreground';
      case 'unavailable':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'unavailable':
        return 'Unavailable';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth p-6">
      <div className="flex items-start space-x-6">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
            <Image
              src={designer?.profileImage}
              alt={designer?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card ${getAvailabilityColor(designer?.availability)}`}></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{designer?.name}</h3>
              <p className="text-muted-foreground">{designer?.title}</p>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                <Icon name="MapPin" size={14} />
                <span>{designer?.location}</span>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(designer?.availability)}`}>
                {getAvailabilityText(designer?.availability)}
              </span>
            </div>
          </div>

          {/* Rating and Stats */}
          <div className="flex items-center space-x-6 mb-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(designer?.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                {designer?.rating} ({designer?.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{designer?.projectsCompleted} projects</span>
              <span>{designer?.experience}y experience</span>
              <span>${designer?.hourlyRate}/hr</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground mb-4 line-clamp-2">{designer?.bio}</p>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 mb-4">
            {designer?.specializations?.slice(0, 4)?.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full"
              >
                {spec}
              </span>
            ))}
            {designer?.specializations?.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                +{designer?.specializations?.length - 4} more
              </span>
            )}
          </div>

          {/* Portfolio Preview */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm font-medium text-foreground">Recent Work:</span>
            <div className="flex space-x-2">
              {designer?.portfolioImages?.slice(0, 4)?.map((image, index) => (
                <div key={index} className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={`${designer?.name} portfolio ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-smooth cursor-pointer"
                    onClick={() => onViewProfile(designer?.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Icon name="Clock" size={14} />
            <span>Responds within {designer?.responseTime}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 flex-shrink-0">
          <Button
            variant="default"
            onClick={() => onViewProfile(designer?.id)}
            className="w-32"
          >
            View Profile
          </Button>
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => onContact(designer?.id)}
            className="w-32"
          >
            Contact
          </Button>
        </div>
      </div>
      {/* Recent Work Badge */}
      {designer?.hasRecentWork && (
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            New Work
          </span>
        </div>
      )}
    </div>
  );
};

export default DesignerListView;