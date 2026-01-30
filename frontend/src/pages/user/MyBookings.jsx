import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await bookingAPI.getUserBookings();
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
                    <p className="text-gray-600">View and manage your event bookings</p>
                </div>

                {bookings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((booking) => (
                            <Link
                                key={booking._id}
                                to={`/user/bookings/${booking._id}`}
                                className="card p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {booking.event?.title}
                                            </h3>
                                            <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-danger'}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{formatDate(booking.event?.date)}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>{booking.event?.location}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                                </svg>
                                                <span>{booking.seats} {booking.seats === 1 ? 'seat' : 'seats'}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 text-sm text-gray-500">
                                            Booking Reference: <span className="font-mono font-semibold">{booking.bookingReference}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-0 md:ml-6 text-right">
                                        <p className="text-3xl font-bold text-purple-600">₹{booking.totalAmount}</p>
                                        <button className="mt-2 text-purple-600 hover:text-purple-700 font-medium">
                                            View Details →
                                        </button>
                                    </div>
                                </div>
                            </Link>
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
                            <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No bookings yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Start exploring events and book your first ticket!
                        </p>
                        <Link to="/events" className="btn-primary inline-block">
                            Browse Events
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
