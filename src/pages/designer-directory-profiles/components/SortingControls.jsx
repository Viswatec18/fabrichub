import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingControls = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange, totalResults }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'rating', label: 'Rating' },
    { value: 'price', label: 'Price' },
    { value: 'experience', label: 'Experience' },
    { value: 'recent', label: 'Recently Active' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle sort order if same field
      onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to desc for new field
      onSortChange(newSortBy, 'desc');
    }
  };

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      {/* Results Count */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">
          {totalResults} designers found
        </span>
      </div>
      {/* Sorting and View Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex items-center space-x-1">
            {sortOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={sortBy === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => handleSortChange(option?.value)}
                className="relative"
              >
                {option?.label}
                {sortBy === option?.value && (
                  <Icon
                    name={sortOrder === 'asc' ? "ArrowUp" : "ArrowDown"}
                    size={14}
                    className="ml-1"
                  />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-none border-0"
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-none border-0 border-l border-border"
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortingControls;