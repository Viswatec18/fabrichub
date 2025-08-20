import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DesignerCard = ({ designer, onViewProfile, onContact }) => {
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
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth overflow-hidden">
      {/* Header with Profile Image and Status */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <Image
                src={designer?.profileImage}
                alt={designer?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${getAvailabilityColor(designer?.availability)}`}></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">{designer?.name}</h3>
            <p className="text-sm text-muted-foreground">{designer?.location}</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {renderStars(designer?.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                {designer?.rating} ({designer?.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(designer?.availability)}`}>
            {getAvailabilityText(designer?.availability)}
          </span>
        </div>
      </div>
      {/* Specializations */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {designer?.specializations?.slice(0, 3)?.map((spec, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full"
            >
              {spec}
            </span>
          ))}
          {designer?.specializations?.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
              +{designer?.specializations?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Portfolio Preview */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {designer?.portfolioImages?.slice(0, 3)?.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
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
      {/* Stats */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">{designer?.projectsCompleted}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">{designer?.experience}y</div>
            <div className="text-xs text-muted-foreground">Experience</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">${designer?.hourlyRate}</div>
            <div className="text-xs text-muted-foreground">Per Hour</div>
          </div>
        </div>
      </div>
      {/* Response Time */}
      <div className="px-6 pb-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Responds within {designer?.responseTime}</span>
        </div>
      </div>
      {/* Bio Preview */}
      <div className="px-6 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {designer?.bio}
        </p>
      </div>
      {/* Action Buttons */}
      <div className="p-6 pt-0 space-y-2">
        <Button
          variant="default"
          fullWidth
          onClick={() => onViewProfile(designer?.id)}
        >
          View Profile
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
          onClick={() => onContact(designer?.id)}
        >
          Contact Designer
        </Button>
      </div>
      {/* Recent Work Badge */}
      {designer?.hasRecentWork && (
        <div className="absolute top-2 left-2">
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            New Work
          </span>
        </div>
      )}
    </div>
  );
};

export default DesignerCard;