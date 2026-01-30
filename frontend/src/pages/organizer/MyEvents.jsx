import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventAPI } from '../../services/api';
import EventCard from '../../components/common/EventCard';
import Loading from '../../components/common/Loading';

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const fetchMyEvents = async () => {
        try {
            const response = await eventAPI.getOrganizerEvents();
            setEvents(response.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = events.filter((event) => {
        if (filter === 'all') return true;
        return event.status === filter;
    });

    const statusCounts = {
        all: events.length,
        approved: events.filter((e) => e.status === 'approved').length,
        pending: events.filter((e) => e.status === 'pending').length,
        rejected: events.filter((e) => e.status === 'rejected').length,
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Events</h1>
                        <p className="text-gray-600">Manage your created events</p>
                    </div>
                    <Link to="/organizer/create-event" className="btn-primary">
                        <svg className="w-5 h-5 inline mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        Create Event
                    </Link>
                </div>

                {/* Filter Tabs */}
                <div className="card p-2 mb-8 inline-flex gap-2">
                    {['all', 'approved', 'pending', 'rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${filter === status
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {status} ({statusCounts[status]})
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <EventCard key={event._id} event={event} showStatus={true} />
                        ))}
                    </div>
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
                            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No {filter !== 'all' ? filter : ''} events found
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filter === 'all'
                                ? 'Create your first event to get started!'
                                : `You don't have any ${filter} events.`}
                        </p>
                        <Link to="/organizer/create-event" className="btn-primary inline-block">
                            Create Event
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEvents;
