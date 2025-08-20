import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const itemsPerPageOptions = [12, 24, 36, 48];
  
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages?.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages?.push(i);
        pages?.push('...');
        pages?.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages?.push(1);
        pages?.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages?.push(i);
      } else {
        pages?.push(1);
        pages?.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages?.push(i);
        pages?.push('...');
        pages?.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-6 py-4 flex items-center justify-between">
      {/* Results info */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {startItem?.toLocaleString()}-{endItem?.toLocaleString()} of{' '}
          {totalItems?.toLocaleString()} results
        </p>
        
        {/* Items per page */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Show:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e?.target?.value))}
            className="btn-macos text-sm pr-8"
          >
            {itemsPerPageOptions?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`btn-macos p-2 ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' :'hover-press'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {generatePageNumbers()?.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-muted-foreground">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                      currentPage === page
                        ? 'bg-macos-blue text-white shadow-macos'
                        : 'text-foreground hover:bg-macos-gray-1 hover-press'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`btn-macos p-2 ${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' :'hover-press'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;