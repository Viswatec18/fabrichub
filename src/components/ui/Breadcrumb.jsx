import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ customItems = null, onNavigate = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const getRouteMapping = () => {
    return {
      '/': { label: 'Home', icon: 'Home' },
      '/fabric-catalog-browse': { label: 'Catalog', icon: 'Search' },
      '/fabric-product-detail': { label: 'Product Details', icon: 'Package' },
      '/shopping-cart-checkout': { label: 'Cart & Checkout', icon: 'ShoppingCart' },
      '/order-management-dashboard': { label: 'Orders', icon: 'Package' },
      '/vendor-dashboard-inventory': { label: 'Vendor Dashboard', icon: 'BarChart3' },
      '/designer-directory-profiles': { label: 'Designers', icon: 'Users' },
      '/admin-control-panel': { label: 'Admin Panel', icon: 'Settings' },
      '/login-registration': { label: 'Login', icon: 'LogIn' },
      '/profile': { label: 'Profile', icon: 'User' },
      '/settings': { label: 'Settings', icon: 'Settings' }
    };
  };

  const generateBreadcrumbItems = () => {
    if (customItems) {
      return customItems;
    }

    const routeMapping = getRouteMapping();
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    
    // Always start with home
    const items = [
      {
        label: 'Home',
        path: '/fabric-catalog-browse',
        icon: 'Home',
        isActive: false
      }
    ];

    // Build breadcrumb path
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMapping?.[currentPath];
      
      if (routeInfo) {
        items?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isActive: index === pathSegments?.length - 1
        });
      }
    });

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  // Don't render breadcrumb on login page or if only home item
  if (location?.pathname === '/login-registration' || breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 py-4 text-sm" aria-label="Breadcrumb">
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-muted-foreground flex-shrink-0" 
            />
          )}
          
          {item?.isActive ? (
            <span className="flex items-center space-x-1.5 text-foreground font-medium">
              <Icon name={item?.icon} size={14} />
              <span className="truncate">{item?.label}</span>
            </span>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground p-1.5 h-auto min-w-0"
            >
              <Icon name={item?.icon} size={14} className="flex-shrink-0" />
              <span className="truncate">{item?.label}</span>
            </Button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;