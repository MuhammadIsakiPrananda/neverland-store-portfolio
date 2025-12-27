import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skeleton Loader Component
 * Provides smooth loading states for content
 */

const SkeletonCard = () => (
  <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 p-5 animate-fade-in">
    {/* Image Skeleton */}
    <div className="w-full h-48 skeleton mb-4 rounded-xl" />
    
    {/* Title Skeleton */}
    <div className="h-6 skeleton mb-3 rounded w-3/4" />
    
    {/* Description Skeleton */}
    <div className="space-y-2 mb-4">
      <div className="h-4 skeleton rounded w-full" />
      <div className="h-4 skeleton rounded w-5/6" />
    </div>
    
    {/* Stats Skeleton */}
    <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
      <div className="h-4 skeleton rounded w-16" />
      <div className="h-4 skeleton rounded w-16" />
      <div className="h-6 skeleton rounded w-20" />
    </div>
  </div>
);

const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-3">
    {[...Array(lines)].map((_, index) => (
      <div 
        key={index}
        className="h-4 skeleton rounded"
        style={{ width: `${100 - (index * 10)}%` }}
      />
    ))}
  </div>
);

const SkeletonAvatar = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`${sizeClasses[size]} skeleton rounded-full`} />
  );
};

const SkeletonButton = () => (
  <div className="h-12 skeleton rounded-lg w-32" />
);

const SkeletonList = ({ items = 5 }) => (
  <div className="space-y-4">
    {[...Array(items)].map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <SkeletonAvatar size="md" />
        <div className="flex-1">
          <div className="h-4 skeleton rounded w-1/3 mb-2" />
          <div className="h-3 skeleton rounded w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

// Main export with all variants
const SkeletonLoader = {
  Card: SkeletonCard,
  Text: SkeletonText,
  Avatar: SkeletonAvatar,
  Button: SkeletonButton,
  List: SkeletonList,
};

// PropTypes
SkeletonText.propTypes = {
  lines: PropTypes.number,
};

SkeletonAvatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

SkeletonList.propTypes = {
  items: PropTypes.number,
};

export default SkeletonLoader;
