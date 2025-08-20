import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import StatusBadge from './StatusBadge';

const OrderTable = ({ 
  orders, 
  onOrderClick, 
  onStatusUpdate, 
  userRole = 'buyer',
  selectedOrders = [],
  onOrderSelect,
  sortConfig,
  onSort 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSort = (column) => {
    const direction = sortConfig?.key === column && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key: column, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onOrderSelect(orders?.map(order => order?.id));
    } else {
      onOrderSelect([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      onOrderSelect([...selectedOrders, orderId]);
    } else {
      onOrderSelect(selectedOrders?.filter(id => id !== orderId));
    }
  };

  const getStatusActions = (order) => {
    const actions = [];
    
    if (userRole === 'vendor') {
      if (order?.status === 'created') {
        actions?.push({ label: 'Confirm', action: 'confirmed', variant: 'default' });
      }
      if (order?.status === 'confirmed') {
        actions?.push({ label: 'Ship', action: 'shipped', variant: 'secondary' });
      }
    }
    
    if (userRole === 'admin') {
      actions?.push({ label: 'Update', action: 'update', variant: 'outline' });
    }

    return actions;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {(userRole === 'vendor' || userRole === 'admin') && (
                <th className="w-12 p-4">
                  <Checkbox
                    checked={selectedOrders?.length === orders?.length && orders?.length > 0}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                  />
                </th>
              )}
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('id')}
                  className="font-semibold text-foreground hover:bg-transparent p-0 h-auto"
                  iconName={getSortIcon('id')}
                  iconPosition="right"
                >
                  Order ID
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('date')}
                  className="font-semibold text-foreground hover:bg-transparent p-0 h-auto"
                  iconName={getSortIcon('date')}
                  iconPosition="right"
                >
                  Date
                </Button>
              </th>
              {userRole !== 'vendor' && (
                <th className="text-left p-4">
                  <span className="font-semibold text-foreground">Vendor</span>
                </th>
              )}
              {userRole !== 'buyer' && (
                <th className="text-left p-4">
                  <span className="font-semibold text-foreground">Buyer</span>
                </th>
              )}
              <th className="text-left p-4">
                <span className="font-semibold text-foreground">Items</span>
              </th>
              <th className="text-left p-4">
                <span className="font-semibold text-foreground">Status</span>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('total')}
                  className="font-semibold text-foreground hover:bg-transparent p-0 h-auto"
                  iconName={getSortIcon('total')}
                  iconPosition="right"
                >
                  Total
                </Button>
              </th>
              <th className="text-right p-4">
                <span className="font-semibold text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order?.id}
                className={`border-b border-border hover:bg-muted/30 transition-smooth cursor-pointer ${
                  selectedOrders?.includes(order?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(order?.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onOrderClick(order)}
              >
                {(userRole === 'vendor' || userRole === 'admin') && (
                  <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                    <Checkbox
                      checked={selectedOrders?.includes(order?.id)}
                      onChange={(e) => handleSelectOrder(order?.id, e?.target?.checked)}
                    />
                  </td>
                )}
                <td className="p-4">
                  <span className="font-mono text-sm font-medium text-primary">
                    #{order?.id}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{formatDate(order?.date)}</span>
                </td>
                {userRole !== 'vendor' && (
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Icon name="Store" size={14} className="text-secondary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{order?.vendor}</span>
                    </div>
                  </td>
                )}
                {userRole !== 'buyer' && (
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{order?.buyer}</span>
                    </div>
                  </td>
                )}
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {order?.items} {order?.items === 1 ? 'item' : 'items'}
                  </span>
                </td>
                <td className="p-4">
                  <StatusBadge status={order?.status} />
                </td>
                <td className="p-4">
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(order?.total)}
                  </span>
                </td>
                <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center justify-end space-x-2">
                    {getStatusActions(order)?.map((action, index) => (
                      <Button
                        key={index}
                        variant={action?.variant}
                        size="sm"
                        onClick={() => onStatusUpdate(order?.id, action?.action)}
                      >
                        {action?.label}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onOrderClick(order)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {orders?.map((order) => (
          <div
            key={order?.id}
            className="border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth cursor-pointer"
            onClick={() => onOrderClick(order)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="font-mono text-sm font-medium text-primary">#{order?.id}</span>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(order?.date)}</p>
              </div>
              <StatusBadge status={order?.status} size="sm" />
            </div>
            
            <div className="space-y-2 mb-3">
              {userRole !== 'vendor' && (
                <div className="flex items-center space-x-2">
                  <Icon name="Store" size={14} className="text-secondary" />
                  <span className="text-sm text-foreground">{order?.vendor}</span>
                </div>
              )}
              {userRole !== 'buyer' && (
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={14} className="text-primary" />
                  <span className="text-sm text-foreground">{order?.buyer}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {order?.items} {order?.items === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">
                {formatCurrency(order?.total)}
              </span>
              <div className="flex items-center space-x-2">
                {getStatusActions(order)?.slice(0, 1)?.map((action, index) => (
                  <Button
                    key={index}
                    variant={action?.variant}
                    size="sm"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onStatusUpdate(order?.id, action?.action);
                    }}
                  >
                    {action?.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onOrderClick(order);
                  }}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;