import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InventoryTable = ({ products, onEdit, onDuplicate, onArchive, onUpdateStock, onBulkAction }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(products?.map(p => p?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts?.filter(id => id !== productId));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStockStatus = (stock, threshold) => {
    if (stock === 0) return { status: 'Out of Stock', color: 'text-red-600' };
    if (stock <= threshold) return { status: 'Low Stock', color: 'text-amber-600' };
    return { status: 'In Stock', color: 'text-green-600' };
  };

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary transition-smooth"
    >
      <span>{children}</span>
      {sortField === field && (
        <Icon 
          name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
          size={14} 
        />
      )}
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {selectedProducts?.length > 0 && (
        <div className="bg-muted px-6 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedProducts?.length} items selected
            </span>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onBulkAction('updatePrice', selectedProducts)}
              >
                <Icon name="DollarSign" size={14} />
                Update Prices
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onBulkAction('updateStock', selectedProducts)}
              >
                <Icon name="Package" size={14} />
                Update Stock
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onBulkAction('archive', selectedProducts)}
              >
                <Icon name="Archive" size={14} />
                Archive
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === products?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="name">Product</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="material">Material</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="price">Price</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="stock">Stock</SortButton>
              </th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedProducts?.map((product) => {
              const stockStatus = getStockStatus(product?.stock, product?.lowStockThreshold);
              return (
                <tr key={product?.id} className="hover:bg-muted/50 transition-smooth">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts?.includes(product?.id)}
                      onChange={(e) => handleSelectProduct(product?.id, e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image 
                          src={product?.image} 
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product?.name}</p>
                        <p className="text-sm text-muted-foreground">SKU: {product?.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-foreground">{product?.material}</p>
                      <p className="text-sm text-muted-foreground">{product?.gsm} GSM</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">${product?.price}</p>
                      <p className="text-sm text-muted-foreground">per {product?.unit}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{product?.stock} {product?.unit}s</p>
                      <p className="text-sm text-muted-foreground">MOQ: {product?.moq}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${stockStatus?.color}`}>
                      {stockStatus?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDuplicate(product)}>
                        <Icon name="Copy" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onArchive(product)}>
                        <Icon name="Archive" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;