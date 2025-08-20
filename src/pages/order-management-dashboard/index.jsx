import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import FilterToolbar from './components/FilterToolbar';
import OrderTable from './components/OrderTable';
import OrderDetailModal from './components/OrderDetailModal';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OrderManagementDashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('buyer'); // buyer, vendor, admin
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    status: 'all',
    vendor: 'all',
    buyer: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: ''
  });

  // Mock data
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      date: new Date('2024-08-10'),
      vendor: 'Textile Mills Inc.',
      buyer: 'Fashion Forward Inc.',
      status: 'delivered',
      items: 3,
      total: 2450.00,
      subtotal: 2200.00,
      shipping: 150.00,
      tax: 100.00,
      createdAt: new Date('2024-08-10T09:00:00'),
      confirmedAt: new Date('2024-08-10T10:30:00'),
      shippedAt: new Date('2024-08-11T14:00:00'),
      deliveredAt: new Date('2024-08-13T11:00:00'),
      orderItems: [
        {
          name: 'Premium Cotton Fabric',
          description: 'High-quality cotton blend, 200 GSM',
          quantity: 50,
          unit: 'yards',
          price: 25.00,
          image: 'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg'
        },
        {
          name: 'Silk Blend Material',
          description: 'Luxury silk blend, 180 GSM',
          quantity: 25,
          unit: 'yards',
          price: 45.00,
          image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg'
        },
        {
          name: 'Denim Fabric',
          description: 'Classic blue denim, 320 GSM',
          quantity: 30,
          unit: 'yards',
          price: 18.00,
          image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
        }
      ],
      communications: [
        {
          sender: 'John Smith (Vendor)',
          message: 'Order confirmed and processing started. Expected shipping date: Aug 11th.',
          timestamp: new Date('2024-08-10T10:30:00')
        },
        {
          sender: 'Sarah Johnson (Buyer)',
          message: 'Thank you for the confirmation. Please ensure quality packaging.',
          timestamp: new Date('2024-08-10T11:00:00')
        }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: new Date('2024-08-12'),
      vendor: 'Premium Fabrics Ltd.',
      buyer: 'Trendy Textiles',
      status: 'shipped',
      items: 2,
      total: 1850.00,
      subtotal: 1650.00,
      shipping: 120.00,
      tax: 80.00,
      createdAt: new Date('2024-08-12T14:00:00'),
      confirmedAt: new Date('2024-08-12T15:30:00'),
      shippedAt: new Date('2024-08-13T09:00:00'),
      orderItems: [
        {
          name: 'Wool Blend Fabric',
          description: 'Premium wool blend, 250 GSM',
          quantity: 40,
          unit: 'yards',
          price: 35.00,
          image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg'
        },
        {
          name: 'Linen Material',
          description: 'Natural linen, 160 GSM',
          quantity: 15,
          unit: 'yards',
          price: 28.00,
          image: 'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg'
        }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: new Date('2024-08-13'),
      vendor: 'Cotton Craft Co.',
      buyer: 'Modern Apparel Co.',
      status: 'confirmed',
      items: 4,
      total: 3200.00,
      subtotal: 2900.00,
      shipping: 180.00,
      tax: 120.00,
      createdAt: new Date('2024-08-13T11:00:00'),
      confirmedAt: new Date('2024-08-13T12:30:00'),
      orderItems: [
        {
          name: 'Organic Cotton',
          description: 'Certified organic cotton, 180 GSM',
          quantity: 60,
          unit: 'yards',
          price: 22.00,
          image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
        },
        {
          name: 'Cotton Twill',
          description: 'Heavy cotton twill, 280 GSM',
          quantity: 35,
          unit: 'yards',
          price: 30.00,
          image: 'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg'
        },
        {
          name: 'Canvas Material',
          description: 'Durable canvas fabric, 350 GSM',
          quantity: 20,
          unit: 'yards',
          price: 25.00,
          image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg'
        },
        {
          name: 'Chambray Fabric',
          description: 'Light chambray, 140 GSM',
          quantity: 25,
          unit: 'yards',
          price: 20.00,
          image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
        }
      ]
    },
    {
      id: 'ORD-2024-004',
      date: new Date('2024-08-14'),
      vendor: 'Silk Weavers Union',
      buyer: 'Style Studio Ltd.',
      status: 'created',
      items: 1,
      total: 1200.00,
      subtotal: 1100.00,
      shipping: 60.00,
      tax: 40.00,
      createdAt: new Date('2024-08-14T08:00:00'),
      orderItems: [
        {
          name: 'Pure Silk Fabric',
          description: 'Premium pure silk, 120 GSM',
          quantity: 20,
          unit: 'yards',
          price: 55.00,
          image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg'
        }
      ]
    },
    {
      id: 'ORD-2024-005',
      date: new Date('2024-08-11'),
      vendor: 'Textile Mills Inc.',
      buyer: 'Fashion Forward Inc.',
      status: 'delivered',
      items: 2,
      total: 1680.00,
      subtotal: 1500.00,
      shipping: 100.00,
      tax: 80.00,
      createdAt: new Date('2024-08-11T16:00:00'),
      confirmedAt: new Date('2024-08-11T17:00:00'),
      shippedAt: new Date('2024-08-12T10:00:00'),
      deliveredAt: new Date('2024-08-14T09:00:00'),
      orderItems: [
        {
          name: 'Polyester Blend',
          description: 'Durable polyester blend, 200 GSM',
          quantity: 45,
          unit: 'yards',
          price: 18.00,
          image: 'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg'
        },
        {
          name: 'Viscose Fabric',
          description: 'Soft viscose material, 150 GSM',
          quantity: 30,
          unit: 'yards',
          price: 24.00,
          image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
        }
      ]
    }
  ];

  // Get metrics based on user role
  const getMetrics = () => {
    const totalOrders = mockOrders?.length;
    const pendingOrders = mockOrders?.filter(order => order?.status === 'created')?.length;
    const shippedOrders = mockOrders?.filter(order => order?.status === 'shipped')?.length;
    const totalRevenue = mockOrders?.reduce((sum, order) => sum + order?.total, 0);

    if (userRole === 'vendor') {
      return [
        {
          title: 'Total Orders',
          value: totalOrders?.toString(),
          subtitle: 'All time orders',
          icon: 'Package',
          trend: 'up',
          trendValue: '+12%',
          color: 'primary'
        },
        {
          title: 'Pending Approval',
          value: pendingOrders?.toString(),
          subtitle: 'Awaiting confirmation',
          icon: 'Clock',
          trend: 'down',
          trendValue: '-5%',
          color: 'warning'
        },
        {
          title: 'Shipped Orders',
          value: shippedOrders?.toString(),
          subtitle: 'In transit',
          icon: 'Truck',
          trend: 'up',
          trendValue: '+8%',
          color: 'secondary'
        },
        {
          title: 'Total Revenue',
          value: `$${totalRevenue?.toLocaleString()}`,
          subtitle: 'This month',
          icon: 'DollarSign',
          trend: 'up',
          trendValue: '+15%',
          color: 'success'
        }
      ];
    } else if (userRole === 'buyer') {
      return [
        {
          title: 'Total Orders',
          value: totalOrders?.toString(),
          subtitle: 'All time orders',
          icon: 'ShoppingCart',
          trend: 'up',
          trendValue: '+8%',
          color: 'primary'
        },
        {
          title: 'Pending Orders',
          value: pendingOrders?.toString(),
          subtitle: 'Awaiting processing',
          icon: 'Clock',
          trend: 'down',
          trendValue: '-3%',
          color: 'warning'
        },
        {
          title: 'Delivered',
          value: mockOrders?.filter(order => order?.status === 'delivered')?.length?.toString(),
          subtitle: 'Successfully delivered',
          icon: 'CheckCircle',
          trend: 'up',
          trendValue: '+10%',
          color: 'success'
        },
        {
          title: 'Total Spent',
          value: `$${totalRevenue?.toLocaleString()}`,
          subtitle: 'This month',
          icon: 'CreditCard',
          trend: 'up',
          trendValue: '+12%',
          color: 'secondary'
        }
      ];
    } else { // admin
      return [
        {
          title: 'Total Orders',
          value: totalOrders?.toString(),
          subtitle: 'Platform wide',
          icon: 'BarChart3',
          trend: 'up',
          trendValue: '+18%',
          color: 'primary'
        },
        {
          title: 'Active Vendors',
          value: '4',
          subtitle: 'Registered vendors',
          icon: 'Store',
          trend: 'up',
          trendValue: '+2%',
          color: 'secondary'
        },
        {
          title: 'Active Buyers',
          value: '4',
          subtitle: 'Registered buyers',
          icon: 'Users',
          trend: 'up',
          trendValue: '+5%',
          color: 'success'
        },
        {
          title: 'Platform Revenue',
          value: `$${(totalRevenue * 0.05)?.toLocaleString()}`,
          subtitle: '5% commission',
          icon: 'TrendingUp',
          trend: 'up',
          trendValue: '+22%',
          color: 'warning'
        }
      ];
    }
  };

  // Filter and sort orders
  const getFilteredOrders = () => {
    let filtered = [...mockOrders];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(order =>
        order?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.vendor?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.buyer?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.orderItems?.some(item => 
          item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(order => order?.status === filters?.status);
    }

    // Apply vendor filter
    if (filters?.vendor !== 'all') {
      filtered = filtered?.filter(order => 
        order?.vendor?.toLowerCase()?.replace(/[^a-z0-9]/g, '-') === filters?.vendor
      );
    }

    // Apply buyer filter
    if (filters?.buyer !== 'all') {
      filtered = filtered?.filter(order => 
        order?.buyer?.toLowerCase()?.replace(/[^a-z0-9]/g, '-') === filters?.buyer
      );
    }

    // Apply amount range filter
    if (filters?.minAmount) {
      filtered = filtered?.filter(order => order?.total >= parseFloat(filters?.minAmount));
    }
    if (filters?.maxAmount) {
      filtered = filtered?.filter(order => order?.total <= parseFloat(filters?.maxAmount));
    }

    // Apply date range filter
    if (filters?.dateRange !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (filters?.dateRange) {
        case 'today':
          startDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          startDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'quarter':
          startDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'custom':
          if (filters?.startDate && filters?.endDate) {
            const customStart = new Date(filters.startDate);
            const customEnd = new Date(filters.endDate);
            filtered = filtered?.filter(order => 
              order?.date >= customStart && order?.date <= customEnd
            );
          }
          break;
      }
      
      if (filters?.dateRange !== 'custom') {
        filtered = filtered?.filter(order => order?.date >= startDate);
      }
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortConfig?.key === 'total') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortConfig?.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredOrders = getFilteredOrders();
  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);
  const paginatedOrders = filteredOrders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // Update local state or refetch data
  };

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log('Exporting orders...');
  };

  const handleBulkAction = () => {
    if (selectedOrders?.length === 0) {
      alert('Please select orders to perform bulk actions');
      return;
    }
    console.log('Bulk action for orders:', selectedOrders);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Role switching for demo purposes
  const handleRoleSwitch = (role) => {
    setUserRole(role);
    setSelectedOrders([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole} 
        onNavigate={handleNavigation}
        currentUser={{ name: `${userRole?.charAt(0)?.toUpperCase() + userRole?.slice(1)} User` }}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb onNavigate={handleNavigation} />
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Order Management</h1>
              <p className="text-muted-foreground">
                Track and manage your orders with comprehensive filtering and status updates
              </p>
            </div>
            
            {/* Role Switcher for Demo */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground">View as:</span>
              {['buyer', 'vendor', 'admin']?.map((role) => (
                <Button
                  key={role}
                  variant={userRole === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleRoleSwitch(role)}
                >
                  {role?.charAt(0)?.toUpperCase() + role?.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {getMetrics()?.map((metric, index) => (
              <MetricsCard key={index} {...metric} />
            ))}
          </div>

          {/* Filter Toolbar */}
          <FilterToolbar
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={setSearchQuery}
            searchQuery={searchQuery}
            userRole={userRole}
            onExport={handleExport}
            onBulkAction={handleBulkAction}
          />

          {/* Orders Table */}
          <OrderTable
            orders={paginatedOrders}
            onOrderClick={handleOrderClick}
            onStatusUpdate={handleStatusUpdate}
            userRole={userRole}
            selectedOrders={selectedOrders}
            onOrderSelect={setSelectedOrders}
            sortConfig={sortConfig}
            onSort={setSortConfig}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredOrders?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />

          {/* Empty State */}
          {filteredOrders?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Package" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || Object.values(filters)?.some(f => f !== 'all' && f !== '')
                  ? 'Try adjusting your search or filters' :'No orders have been placed yet'
                }
              </p>
              {!searchQuery && !Object.values(filters)?.some(f => f !== 'all' && f !== '') && (
                <Button
                  variant="default"
                  onClick={() => handleNavigation('/fabric-catalog-browse')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Browse Catalog
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
        userRole={userRole}
      />
    </div>
  );
};

export default OrderManagementDashboard;