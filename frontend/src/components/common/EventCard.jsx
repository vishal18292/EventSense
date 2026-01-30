import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const EventCard = ({ event, showStatus = false }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const getStatusBadge = () => {
        const badges = {
            pending: 'badge-warning',
            approved: 'badge-success',
            rejected: 'badge-danger',
        };
        return `badge ${badges[event.status] || 'badge-info'}`;
    };

    return (
        <Link to={`/events/${event._id}`}>
            <div className="card-hover overflow-hidden h-full">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400">
                    {event.images && event.images.length > 0 ? (
                        <img
                            src={event.images[0]}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <svg
                                className="w-16 h-16 text-white opacity-50"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="badge badge-primary backdrop-blur-sm">
                            {event.category}
                        </span>
                    </div>

                    {/* Status Badge */}
                    {showStatus && (
                        <div className="absolute top-3 right-3">
                            <span className={getStatusBadge()}>{event.status}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {event.description}
                    </p>

                    {/* Rating */}
                    {event.averageRating > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                            <StarRating rating={event.averageRating} readOnly size="sm" />
                            <span className="text-sm text-gray-600">
                                ({event.reviewCount} {event.reviewCount === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    )}

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(event.date)} at {event.time}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {event.availableSeats}/{event.totalSeats} seats available
                        </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                            <p className="text-2xl font-bold text-purple-600">₹{event.price}</p>
                            <p className="text-xs text-gray-500">per ticket</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
