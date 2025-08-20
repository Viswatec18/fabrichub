import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionTable = ({ transactions, onExport }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedTransactions = [...transactions]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'amount') {
      aValue = parseFloat(aValue?.replace(/[$,]/g, ''));
      bValue = parseFloat(bValue?.replace(/[$,]/g, ''));
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedTransactions = sortedTransactions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(transactions?.length / itemsPerPage);

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      failed: 'bg-error text-error-foreground',
      processing: 'bg-secondary text-secondary-foreground'
    };
    return colors?.[status] || colors?.pending;
  };

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary transition-smooth"
    >
      <span>{children}</span>
      <Icon 
        name={sortBy === field ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
        size={14} 
      />
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export CSV
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left">
                <SortButton field="transactionId">Transaction ID</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="date">Date</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="vendor">Vendor</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="buyer">Buyer</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="amount">Amount</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedTransactions?.map((transaction) => (
              <tr key={transaction?.transactionId} className="hover:bg-muted/50 transition-smooth">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-foreground">{transaction?.transactionId}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{transaction?.date}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{transaction?.vendor}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{transaction?.buyer}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">{transaction?.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                    {transaction?.status?.charAt(0)?.toUpperCase() + transaction?.status?.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm" iconName="Eye">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, transactions?.length)} of {transactions?.length} transactions
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              <span className="text-sm text-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;