import React from 'react';

const StatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = (status) => {
    const configs = {
      created: {
        label: 'Created',
        className: 'bg-warning/10 text-warning border-warning/20'
      },
      confirmed: {
        label: 'Confirmed',
        className: 'bg-primary/10 text-primary border-primary/20'
      },
      shipped: {
        label: 'Shipped',
        className: 'bg-secondary/10 text-secondary border-secondary/20'
      },
      delivered: {
        label: 'Delivered',
        className: 'bg-success/10 text-success border-success/20'
      },
      cancelled: {
        label: 'Cancelled',
        className: 'bg-error/10 text-error border-error/20'
      },
      pending: {
        label: 'Pending',
        className: 'bg-warning/10 text-warning border-warning/20'
      }
    };
    return configs?.[status] || configs?.created;
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center font-medium border rounded-full ${config?.className} ${sizeClasses?.[size]}`}>
      {config?.label}
    </span>
  );
};

export default StatusBadge;