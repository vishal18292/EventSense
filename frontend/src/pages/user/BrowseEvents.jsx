import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { eventAPI } from '../../services/api';
import EventCard from '../../components/common/EventCard';
import Loading from '../../components/common/Loading';

const BrowseEvents = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || 'all',
        location: searchParams.get('location') || '',
        sortBy: searchParams.get('sortBy') || 'latest',
    });

    useEffect(() => {
        fetchEvents();
    }, [filters]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const params = {
                search: filters.search || undefined,
                category: filters.category !== 'all' ? filters.category : undefined,
                location: filters.location || undefined,
                sortBy: filters.sortBy,
            };
            const response = await eventAPI.getEvents(params);
            setEvents(response.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        // Update URL params
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((k) => {
            if (newFilters[k] && newFilters[k] !== 'all') {
                params.set(k, newFilters[k]);
            }
        });
        setSearchParams(params);
    };

    const categories = [
        'all',
        'Music',
        'Technology',
        'Sports',
        'Art',
        'Education',
        'Business',
        'Food',
        'Health',
        'Entertainment',
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Events</h1>
                    <p className="text-gray-600">Find your next amazing experience</p>
                </div>

                {/* Filters */}
                <div className="card p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                placeholder="Search events..."
                                className="input-field"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="input-field"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={filters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                                placeholder="Enter location..."
                                className="input-field"
                            />
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="input-field"
                            >
                                <option value="latest">Latest</option>
                                <option value="popular">Most Popular</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="date">Event Date</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <Loading fullScreen={false} />
                ) : events.length > 0 ? (
                    <>
                        <div className="mb-4">
                            <p className="text-gray-600">
                                Found {events.length} {events.length === 1 ? 'event' : 'events'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="card p-12 text-center">
                        <svg
                            className="w-20 h-20 text-gray-400 mx-auto mb-4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No events found
                        </h3>
                        <p className="text-gray-600">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseEvents;
