import Review from '../models/Review.js';
import Event from '../models/Event.js';
import Booking from '../models/Booking.js';

// @desc    Add review for an event
// @route   POST /api/reviews
// @access  Private (User)
export const addReview = async (req, res) => {
    try {
        const { eventId, rating, comment } = req.body;

        // Check if event exists
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user has booked this event
        const hasBooked = await Booking.findOne({
            user: req.user._id,
            event: eventId,
            status: 'confirmed',
        });

        if (!hasBooked) {
            return res.status(400).json({
                message: 'You can only review events you have booked',
            });
        }

        // Check if user already reviewed this event
        const existingReview = await Review.findOne({
            user: req.user._id,
            event: eventId,
        });

        if (existingReview) {
            return res.status(400).json({
                message: 'You have already reviewed this event',
            });
        }

        // Create review
        const review = await Review.create({
            user: req.user._id,
            event: eventId,
            rating,
            comment,
        });

        await review.populate('user', 'name profileImage');

        // Update event's average rating and review count
        const reviews = await Review.find({ event: eventId });
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        event.averageRating = totalRating / reviews.length;
        event.reviewCount = reviews.length;
        await event.save();

        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            review,
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'You have already reviewed this event',
            });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get reviews for an event
// @route   GET /api/reviews/event/:eventId
// @access  Public
export const getEventReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ event: req.params.eventId })
            .populate('user', 'name profileImage')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: reviews.length,
            reviews,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
