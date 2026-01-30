import Event from '../models/Event.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import { sendEmail } from '../utils/emailService.js';
import { eventApprovalTemplate } from '../utils/emailTemplates.js';

// @desc    Get admin dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin)
export const getAdminAnalytics = async (req, res) => {
    try {
        // Total users
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalOrganizers = await User.countDocuments({ role: 'organizer' });

        // Total events
        const totalEvents = await Event.countDocuments();
        const pendingEvents = await Event.countDocuments({ status: 'pending' });
        const approvedEvents = await Event.countDocuments({ status: 'approved' });
        const rejectedEvents = await Event.countDocuments({ status: 'rejected' });

        // Total bookings
        const totalBookings = await Booking.countDocuments();
        const bookings = await Booking.find();
        const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

        // Events by category
        const eventsByCategory = await Event.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // Recent bookings
        const recentBookings = await Booking.find()
            .populate('user', 'name email')
            .populate('event', 'title date')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            success: true,
            analytics: {
                users: {
                    total: totalUsers,
                    organizers: totalOrganizers,
                },
                events: {
                    total: totalEvents,
                    pending: pendingEvents,
                    approved: approvedEvents,
                    rejected: rejectedEvents,
                },
                bookings: {
                    total: totalBookings,
                    totalRevenue,
                },
                eventsByCategory,
                recentBookings,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Approve or reject event
// @route   PATCH /api/admin/events/:id/status
// @access  Private (Admin)
export const updateEventStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const event = await Event.findById(req.params.id).populate(
            'organizer',
            'name email'
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.status = status;
        await event.save();

        // Send email to organizer
        if (status === 'approved') {
            await sendEmail({
                email: event.organizer.email,
                subject: 'Event Approved - EventSense',
                html: eventApprovalTemplate({ title: event.title }),
            });
        }

        res.json({
            success: true,
            message: `Event ${status} successfully`,
            event,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all pending events
// @route   GET /api/admin/events/pending
// @access  Private (Admin)
export const getPendingEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: 'pending' })
            .populate('organizer', 'name email')
            .sort({ createdAt: -1 });

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
