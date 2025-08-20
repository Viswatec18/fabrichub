import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import ProductCard from './components/ProductCard';
import OrderCard from './components/OrderCard';
import InventoryTable from './components/InventoryTable';
import AnalyticsChart from './components/AnalyticsChart';
import ProfileSettings from './components/ProfileSettings';

const VendorDashboardInventory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory');
  const [viewMode, setViewMode] = useState('grid'); // grid or table
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock vendor data
  const vendorData = {
    businessName: "Premium Textiles Co.",
    contactPerson: "Sarah Johnson",
    email: "sarah@premiumtextiles.com",
    phone: "+1 (555) 123-4567",
    address: "1234 Industrial Ave, Textile District, NY 10001",
    gstNumber: "22AAAAA0000A1Z5",
    bankAccount: "****1234",
    ifscCode: "HDFC0001234",
    documents: {
      gst_certificate: { uploadDate: "2024-01-15" },
      bank_statement: { uploadDate: "2024-01-20" },
      business_license: null
    }
  };

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Products",
      value: "247",
      change: "+12 this month",
      changeType: "positive",
      icon: "Package",
      color: "blue"
    },
    {
      title: "Pending Orders",
      value: "18",
      change: "+3 today",
      changeType: "positive",
      icon: "Clock",
      color: "amber"
    },
    {
      title: "Monthly Revenue",
      value: "$24,580",
      change: "+18.2% vs last month",
      changeType: "positive",
      icon: "DollarSign",
      color: "green"
    },
    {
      title: "Low Stock Alerts",
      value: "7",
      change: "2 critical",
      changeType: "negative",
      icon: "AlertTriangle",
      color: "red"
    }
  ];

  // Mock products data
  const productsData = [
    {
      id: 1,
      name: "Premium Cotton Twill",
      material: "Cotton",
      gsm: 280,
      price: 12.50,
      stock: 450,
      lowStockThreshold: 100,
      moq: 50,
      unit: "yard",
      sku: "PCT-001",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"
    },
    {
      id: 2,
      name: "Silk Charmeuse Fabric",
      material: "Silk",
      gsm: 120,
      price: 28.75,
      stock: 85,
      lowStockThreshold: 100,
      moq: 25,
      unit: "yard",
      sku: "SCF-002",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    },
    {
      id: 3,
      name: "Organic Linen Blend",
      material: "Linen",
      gsm: 200,
      price: 18.90,
      stock: 0,
      lowStockThreshold: 75,
      moq: 30,
      unit: "yard",
      sku: "OLB-003",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400"
    },
    {
      id: 4,
      name: "Polyester Satin",
      material: "Polyester",
      gsm: 150,
      price: 8.25,
      stock: 320,
      lowStockThreshold: 150,
      moq: 100,
      unit: "yard",
      sku: "PS-004",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400"
    },
    {
      id: 5,
      name: "Wool Crepe Fabric",
      material: "Wool",
      gsm: 240,
      price: 35.60,
      stock: 125,
      lowStockThreshold: 50,
      moq: 20,
      unit: "yard",
      sku: "WCF-005",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    },
    {
      id: 6,
      name: "Denim Stretch",
      material: "Cotton Blend",
      gsm: 320,
      price: 15.40,
      stock: 280,
      lowStockThreshold: 100,
      moq: 40,
      unit: "yard",
      sku: "DS-006",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400"
    }
  ];

  // Mock orders data
  const ordersData = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customerName: "Fashion Forward Inc.",
      orderDate: "2024-08-12",
      status: "confirmed",
      totalAmount: 1250.00,
      items: [
        { name: "Premium Cotton Twill", quantity: 50, price: 12.50 },
        { name: "Silk Charmeuse Fabric", quantity: 25, price: 28.75 }
      ]
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customerName: "Boutique Styles",
      orderDate: "2024-08-13",
      status: "processing",
      totalAmount: 890.50,
      items: [
        { name: "Organic Linen Blend", quantity: 30, price: 18.90 },
        { name: "Polyester Satin", quantity: 35, price: 8.25 }
      ]
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      customerName: "Designer Collective",
      orderDate: "2024-08-14",
      status: "pending",
      totalAmount: 2150.75,
      items: [
        { name: "Wool Crepe Fabric", quantity: 40, price: 35.60 },
        { name: "Denim Stretch", quantity: 60, price: 15.40 }
      ]
    }
  ];

  // Mock analytics data
  const salesData = [
    { name: 'Jan', value: 18500 },
    { name: 'Feb', value: 22300 },
    { name: 'Mar', value: 19800 },
    { name: 'Apr', value: 25600 },
    { name: 'May', value: 21400 },
    { name: 'Jun', value: 28900 },
    { name: 'Jul', value: 24580 }
  ];

  const ordersAnalytics = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 68 },
    { name: 'Jul', value: 58 }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEditProduct = (product) => {
    console.log('Edit product:', product);
    // Implementation for editing product
  };

  const handleDuplicateProduct = (product) => {
    console.log('Duplicate product:', product);
    // Implementation for duplicating product
  };

  const handleArchiveProduct = (product) => {
    console.log('Archive product:', product);
    // Implementation for archiving product
  };

  const handleUpdateStock = (productId, newStock) => {
    console.log('Update stock:', productId, newStock);
    // Implementation for updating stock
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log('Bulk action:', action, selectedIds);
    // Implementation for bulk actions
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    console.log('Update order status:', orderId, newStatus);
    // Implementation for updating order status
  };

  const handleViewOrderDetails = (order) => {
    console.log('View order details:', order);
    // Implementation for viewing order details
  };

  const handleGenerateLabel = (order) => {
    console.log('Generate shipping label:', order);
    // Implementation for generating shipping label
  };

  const handleContactCustomer = (order) => {
    console.log('Contact customer:', order);
    // Implementation for contacting customer
  };

  const handleUpdateProfile = (profileData) => {
    console.log('Update profile:', profileData);
    // Implementation for updating profile
  };

  const handleUploadDocument = (documentType, file) => {
    console.log('Upload document:', documentType, file);
    // Implementation for uploading document
  };

  const filteredProducts = productsData?.filter(product => {
    const matchesSearch = product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         product?.material?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         product?.sku?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || 
                           product?.material?.toLowerCase() === filterCategory?.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const tabs = [
    { id: 'inventory', label: 'Inventory Management', icon: 'Package' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingBag' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="vendor" currentUser={{ name: vendorData?.contactPerson, email: vendorData?.email }} onNavigate={handleNavigation} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb onNavigate={handleNavigation} />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Vendor Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage your inventory, orders, and business analytics
              </p>
            </div>
            <Button onClick={() => console.log('Add new product')}>
              <Icon name="Plus" size={16} />
              Add Product
            </Button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard key={index} {...metric} />
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Inventory Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All Materials</option>
                    <option value="cotton">Cotton</option>
                    <option value="silk">Silk</option>
                    <option value="linen">Linen</option>
                    <option value="polyester">Polyester</option>
                    <option value="wool">Wool</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon name="Grid3X3" size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-2 ${viewMode === 'table' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon name="List" size={16} />
                    </button>
                  </div>
                  
                  <Button variant="outline">
                    <Icon name="Upload" size={16} />
                    Bulk Upload
                  </Button>
                  
                  <Button variant="outline">
                    <Icon name="Download" size={16} />
                    Export CSV
                  </Button>
                </div>
              </div>

              {/* Products Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts?.map((product) => (
                    <ProductCard
                      key={product?.id}
                      product={product}
                      onEdit={handleEditProduct}
                      onDuplicate={handleDuplicateProduct}
                      onArchive={handleArchiveProduct}
                      onUpdateStock={handleUpdateStock}
                    />
                  ))}
                </div>
              ) : (
                <InventoryTable
                  products={filteredProducts}
                  onEdit={handleEditProduct}
                  onDuplicate={handleDuplicateProduct}
                  onArchive={handleArchiveProduct}
                  onUpdateStock={handleUpdateStock}
                  onBulkAction={handleBulkAction}
                />
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Orders Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <Button variant="outline">
                    <Icon name="Filter" size={16} />
                    Filter
                  </Button>
                </div>
              </div>

              {/* Orders Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {ordersData?.map((order) => (
                  <OrderCard
                    key={order?.id}
                    order={order}
                    onUpdateStatus={handleUpdateOrderStatus}
                    onViewDetails={handleViewOrderDetails}
                    onGenerateLabel={handleGenerateLabel}
                    onContactCustomer={handleContactCustomer}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Analytics Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Business Analytics</h2>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                  <Button variant="outline">
                    <Icon name="Download" size={16} />
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  data={salesData}
                  type="line"
                  title="Monthly Revenue"
                  color="#10B981"
                />
                <AnalyticsChart
                  data={ordersAnalytics}
                  type="bar"
                  title="Monthly Orders"
                  color="#1E40AF"
                />
              </div>

              {/* Popular Products */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Selling Products</h3>
                <div className="space-y-4">
                  {productsData?.slice(0, 5)?.map((product, index) => (
                    <div key={product?.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                          <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product?.name}</p>
                          <p className="text-sm text-muted-foreground">{product?.material}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${(Math.random() * 5000 + 1000)?.toFixed(0)}</p>
                        <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 50 + 10)} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <ProfileSettings
              vendorData={vendorData}
              onUpdateProfile={handleUpdateProfile}
              onUploadDocument={handleUploadDocument}
            />
          )}
        </div>
      </main>
      {/* Quick Add Floating Button - Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button
          size="lg"
          onClick={() => console.log('Quick add product')}
          className="rounded-full w-14 h-14 shadow-elevation-3"
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default VendorDashboardInventory;