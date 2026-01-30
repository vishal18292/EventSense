import Event from '../models/Event.js';
import Booking from '../models/Booking.js';

// @desc    Get organizer dashboard analytics
// @route   GET /api/organizer/analytics
// @access  Private (Organizer)
export const getOrganizerAnalytics = async (req, res) => {
    try {
        // Get all organizer's events
        const events = await Event.find({ organizer: req.user._id });

        const eventIds = events.map((event) => event._id);

        // Get all bookings for organizer's events
        const bookings = await Booking.find({
            event: { $in: eventIds },
            status: 'confirmed',
        }).populate('event', 'title price');

        // Calculate total revenue
        const totalRevenue = bookings.reduce(
            (sum, booking) => sum + booking.totalAmount,
            0
        );

        // Calculate total bookings
        const totalBookings = bookings.length;

        // Total seats sold
        const totalSeats = bookings.reduce((sum, booking) => sum + booking.seats, 0);

        // Event-wise analytics
        const eventAnalytics = events.map((event) => {
            const eventBookings = bookings.filter(
                (b) => b.event._id.toString() === event._id.toString()
            );

            const revenue = eventBookings.reduce((sum, b) => sum + b.totalAmount, 0);
            const seatsSold = eventBookings.reduce((sum, b) => sum + b.seats, 0);

            return {
                eventId: event._id,
                title: event.title,
                date: event.date,
                totalSeats: event.totalSeats,
                availableSeats: event.availableSeats,
                seatsSold,
                bookingCount: eventBookings.length,
                revenue,
                status: event.status,
            };
        });

        // Events by status
        const pendingEvents = events.filter((e) => e.status === 'pending').length;
        const approvedEvents = events.filter((e) => e.status === 'approved').length;
        const rejectedEvents = events.filter((e) => e.status === 'rejected').length;

        // Revenue by month (last 6 months)
        const monthlyRevenue = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            const monthBookings = bookings.filter((b) => {
                const bookingDate = new Date(b.createdAt);
                return bookingDate >= monthStart && bookingDate <= monthEnd;
            });

            const revenue = monthBookings.reduce((sum, b) => sum + b.totalAmount, 0);

            monthlyRevenue.push({
                month: date.toLocaleString('default', { month: 'short' }),
                revenue,
                bookings: monthBookings.length,
            });
        }

        res.json({
            success: true,
            analytics: {
                summary: {
                    totalEvents: events.length,
                    pendingEvents,
                    approvedEvents,
                    rejectedEvents,
                    totalBookings,
                    totalRevenue,
                    totalSeats,
                },
                eventAnalytics,
                monthlyRevenue,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
