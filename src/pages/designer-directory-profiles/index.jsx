import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DesignerFilters from './components/DesignerFilters';
import DesignerCard from './components/DesignerCard';
import DesignerListView from './components/DesignerListView';
import DesignerProfile from './components/DesignerProfile';
import ContactModal from './components/ContactModal';
import SortingControls from './components/SortingControls';
import { useAuth } from '../../contexts/AuthContext';
import { getDesigners, getDesignerById, sendContactMessage } from '../../services/designerService';

const DesignerDirectoryProfiles = () => {
  const navigate = useNavigate();
  const { user, userProfile, loading: authLoading } = useAuth();

  // State management
  const [filters, setFilters] = useState({
    searchQuery: '',
    specialties: [],
    experienceLevels: [],
    locations: [],
    availability: [],
    minRating: 0,
    priceRange: { min: 0, max: 0 }
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactDesigner, setContactDesigner] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [designers, setDesigners] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const designersPerPage = 12;

  // Load designers from Supabase
  const loadDesigners = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filterParams = {
        search: filters?.searchQuery || undefined,
        specialties: filters?.specialties?.length > 0 ? filters?.specialties : undefined,
        location: filters?.locations?.length > 0 ? filters?.locations?.[0] : undefined,
        sortBy: sortBy === 'relevance' ? 'rating' : sortBy,
        page: currentPage,
        itemsPerPage: designersPerPage
      };

      const { data, count } = await getDesigners(filterParams);
      
      // Transform data to match component expectations
      const transformedDesigners = data?.map(designer => ({
        id: designer?.id,
        name: designer?.name,
        title: `${designer?.experience_level === 'expert' ? 'Senior' : 'Professional'} Fashion Designer`,
        location: designer?.location,
        profileImage: designer?.portfolio_images?.[0] || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
        rating: designer?.rating || 4.5,
        reviewCount: Math.floor(Math.random() * 200) + 50,
        specializations: designer?.specialties || ['Fashion Design'],
        bio: designer?.bio || 'Professional fashion designer with expertise in creating unique designs.',
        fullBio: designer?.bio || 'Professional fashion designer with expertise in creating unique designs.',
        hourlyRate: designer?.hourly_rate || 85,
        projectsCompleted: Math.floor(Math.random() * 300) + 50,
        experience: designer?.years_experience || 5,
        responseTime: "2-4 hours",
        availability: designer?.available ? 'available' : 'busy',
        hasRecentWork: true,
        portfolioImages: designer?.designer_portfolios?.map(p => p?.image_url) || [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
          "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400"
        ],
        // Add other properties needed by components
        credentials: [
          { title: "Fashion Design Degree", institution: "Design Institute", year: "2015" }
        ],
        skills: designer?.specialties || ['Fashion Design'],
        languages: [
          { name: "English", level: "Fluent" }
        ],
        portfolioProjects: designer?.designer_portfolios?.map(p => ({
          title: p?.title || 'Design Project',
          description: p?.description || 'Professional design work',
          image: p?.image_url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
          category: "Fashion Design",
          year: new Date(p?.project_date)?.getFullYear()?.toString() || "2024"
        })) || [],
        services: [
          {
            name: "Custom Fashion Design",
            description: "Complete fashion design service from concept to final pattern",
            price: designer?.hourly_rate ? designer?.hourly_rate * 15 : 1200,
            deliveryTime: "2-3 weeks",
            revisions: 3
          }
        ],
        reviews: [],
        availableSlots: Array.from({ length: 35 }, (_, i) => ({
          date: i + 1,
          available: Math.random() > 0.3
        }))
      })) || [];

      setDesigners(transformedDesigners);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error loading designers:', error);
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        setError('Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.');
      } else {
        setError('Failed to load designers. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDesigners();
  }, [filters, sortBy, currentPage]);

  // Filter and sort designers (now works with real data)
  const getFilteredDesigners = () => {
    let filtered = [...designers];

    // Apply additional client-side filters if needed
    if (filters?.experienceLevels?.length > 0) {
      filtered = filtered?.filter(designer => {
        return filters?.experienceLevels?.some(level => {
          switch (level) {
            case 'entry': return designer?.experience >= 1 && designer?.experience <= 3;
            case 'mid': return designer?.experience >= 4 && designer?.experience <= 7;
            case 'senior': return designer?.experience >= 8 && designer?.experience <= 15;
            case 'expert': return designer?.experience > 15;
            default: return false;
          }
        });
      });
    }

    if (filters?.availability?.length > 0) {
      filtered = filtered?.filter(designer =>
        filters?.availability?.includes(designer?.availability) ||
        (filters?.availability?.includes('immediate') && designer?.availability === 'available')
      );
    }

    if (filters?.minRating > 0) {
      filtered = filtered?.filter(designer => designer?.rating >= filters?.minRating);
    }

    if (filters?.priceRange?.min > 0 || filters?.priceRange?.max > 0) {
      filtered = filtered?.filter(designer => {
        if (filters?.priceRange?.min > 0 && designer?.hourlyRate < filters?.priceRange?.min) return false;
        if (filters?.priceRange?.max > 0 && designer?.hourlyRate > filters?.priceRange?.max) return false;
        return true;
      });
    }

    return filtered;
  };

  const filteredDesigners = getFilteredDesigners();
  const totalPages = Math.ceil(totalCount / designersPerPage);
  const currentDesigners = filteredDesigners;

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      specialties: [],
      experienceLevels: [],
      locations: [],
      availability: [],
      minRating: 0,
      priceRange: { min: 0, max: 0 }
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handleViewProfile = async (designerId) => {
    try {
      const designer = await getDesignerById(designerId);
      if (designer) {
        // Transform the detailed designer data
        const transformedDesigner = {
          ...designers?.find(d => d?.id === designerId),
          // Add any additional details from the full profile
          fullBio: designer?.bio,
          portfolioProjects: designer?.designer_portfolios?.map(p => ({
            title: p?.title || 'Design Project',
            description: p?.description || 'Professional design work',
            image: p?.image_url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
            category: "Fashion Design",
            year: new Date(p?.project_date)?.getFullYear()?.toString() || "2024"
          })) || [],
          reviews: designer?.designer_reviews?.map(r => ({
            clientName: r?.client_name || 'Anonymous',
            clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            rating: r?.rating || 5,
            comment: r?.review_text || 'Great work!',
            projectType: 'Design Project',
            date: new Date(r?.created_at)?.toLocaleDateString() || 'Recently'
          })) || []
        };
        setSelectedDesigner(transformedDesigner);
      }
    } catch (error) {
      console.error('Error loading designer profile:', error);
      setError('Failed to load designer profile');
    }
  };

  const handleContact = (designerId, message = null) => {
    const designer = designers?.find(d => d?.id === designerId);
    setContactDesigner(designer);
    setShowContactModal(true);
  };

  const handleSendMessage = async (designerId, messageData) => {
    try {
      if (!user) {
        setError('Please sign in to send messages');
        return { success: false };
      }

      const contactData = {
        designer_id: designerId,
        client_name: messageData?.name || userProfile?.full_name || 'Anonymous',
        client_email: messageData?.email || user?.email,
        client_phone: messageData?.phone || '',
        message: messageData?.message,
        project_budget: messageData?.budget ? parseFloat(messageData?.budget) : null,
        project_timeline: messageData?.timeline || null
      };

      await sendContactMessage(contactData);
      setShowContactModal(false);
      setContactDesigner(null);
      
      return { success: true };
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
      return { success: false };
    }
  };

  const handleBookConsultation = (designerId) => {
    console.log('Booking consultation with designer:', designerId);
    // Here you would typically handle the booking process
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userProfile?.role || 'buyer'} 
        currentUser={user ? { 
          name: userProfile?.full_name || user?.email?.split('@')?.[0] || 'User',
          email: user?.email 
        } : null} 
        onNavigate={handleNavigation}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb onNavigate={handleNavigation} />
          
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0" />
                <p className="text-error font-medium">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="ml-auto text-error hover:text-error/80"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          )}
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Designer Directory</h1>
                <p className="text-muted-foreground">
                  Connect with talented fashion designers and textile experts for your custom projects
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{totalCount}</div>
                  <div className="text-sm text-muted-foreground">Designers Available</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <DesignerFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sorting Controls */}
              <div className="mb-6">
                <SortingControls
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  totalResults={totalCount}
                />
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-muted-foreground">Loading designers...</span>
                  </div>
                </div>
              )}

              {/* No Results */}
              {!isLoading && currentDesigners?.length === 0 && !error && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No designers found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find more designers.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Designers Grid/List */}
              {!isLoading && currentDesigners?.length > 0 && (
                <>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                      {currentDesigners?.map((designer) => (
                        <DesignerCard
                          key={designer?.id}
                          designer={designer}
                          onViewProfile={handleViewProfile}
                          onContact={handleContact}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6 mb-8">
                      {currentDesigners?.map((designer) => (
                        <DesignerListView
                          key={designer?.id}
                          designer={designer}
                          onViewProfile={handleViewProfile}
                          onContact={handleContact}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <Icon name="ChevronLeft" size={16} />
                        Previous
                      </Button>
                      
                      <div className="flex items-center space-x-1">
                        {[...Array(Math.min(5, totalPages))]?.map((_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className="w-10"
                            >
                              {page}
                            </Button>
                          );
                        })}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <Icon name="ChevronRight" size={16} />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Designer Profile Modal */}
      {selectedDesigner && (
        <DesignerProfile
          designer={selectedDesigner}
          onClose={() => setSelectedDesigner(null)}
          onContact={handleContact}
          onBookConsultation={handleBookConsultation}
        />
      )}

      {/* Contact Modal */}
      {showContactModal && contactDesigner && (
        <ContactModal
          designer={contactDesigner}
          isOpen={showContactModal}
          onClose={() => {
            setShowContactModal(false);
            setContactDesigner(null);
          }}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* Quick Contact Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="default"
          size="lg"
          className="rounded-full shadow-elevation-3"
          iconName="MessageCircle"
          onClick={() => {
            // Show quick contact options or scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="hidden sm:inline ml-2">Quick Contact</span>
        </Button>
      </div>
    </div>
  );
};

export default DesignerDirectoryProfiles;