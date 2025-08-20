import React from 'react';

import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  totalItems, 
  selectedItems, 
  onSelectAll, 
  onDeselectAll, 
  onRemoveSelected, 
  onSaveForLater 
}) => {
  const allSelected = selectedItems?.length === totalItems && totalItems > 0;
  const someSelected = selectedItems?.length > 0;

  const handleToggleSelectAll = () => {
    if (allSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-muted border border-border rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleToggleSelectAll}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-foreground">
            {allSelected ? 'Deselect all' : 'Select all'} ({totalItems} items)
          </span>
        </div>

        {someSelected && (
          <span className="text-sm text-muted-foreground">
            {selectedItems?.length} selected
          </span>
        )}
      </div>
      {someSelected && (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveForLater}
            iconName="Bookmark"
            iconPosition="left"
          >
            Save for Later
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onRemoveSelected}
            iconName="Trash2"
            iconPosition="left"
            className="text-destructive hover:text-destructive"
          >
            Remove Selected
          </Button>
        </div>
      )}
    </div>
  );
};

export default BulkActions;