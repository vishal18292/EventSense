import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const ApproveEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingEvents();
    }, []);

    const fetchPendingEvents = async () => {
        try {
            const response = await adminAPI.getPendingEvents();
            setEvents(response.data.events);
        } catch (error) {
            console.error('Error fetching pending events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (eventId) => {
        if (!confirm('Are you sure you want to approve this event?')) return;

        try {
            await adminAPI.updateEventStatus(eventId, 'approved');
            alert('Event approved successfully!');
            fetchPendingEvents();
        } catch (error) {
            alert('Failed to approve event');
        }
    };

    const handleReject = async (eventId) => {
        if (!confirm('Are you sure you want to reject this event?')) return;

        try {
            await adminAPI.updateEventStatus(eventId, 'rejected');
            alert('Event rejected');
            fetchPendingEvents();
        } catch (error) {
            alert('Failed to reject event');
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Approve Events</h1>
                    <p className="text-gray-600">Review and approve pending events</p>
                </div>

                {events.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {events.map((event) => (
                            <div key={event._id} className="card p-6">
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    {/* Event Image */}
                                    <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg overflow-hidden flex-shrink-0">
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
                                    </div>

                                    {/* Event Details */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{event.title}</h2>
                                                <span className="badge badge-primary">{event.category}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center text-sm">
                                                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <div>
                                                    <p className="text-gray-600">Date</p>
                                                    <p className="font-semibold">{formatDate(event.date)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center text-sm">
                                                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-gray-600">Location</p>
                                                    <p className="font-semibold">{event.location}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center text-sm">
                                                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <div>
                                                    <p className="text-gray-600">Organizer</p>
                                                    <p className="font-semibold">{event.organizer?.name}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div>
                                                <p className="text-sm text-gray-600">Ticket Price</p>
                                                <p className="text-2xl font-bold text-purple-600">₹{event.price}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-600">Total Seats</p>
                                                <p className="text-2xl font-bold">{event.totalSeats}</p>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleApprove(event._id)}
                                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                                                >
                                                    ✓ Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(event._id)}
                                                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                                                >
                                                    ✗ Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No pending events
                        </h3>
                        <p className="text-gray-600">All events have been reviewed</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApproveEvents;
