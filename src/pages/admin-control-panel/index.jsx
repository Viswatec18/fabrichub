import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import VendorApplicationCard from './components/VendorApplicationCard';
import BuyerRequestCard from './components/BuyerRequestCard';
import FabricListingCard from './components/FabricListingCard';
import TransactionTable from './components/TransactionTable';
import SystemSettingsPanel from './components/SystemSettingsPanel';

const AdminControlPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for metrics
  const metricsData = [
    {
      title: "Pending Vendor Applications",
      value: "12",
      change: "+3 from last week",
      changeType: "positive",
      icon: "Building2",
      color: "warning"
    },
    {
      title: "Total Transactions",
      value: "$847,293",
      change: "+12.5% from last month",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Active Disputes",
      value: "3",
      change: "-2 from last week",
      changeType: "negative",
      icon: "AlertTriangle",
      color: "error"
    },
    {
      title: "Platform Revenue",
      value: "$42,365",
      change: "+8.2% from last month",
      changeType: "positive",
      icon: "TrendingUp",
      color: "primary"
    }
  ];

  // Mock data for vendor applications
  const vendorApplications = [
    {
      id: "VA001",
      businessName: "Premium Textiles Ltd",
      contactPerson: "Sarah Johnson",
      email: "sarah@premiumtextiles.com",
      gstNumber: "29ABCDE1234F1Z5",
      businessType: "Manufacturer",
      appliedDate: "Dec 10, 2024",
      status: "pending",
      address: "123 Industrial Area, Mumbai, Maharashtra 400001",
      phone: "+91 98765 43210",
      yearsInBusiness: 8,
      documents: [
        { name: "GST Certificate", type: "pdf" },
        { name: "Bank Details", type: "pdf" },
        { name: "Business License", type: "pdf" }
      ]
    },
    {
      id: "VA002",
      businessName: "Eco Fabrics Co",
      contactPerson: "Michael Chen",
      email: "michael@ecofabrics.com",
      gstNumber: "27FGHIJ5678K2L9",
      businessType: "Wholesaler",
      appliedDate: "Dec 8, 2024",
      status: "pending",
      address: "456 Green Street, Delhi, Delhi 110001",
      phone: "+91 87654 32109",
      yearsInBusiness: 5,
      documents: [
        { name: "GST Certificate", type: "pdf" },
        { name: "Bank Statement", type: "pdf" }
      ]
    }
  ];

  // Mock data for buyer requests
  const buyerRequests = [
    {
      id: "BR001",
      companyName: "Fashion Forward Inc",
      contactPerson: "Emily Rodriguez",
      email: "emily@fashionforward.com",
      businessType: "Fashion Brand",
      monthlyVolume: "5,000-10,000 yards",
      requestDate: "Dec 12, 2024",
      status: "pending",
      requirements: `We are a growing fashion brand specializing in sustainable clothing. We need reliable suppliers for organic cotton, linen, and hemp fabrics. Our typical orders range from 500-2000 yards per fabric type, and we prioritize quality and ethical sourcing.`
    },
    {
      id: "BR002",
      companyName: "Urban Apparel",
      contactPerson: "David Kim",
      email: "david@urbanapparel.com",
      businessType: "Garment Manufacturer",
      monthlyVolume: "15,000+ yards",
      requestDate: "Dec 11, 2024",
      status: "pending",
      requirements: `Large-scale garment manufacturer looking for consistent supply of cotton blends, polyester, and denim fabrics. We require competitive pricing and reliable delivery schedules for our production lines.`
    }
  ];

  // Mock data for fabric listings
  const fabricListings = [
    {
      id: "FL001",
      name: "Premium Cotton Blend",
      vendorName: "Textile Masters",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
      material: "Cotton Blend",
      gsm: "180 GSM",
      price: "12.50",
      moq: "500",
      category: "Cotton",
      status: "pending",
      submittedDate: "Dec 13, 2024",
      description: "High-quality cotton blend fabric perfect for casual wear. Soft texture with excellent durability and color retention. Available in multiple colors."
    },
    {
      id: "FL002",
      name: "Organic Linen",
      vendorName: "Green Fabrics",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      material: "Linen",
      gsm: "150 GSM",
      price: "18.75",
      moq: "300",
      category: "Linen",
      status: "pending",
      submittedDate: "Dec 12, 2024",
      description: "100% organic linen fabric with natural breathability and moisture-wicking properties. Ideal for summer clothing and home textiles."
    }
  ];

  // Mock data for transactions
  const transactions = [
    {
      transactionId: "TXN001234",
      date: "Dec 13, 2024",
      vendor: "Premium Textiles",
      buyer: "Fashion Forward",
      amount: "$2,450.00",
      status: "completed"
    },
    {
      transactionId: "TXN001235",
      date: "Dec 13, 2024",
      vendor: "Eco Fabrics",
      buyer: "Urban Apparel",
      amount: "$5,680.00",
      status: "processing"
    },
    {
      transactionId: "TXN001236",
      date: "Dec 12, 2024",
      vendor: "Textile Masters",
      buyer: "Style Studio",
      amount: "$1,890.00",
      status: "completed"
    },
    {
      transactionId: "TXN001237",
      date: "Dec 12, 2024",
      vendor: "Green Fabrics",
      buyer: "Modern Wear",
      amount: "$3,240.00",
      status: "failed"
    },
    {
      transactionId: "TXN001238",
      date: "Dec 11, 2024",
      vendor: "Quality Textiles",
      buyer: "Trend Setters",
      amount: "$4,120.00",
      status: "completed"
    }
  ];

  // Mock system settings
  const [systemSettings, setSystemSettings] = useState({
    platformName: "FabricHub",
    supportEmail: "support@fabrichub.com",
    commissionRate: "5",
    minimumOrderValue: "100",
    userManagement: {
      autoApproveVendors: false,
      autoApproveBuyers: false,
      requireEmailVerification: true,
      enableTwoFactor: false
    },
    contentModeration: {
      autoApproveFabrics: false,
      enableContentFiltering: true,
      requireImageModeration: true
    },
    notifications: {
      emailNewApplications: true,
      smsUrgentIssues: true,
      dailySummaryReports: true,
      weeklyAnalytics: false
    },
    paymentSettings: {
      processingFee: "2.9",
      payoutSchedule: "7",
      enableEscrow: true,
      autoReleasePayments: false
    }
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'vendors', label: 'Vendor Management', icon: 'Building2' },
    { id: 'buyers', label: 'Buyer Requests', icon: 'Users' },
    { id: 'content', label: 'Content Moderation', icon: 'Shield' },
    { id: 'financial', label: 'Financial Reports', icon: 'DollarSign' },
    { id: 'settings', label: 'System Settings', icon: 'Settings' }
  ];

  const handleVendorApprove = async (applicationId, comment) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Approved vendor application ${applicationId} with comment: ${comment}`);
    setIsLoading(false);
  };

  const handleVendorReject = async (applicationId, comment) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Rejected vendor application ${applicationId} with comment: ${comment}`);
    setIsLoading(false);
  };

  const handleBuyerApprove = async (requestId, comment) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Approved buyer request ${requestId} with comment: ${comment}`);
    setIsLoading(false);
  };

  const handleBuyerReject = async (requestId, comment) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Rejected buyer request ${requestId} with comment: ${comment}`);
    setIsLoading(false);
  };

  const handleFabricApprove = async (listingId, comment) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Approved fabric listing ${listingId} with comment: ${comment}`);
    setIsLoading(false);
  };

  const handleFabricReject = async (listingId, comment) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Rejected fabric listing ${listingId} with comment: ${comment}`);
    setIsLoading(false);
  };

  const handleExportTransactions = () => {
    console.log('Exporting transaction data...');
    // Simulate CSV export
    const csvContent = transactions?.map(t => 
      `${t?.transactionId},${t?.date},${t?.vendor},${t?.buyer},${t?.amount},${t?.status}`
    )?.join('\n');
    console.log('CSV Content:', csvContent);
  };

  const handleSaveSettings = async (newSettings) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSystemSettings(newSettings);
    console.log('Settings saved:', newSettings);
    setIsLoading(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Icon name="UserPlus" size={16} className="text-success" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">New vendor application</p>
                      <p className="text-xs text-muted-foreground">Premium Textiles Ltd applied 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Icon name="Package" size={16} className="text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">New fabric listing</p>
                      <p className="text-xs text-muted-foreground">Organic Linen submitted for review</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Icon name="DollarSign" size={16} className="text-success" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Transaction completed</p>
                      <p className="text-xs text-muted-foreground">$2,450 payment processed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('vendors')}
                    iconName="Building2"
                    iconPosition="left"
                    fullWidth
                  >
                    Review Vendor Applications
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('buyers')}
                    iconName="Users"
                    iconPosition="left"
                    fullWidth
                  >
                    Process Buyer Requests
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('content')}
                    iconName="Shield"
                    iconPosition="left"
                    fullWidth
                  >
                    Moderate Content
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('financial')}
                    iconName="DollarSign"
                    iconPosition="left"
                    fullWidth
                  >
                    View Financial Reports
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vendors':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Vendor Management</h2>
                <p className="text-muted-foreground">Review and approve vendor applications</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" iconName="Filter">
                  Filter
                </Button>
                <Button variant="outline" iconName="Download">
                  Export
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {vendorApplications?.map((application) => (
                <VendorApplicationCard
                  key={application?.id}
                  application={application}
                  onApprove={handleVendorApprove}
                  onReject={handleVendorReject}
                />
              ))}
            </div>
          </div>
        );

      case 'buyers':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Buyer Requests</h2>
                <p className="text-muted-foreground">Manage invite-only buyer access requests</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" iconName="Filter">
                  Filter
                </Button>
                <Button variant="outline" iconName="Download">
                  Export
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {buyerRequests?.map((request) => (
                <BuyerRequestCard
                  key={request?.id}
                  request={request}
                  onApprove={handleBuyerApprove}
                  onReject={handleBuyerReject}
                />
              ))}
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Content Moderation</h2>
                <p className="text-muted-foreground">Review fabric listings and reported content</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" iconName="Filter">
                  Filter
                </Button>
                <Button variant="outline" iconName="Download">
                  Export
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {fabricListings?.map((listing) => (
                <FabricListingCard
                  key={listing?.id}
                  listing={listing}
                  onApprove={handleFabricApprove}
                  onReject={handleFabricReject}
                />
              ))}
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Financial Reports</h2>
                <p className="text-muted-foreground">Transaction ledgers and revenue analytics</p>
              </div>
            </div>
            
            <TransactionTable
              transactions={transactions}
              onExport={handleExportTransactions}
            />
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
              <p className="text-muted-foreground">Configure platform settings and preferences</p>
            </div>
            
            <SystemSettingsPanel
              settings={systemSettings}
              onSave={handleSaveSettings}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Control Panel</h1>
            <p className="text-muted-foreground">
              Comprehensive platform management and oversight
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="pb-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminControlPanel;