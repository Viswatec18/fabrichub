import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewSection = ({ productId }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const reviews = [
    {
      id: 1,
      userName: 'Sarah Johnson',
      userAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5,
      date: '2025-01-10',
      title: 'Excellent Quality Fabric',
      comment: `Outstanding quality cotton blend! The fabric feels premium and the color is exactly as shown in the photos. Perfect for our fashion line. The vendor was very responsive and shipping was fast. Will definitely order again.`,
      helpful: 12,
      verified: true,
      images: [
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop'
      ]
    },
    {
      id: 2,
      userName: 'Michael Chen',
      userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4,
      date: '2025-01-08',
      title: 'Good Value for Money',
      comment: `Solid fabric quality for the price point. The GSM is as advertised and the weave is consistent. Slight color variation from the sample but within acceptable range. Good for bulk orders.`,
      helpful: 8,
      verified: true,
      images: []
    },
    {
      id: 3,
      userName: 'Emma Rodriguez',
      userAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 5,
      date: '2025-01-05',
      title: 'Perfect for Our Project',
      comment: `This fabric exceeded our expectations! The texture is smooth and the drape is beautiful. Used it for a high-end fashion collection and received great feedback from clients.`,
      helpful: 15,
      verified: true,
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop'
      ]
    },
    {
      id: 4,
      userName: 'David Kim',
      userAvatar: 'https://randomuser.me/api/portraits/men/33.jpg',
      rating: 3,
      date: '2025-01-03',
      title: 'Average Quality',
      comment: `The fabric is okay but not exceptional. Some inconsistencies in the weave pattern. Shipping took longer than expected. Would consider other options next time.`,
      helpful: 3,
      verified: false,
      images: []
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 65 },
    { stars: 4, count: 18, percentage: 26 },
    { stars: 3, count: 4, percentage: 6 },
    { stars: 2, count: 2, percentage: 3 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const averageRating = 4.5;
  const totalReviews = 69;

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 2);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating
            ? 'text-warning fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Rating */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-foreground">{averageRating}</div>
          <div className="flex items-center justify-center space-x-1">
            {renderStars(Math.floor(averageRating))}
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {totalReviews} reviews
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2 space-y-2">
          {ratingDistribution?.map((item) => (
            <div key={item?.stars} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-12">
                <span className="text-sm text-foreground">{item?.stars}</span>
                <Icon name="Star" size={12} className="text-warning fill-current" />
              </div>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-warning h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8">
                {item?.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Customer Reviews ({totalReviews})
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="border border-border rounded-lg p-6 space-y-4">
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={review?.userAvatar}
                  alt={review?.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{review?.userName}</span>
                    {review?.verified && (
                      <span className="flex items-center space-x-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                        <Icon name="BadgeCheck" size={12} />
                        <span>Verified Purchase</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review?.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">{review?.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {review?.comment}
              </p>

              {/* Review Images */}
              {review?.images?.length > 0 && (
                <div className="flex space-x-2">
                  {review?.images?.map((image, index) => (
                    <div key={index} className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="ThumbsUp" size={14} />
                  <span>Helpful ({review?.helpful})</span>
                </button>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Reply
                </button>
              </div>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Flag" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Reviews */}
      {!showAllReviews && reviews?.length > 2 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(true)}
          >
            Show All Reviews ({reviews?.length})
          </Button>
        </div>
      )}
      {/* Write Review Button */}
      <div className="text-center pt-6 border-t border-border">
        <Button iconName="Edit" iconPosition="left">
          Write a Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewSection;