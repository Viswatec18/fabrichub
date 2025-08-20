import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  filters, 
  onFiltersChange, 
  onSearch, 
  searchQuery, 
  userRole = 'buyer',
  onExport,
  onBulkAction 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'created', label: 'Created' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const vendorOptions = [
    { value: 'all', label: 'All Vendors' },
    { value: 'textile-mills-inc', label: 'Textile Mills Inc.' },
    { value: 'premium-fabrics', label: 'Premium Fabrics Ltd.' },
    { value: 'cotton-craft', label: 'Cotton Craft Co.' },
    { value: 'silk-weavers', label: 'Silk Weavers Union' }
  ];

  const buyerOptions = [
    { value: 'all', label: 'All Buyers' },
    { value: 'fashion-forward', label: 'Fashion Forward Inc.' },
    { value: 'trendy-textiles', label: 'Trendy Textiles' },
    { value: 'modern-apparel', label: 'Modern Apparel Co.' },
    { value: 'style-studio', label: 'Style Studio Ltd.' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      vendor: 'all',
      buyer: 'all',
      dateRange: 'all',
      minAmount: '',
      maxAmount: ''
    });
    onSearch('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-elevation-1">
      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search orders, products, or customers..."
            value={searchQuery}
            onChange={(e) => onSearch(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Filters
          </Button>
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
          {userRole === 'vendor' && (
            <Button
              variant="outline"
              onClick={onBulkAction}
              iconName="CheckSquare"
              iconPosition="left"
            >
              Bulk Actions
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />

            {userRole !== 'vendor' && (
              <Select
                label="Vendor"
                options={vendorOptions}
                value={filters?.vendor}
                onChange={(value) => handleFilterChange('vendor', value)}
                searchable
              />
            )}

            {userRole !== 'buyer' && (
              <Select
                label="Buyer"
                options={buyerOptions}
                value={filters?.buyer}
                onChange={(value) => handleFilterChange('buyer', value)}
                searchable
              />
            )}
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Min Amount ($)"
              type="number"
              placeholder="0"
              value={filters?.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
            />
            <Input
              label="Max Amount ($)"
              type="number"
              placeholder="10000"
              value={filters?.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
            />
          </div>

          {/* Custom Date Range */}
          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Start Date"
                type="date"
                value={filters?.startDate}
                onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters?.endDate}
                onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;