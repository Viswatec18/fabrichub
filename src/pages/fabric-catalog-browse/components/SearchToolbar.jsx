import React from 'react';
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';

const SearchToolbar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultsCount,
  onFilterToggle
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'moq-low', label: 'MOQ: Low to High' },
    { value: 'moq-high', label: 'MOQ: High to Low' }
  ];

  return (
    <div className="bg-white border-b border-macos-gray-2 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left section - Search and Filter */}
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fabrics, materials, or suppliers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-3 bg-macos-gray-1 border-0 rounded-macos text-foreground placeholder:text-muted-foreground focus-ring-macos focus:bg-white focus:shadow-macos transition-smooth"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={onFilterToggle}
            className="btn-macos px-4 py-3 lg:hidden"
            title="Toggle filters"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Center section - Results count */}
        <div className="hidden md:block">
          <span className="text-sm text-muted-foreground font-medium">
            {resultsCount?.toLocaleString()} fabrics
          </span>
        </div>

        {/* Right section - Controls */}
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="btn-macos pr-8 appearance-none bg-white focus-ring-macos"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex items-center bg-macos-gray-1 rounded-macos p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-smooth ${
                viewMode === 'grid' ?'bg-white shadow-macos text-macos-blue' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition-smooth ${
                viewMode === 'list' ?'bg-white shadow-macos text-macos-blue' :'text-muted-foreground hover:text-foreground'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchToolbar;