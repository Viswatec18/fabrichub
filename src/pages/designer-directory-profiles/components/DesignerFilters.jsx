import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const DesignerFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const specialties = [
    { id: 'fashion', label: 'Fashion Design', count: 45 },
    { id: 'textile', label: 'Textile Design', count: 32 },
    { id: 'pattern', label: 'Pattern Making', count: 28 },
    { id: 'embroidery', label: 'Embroidery Design', count: 19 },
    { id: 'print', label: 'Print Design', count: 24 },
    { id: 'sustainable', label: 'Sustainable Design', count: 16 }
  ];

  const experienceLevels = [
    { id: 'entry', label: '1-3 years', count: 18 },
    { id: 'mid', label: '4-7 years', count: 34 },
    { id: 'senior', label: '8-15 years', count: 28 },
    { id: 'expert', label: '15+ years', count: 12 }
  ];

  const locations = [
    { id: 'mumbai', label: 'Mumbai', count: 25 },
    { id: 'delhi', label: 'Delhi', count: 22 },
    { id: 'bangalore', label: 'Bangalore', count: 18 },
    { id: 'chennai', label: 'Chennai', count: 15 },
    { id: 'kolkata', label: 'Kolkata', count: 12 },
    { id: 'remote', label: 'Remote Available', count: 38 }
  ];

  const availabilityOptions = [
    { id: 'immediate', label: 'Available Now', count: 42 },
    { id: 'week', label: 'Within 1 Week', count: 28 },
    { id: 'month', label: 'Within 1 Month', count: 22 }
  ];

  const handleSpecialtyChange = (specialtyId, checked) => {
    const updatedSpecialties = checked
      ? [...filters?.specialties, specialtyId]
      : filters?.specialties?.filter(id => id !== specialtyId);
    
    onFiltersChange({
      ...filters,
      specialties: updatedSpecialties
    });
  };

  const handleExperienceChange = (levelId, checked) => {
    const updatedLevels = checked
      ? [...filters?.experienceLevels, levelId]
      : filters?.experienceLevels?.filter(id => id !== levelId);
    
    onFiltersChange({
      ...filters,
      experienceLevels: updatedLevels
    });
  };

  const handleLocationChange = (locationId, checked) => {
    const updatedLocations = checked
      ? [...filters?.locations, locationId]
      : filters?.locations?.filter(id => id !== locationId);
    
    onFiltersChange({
      ...filters,
      locations: updatedLocations
    });
  };

  const handleAvailabilityChange = (availabilityId, checked) => {
    const updatedAvailability = checked
      ? [...filters?.availability, availabilityId]
      : filters?.availability?.filter(id => id !== availabilityId);
    
    onFiltersChange({
      ...filters,
      availability: updatedAvailability
    });
  };

  const handleRatingChange = (value) => {
    onFiltersChange({
      ...filters,
      minRating: parseFloat(value) || 0
    });
  };

  const handlePriceRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters?.priceRange,
        [field]: parseFloat(value) || 0
      }
    });
  };

  const getActiveFiltersCount = () => {
    return filters?.specialties?.length + 
           filters?.experienceLevels?.length + 
           filters?.locations?.length + 
           filters?.availability?.length +
           (filters?.minRating > 0 ? 1 : 0) +
           (filters?.priceRange?.min > 0 || filters?.priceRange?.max > 0 ? 1 : 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-4 rounded-none border-0 border-b"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={18} />
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block p-6 space-y-6`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Search by Name */}
        <div>
          <Input
            type="search"
            placeholder="Search designers..."
            value={filters?.searchQuery}
            onChange={(e) => onFiltersChange({
              ...filters,
              searchQuery: e?.target?.value
            })}
            className="w-full"
          />
        </div>

        {/* Design Specialties */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Design Specialties</h4>
          <div className="space-y-2">
            {specialties?.map((specialty) => (
              <div key={specialty?.id} className="flex items-center justify-between">
                <Checkbox
                  label={specialty?.label}
                  checked={filters?.specialties?.includes(specialty?.id)}
                  onChange={(e) => handleSpecialtyChange(specialty?.id, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">({specialty?.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Experience Level</h4>
          <div className="space-y-2">
            {experienceLevels?.map((level) => (
              <div key={level?.id} className="flex items-center justify-between">
                <Checkbox
                  label={level?.label}
                  checked={filters?.experienceLevels?.includes(level?.id)}
                  onChange={(e) => handleExperienceChange(level?.id, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">({level?.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Location</h4>
          <div className="space-y-2">
            {locations?.map((location) => (
              <div key={location?.id} className="flex items-center justify-between">
                <Checkbox
                  label={location?.label}
                  checked={filters?.locations?.includes(location?.id)}
                  onChange={(e) => handleLocationChange(location?.id, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">({location?.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="rating"
                  value={rating}
                  checked={filters?.minRating === rating}
                  onChange={(e) => handleRatingChange(e?.target?.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 text-sm">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < rating ? "text-amber-400 fill-current" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">& up</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Hourly Rate (USD)</h4>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters?.priceRange?.min || ''}
              onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters?.priceRange?.max || ''}
              onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Availability</h4>
          <div className="space-y-2">
            {availabilityOptions?.map((option) => (
              <div key={option?.id} className="flex items-center justify-between">
                <Checkbox
                  label={option?.label}
                  checked={filters?.availability?.includes(option?.id)}
                  onChange={(e) => handleAvailabilityChange(option?.id, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">({option?.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerFilters;