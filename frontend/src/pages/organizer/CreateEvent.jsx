import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventAPI } from '../../services/api';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Music',
        location: '',
        venue: '',
        date: '',
        time: '',
        price: '',
        totalSeats: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = [
        'Music',
        'Technology',
        'Sports',
        'Art',
        'Education',
        'Business',
        'Food',
        'Health',
        'Entertainment',
        'Other',
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await eventAPI.createEvent(formData);
            alert('Event created successfully! Waiting for admin approval.');
            navigate('/organizer/events');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom max-w-3xl">
                <div className="card p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Event</h1>
                        <p className="text-gray-600">Fill in the details to create your event</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Event Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Event Title *
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., Summer Music Festival 2026"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                className="input-field"
                                placeholder="Describe your event in detail..."
                            />
                        </div>

                        {/* Category and Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                    City/Location *
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="e.g., Mumbai"
                                />
                            </div>
                        </div>

                        {/* Venue */}
                        <div>
                            <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                                Venue Name *
                            </label>
                            <input
                                id="venue"
                                name="venue"
                                type="text"
                                required
                                value={formData.venue}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., Phoenix Marketcity"
                            />
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Date *
                                </label>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="input-field"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Time *
                                </label>
                                <input
                                    id="time"
                                    name="time"
                                    type="time"
                                    required
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {/* Price and Total Seats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                    Ticket Price (₹) *
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="e.g., 999"
                                />
                            </div>

                            <div>
                                <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Seats *
                                </label>
                                <input
                                    id="totalSeats"
                                    name="totalSeats"
                                    type="number"
                                    required
                                    min="1"
                                    value={formData.totalSeats}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="e.g., 500"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Event...' : 'Create Event'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/organizer/dashboard')}
                                className="btn-outline"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                    {/* Info Note */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> Your event will be pending approval by the admin. You will be notified once it's approved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
