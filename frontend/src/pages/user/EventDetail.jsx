import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventAPI, bookingAPI, reviewAPI } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/common/Loading';
import StarRating from '../../components/common/StarRating';
import Modal from '../../components/common/Modal';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [seats, setSeats] = useState(1);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        fetchEventDetails();
        fetchReviews();
    }, [id]);

    const fetchEventDetails = async () => {
        try {
            const response = await eventAPI.getEventById(id);
            setEvent(response.data.event);
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await reviewAPI.getEventReviews(id);
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        try {
            const response = await bookingAPI.createBooking({
                eventId: id,
                seats: Number(seats),
            });
            alert('Booking successful! Check your email for confirmation.');
            navigate(`/user/bookings/${response.data.booking._id}`);
        } catch (error) {
            alert(error.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await reviewAPI.addReview({
                eventId: id,
                ...reviewData,
            });
            alert('Review submitted successfully!');
            setReviewModalOpen(false);
            fetchReviews();
            fetchEventDetails();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to submit review');
        }
    };

    if (loading) return <Loading />;
    if (!event) return <div className="container-custom py-12">Event not found</div>;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const totalPrice = seats * event.price;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 bg-gradient-to-br from-purple-600 to-pink-600">
                {event.images && event.images.length > 0 ? (
                    <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-50"
                    />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 container-custom pb-8">
                    <div className="text-white">
                        <span className="badge badge-primary mb-3">{event.category}</span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
                        {event.averageRating > 0 && (
                            <div className="flex items-center gap-3">
                                <StarRating rating={event.averageRating} readOnly />
                                <span className="text-white/90">
                                    ({event.reviewCount} {event.reviewCount === 1 ? 'review' : 'reviews'})
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                        </div>

                        {/* Event Details */}
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Date & Time</p>
                                        <p className="text-gray-600">{formatDate(event.date)}</p>
                                        <p className="text-gray-600">{event.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Location</p>
                                        <p className="text-gray-600">{event.venue}</p>
                                        <p className="text-gray-600">{event.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Availability</p>
                                        <p className="text-gray-600">
                                            {event.availableSeats} of {event.totalSeats} seats
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-purple-600 mr-3 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Organizer</p>
                                        <p className="text-gray-600">{event.organizer?.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="card p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Reviews</h2>
                                {isAuthenticated && user?.role === 'user' && (
                                    <button
                                        onClick={() => setReviewModalOpen(true)}
                                        className="btn-primary text-sm px-4 py-2"
                                    >
                                        Write Review
                                    </button>
                                )}
                            </div>

                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review._id} className="border-b border-gray-200 pb-4 last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <p className="font-semibold">{review.user?.name}</p>
                                                    <StarRating rating={review.rating} readOnly size="sm" />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No reviews yet</p>
                            )}
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <div className="text-center mb-6">
                                <p className="text-4xl font-bold text-purple-600 mb-2">₹{event.price}</p>
                                <p className="text-gray-600">per ticket</p>
                            </div>

                            {event.availableSeats > 0 ? (
                                <form onSubmit={handleBooking} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Seats
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max={event.availableSeats}
                                            value={seats}
                                            onChange={(e) => setSeats(e.target.value)}
                                            className="input-field"
                                        />
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between mb-2">
                                            <span>Seats</span>
                                            <span>{seats}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>Price per seat</span>
                                            <span>₹{event.price}</span>
                                        </div>
                                        <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
                                            <span>Total</span>
                                            <span className="text-purple-600">₹{totalPrice}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={bookingLoading}
                                        className="w-full btn-primary disabled:opacity-50"
                                    >
                                        {bookingLoading ? 'Processing...' : 'Book Now'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-red-600 font-semibold">Sold Out</p>
                                    <p className="text-gray-600 text-sm">No seats available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            <Modal
                isOpen={reviewModalOpen}
                onClose={() => setReviewModalOpen(false)}
                title="Write a Review"
            >
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                        </label>
                        <StarRating
                            rating={reviewData.rating}
                            onRatingChange={(rating) => setReviewData({ ...reviewData, rating })}
                            size="lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review
                        </label>
                        <textarea
                            value={reviewData.comment}
                            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                            rows="4"
                            required
                            className="input-field"
                            placeholder="Share your experience..."
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary">
                        Submit Review
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default EventDetail;
