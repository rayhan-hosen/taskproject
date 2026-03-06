import React from 'react';

/**
 * Base skeleton pulse element.
 * Usage: <Skeleton className="w-40 h-6" /> or <Skeleton className="w-full h-4 rounded-full" />
 */
export const Skeleton = ({ className = '', style }) => (
    <div
        className={`bg-gray-200 animate-pulse rounded-md ${className}`}
        style={style}
    />
);

/** Circle skeleton for avatars/logos */
export const SkeletonCircle = ({ size = 56, className = '' }) => (
    <div
        className={`bg-gray-200 animate-pulse rounded-full shrink-0 ${className}`}
        style={{ width: size, height: size }}
    />
);

/** Featured Job Card Skeleton — matches JobCard layout */
export const FeaturedJobCardSkeleton = () => (
    <div className="bg-white border border-gray-100 rounded-xl p-7 lg:p-8 flex flex-col h-full min-w-[280px] sm:min-w-0 snap-start shrink-0 w-[85vw] sm:w-auto">
        <div className="flex justify-between items-start mb-6 lg:mb-8">
            <SkeletonCircle size={48} className="lg:!w-14 lg:!h-14" />
            <Skeleton className="w-20 h-6 rounded-sm" />
        </div>
        <Skeleton className="w-3/4 h-5 mb-3" />
        <Skeleton className="w-1/2 h-3 mb-4" />
        <Skeleton className="w-full h-3 mb-2" />
        <Skeleton className="w-4/5 h-3 mb-6" />
        <div className="flex gap-2 mt-auto">
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
        </div>
    </div>
);

/** Latest Job Row Skeleton — matches LatestJobRow layout */
export const LatestJobRowSkeleton = () => (
    <div className="bg-white p-5 lg:p-8 rounded-xl border border-gray-100 flex items-start gap-4 lg:gap-6">
        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-200 animate-pulse rounded-xl shrink-0" />
        <div className="flex-1 min-w-0">
            <Skeleton className="w-3/5 h-5 mb-2" />
            <Skeleton className="w-2/5 h-3 mb-3 lg:mb-4" />
            <div className="flex gap-2">
                <Skeleton className="w-16 h-5 rounded-full" />
                <Skeleton className="w-20 h-5 rounded-full" />
            </div>
        </div>
    </div>
);

/** Job Listing Card Skeleton — matches JobCard in JobListings */
export const JobListingCardSkeleton = () => (
    <div className="bg-white border border-gray-100 rounded-xl p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
            <SkeletonCircle size={56} />
            <Skeleton className="w-20 h-7 rounded-sm" />
        </div>
        <Skeleton className="w-4/5 h-6 mb-2" />
        <Skeleton className="w-1/2 h-3 mb-4" />
        <Skeleton className="w-full h-3 mb-2" />
        <Skeleton className="w-3/4 h-3 mb-8" />
        <Skeleton className="w-full h-12 rounded-lg mt-auto" />
    </div>
);

/** Job Listing Row Skeleton — matches JobRow in JobListings */
export const JobListingRowSkeleton = () => (
    <div className="bg-white p-6 lg:p-8 rounded-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-8 flex-grow">
            <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-xl shrink-0" />
            <div className="flex-1">
                <Skeleton className="w-3/5 h-6 mb-3" />
                <div className="flex flex-wrap gap-4">
                    <Skeleton className="w-28 h-4" />
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-20 h-4" />
                </div>
            </div>
        </div>
        <Skeleton className="w-32 h-12 rounded-lg shrink-0" />
    </div>
);

/** Admin Table Row Skeleton */
export const AdminTableRowSkeleton = () => (
    <tr>
        <td className="px-8 py-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-xl shrink-0" />
                <div>
                    <Skeleton className="w-40 h-5 mb-1.5" />
                    <Skeleton className="w-24 h-3" />
                </div>
            </div>
        </td>
        <td className="px-8 py-6 hidden md:table-cell">
            <div className="flex gap-1.5 mb-1.5">
                <Skeleton className="w-16 h-4 rounded-full" />
                <Skeleton className="w-20 h-4 rounded-full" />
            </div>
            <Skeleton className="w-28 h-3" />
        </td>
        <td className="px-8 py-6">
            <div className="flex items-center justify-end gap-2">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="w-9 h-9 rounded-lg" />
            </div>
        </td>
    </tr>
);

/** Admin Application Row Skeleton */
export const AdminAppRowSkeleton = () => (
    <tr>
        <td className="px-8 py-6">
            <Skeleton className="w-36 h-5 mb-1.5" />
            <Skeleton className="w-44 h-3" />
        </td>
        <td className="px-8 py-6 hidden md:table-cell">
            <Skeleton className="w-32 h-4 mb-1" />
            <Skeleton className="w-24 h-3" />
        </td>
        <td className="px-8 py-6 hidden lg:table-cell">
            <Skeleton className="w-24 h-3" />
        </td>
        <td className="px-8 py-6">
            <div className="flex items-center justify-end gap-2">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="w-9 h-9 rounded-lg" />
            </div>
        </td>
    </tr>
);

/** Job Detail Full Page Skeleton */
export const JobDetailSkeleton = () => (
    <div className="bg-[#f8f8fd] min-h-screen pb-32">
        <div className="bg-white border-b border-gray-100">
            <div className="container py-10 lg:py-16">
                <Skeleton className="w-20 h-8 rounded-lg mb-8" />
                <div className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-200 animate-pulse rounded-2xl shrink-0" />
                    <div className="flex-1">
                        <Skeleton className="w-2/3 h-10 mb-4" />
                        <div className="flex flex-wrap gap-4 mb-6">
                            <Skeleton className="w-28 h-5" />
                            <Skeleton className="w-32 h-5" />
                            <Skeleton className="w-24 h-5" />
                        </div>
                        <div className="flex gap-3">
                            <Skeleton className="w-20 h-7 rounded-full" />
                            <Skeleton className="w-24 h-7 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                    <Skeleton className="w-40 h-8 mb-6" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-5/6 h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-full h-4 mt-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-4/5 h-4" />
                </div>
                <div>
                    <Skeleton className="w-full h-64 rounded-2xl" />
                </div>
            </div>
        </div>
    </div>
);

/** Category Section Skeleton */
export const CategoryCardSkeleton = ({ isMobile = false }) => (
    isMobile ? (
        <div className="flex items-center gap-5 p-5 border border-gray-100 rounded-lg bg-white">
            <Skeleton className="w-14 h-14 rounded-lg shrink-0" />
            <div className="flex-1">
                <Skeleton className="w-24 h-5 mb-1.5" />
                <Skeleton className="w-32 h-3" />
            </div>
            <Skeleton className="w-5 h-5 rounded shrink-0" />
        </div>
    ) : (
        <div className="p-8 border border-gray-100 rounded-lg bg-white min-h-[180px]">
            <Skeleton className="w-14 h-14 rounded-lg mb-6" />
            <Skeleton className="w-28 h-6 mb-3" />
            <div className="flex items-center justify-between">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-5 h-5 rounded" />
            </div>
        </div>
    )
);
