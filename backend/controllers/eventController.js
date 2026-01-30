import Event from '../models/Event.js';
import Review from '../models/Review.js';

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Organizer)
export const createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            organizer: req.user._id,
            status: 'pending', // All events start as pending
        };

        const event = await Event.create(eventData);

        res.status(201).json({
            success: true,
            message: 'Event created successfully. Waiting for admin approval.',
            event,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all approved events (with filters)
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
    try {
        const { search, category, location, minPrice, maxPrice, sortBy } = req.query;

        // Build query
        let query = { status: 'approved' };

        // Search by title or description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Filter by category
        if (category && category !== 'all') {
            query.category = category;
        }

        // Filter by location
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sort options
        let sortOptions = {};
        switch (sortBy) {
            case 'popular':
                sortOptions = { bookingCount: -1 };
                break;
            case 'price-low':
                sortOptions = { price: 1 };
                break;
            case 'price-high':
                sortOptions = { price: -1 };
                break;
            case 'date':
                sortOptions = { date: 1 };
                break;
            case 'rating':
                sortOptions = { averageRating: -1 };
                break;
            default:
                sortOptions = { createdAt: -1 };
        }

        const events = await Event.find(query)
            .populate('organizer', 'name email')
            .sort(sortOptions);

        res.json({
            success: true,
            count: events.length,
            events,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate(
            'organizer',
            'name email phone'
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({
            success: true,
            event,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Organizer - own events only)
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is the organizer
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this event' });
        }

        // Update event
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Event updated successfully',
            event: updatedEvent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Organizer - own events only)
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is the organizer
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Event deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get organizer's events
// @route   GET /api/events/organizer/myevents
// @access  Private (Organizer)
export const getOrganizerEvents = async (req, res) => {
    try {
        const events = await Event.find({ organizer: req.user._id }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            count: events.length,
            events,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get recommended events for user
// @route   GET /api/events/recommended
// @access  Private
export const getRecommendedEvents = async (req, res) => {
    try {
        const user = req.user;

        // Get user's preferences
        const { categories, locations } = user.preferences || {};

        let query = { status: 'approved' };

        // Build recommendation query based on preferences
        if (categories && categories.length > 0) {
            query.category = { $in: categories };
        }

        if (locations && locations.length > 0) {
            query.location = { $in: locations };
        }

        const recommendedEvents = await Event.find(query)
            .populate('organizer', 'name email')
            .sort({ averageRating: -1, bookingCount: -1 })
            .limit(6);

        res.json({
            success: true,
            count: recommendedEvents.length,
            events: recommendedEvents,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
