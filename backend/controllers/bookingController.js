import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { generateQRCode } from '../utils/qrCode.js';
import { sendEmail } from '../utils/emailService.js';
import { bookingConfirmationTemplate } from '../utils/emailTemplates.js';

// Generate unique booking reference
const generateBookingReference = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `ES-${timestamp}-${randomStr}`.toUpperCase();
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (User)
export const createBooking = async (req, res) => {
    try {
        const { eventId, seats } = req.body;

        // Get event
        const event = await Event.findById(eventId).populate('organizer', 'name email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if event is approved
        if (event.status !== 'approved') {
            return res.status(400).json({ message: 'Event is not approved yet' });
        }

        // Check seat availability
        if (event.availableSeats < seats) {
            return res.status(400).json({
                message: `Only ${event.availableSeats} seats available`,
            });
        }

        // Calculate total amount
        const totalAmount = event.price * seats;

        // Generate booking reference
        const bookingReference = generateBookingReference();

        // Generate QR code
        const qrCodeData = await generateQRCode({
            bookingReference,
            eventTitle: event.title,
            userName: req.user.name,
            seats,
            date: event.date.toDateString(),
        });

        // Create booking
        const booking = await Booking.create({
            user: req.user._id,
            event: eventId,
            seats,
            totalAmount,
            qrCode: qrCodeData,
            bookingReference,
        });

        // Update event seats and booking count
        event.availableSeats -= seats;
        event.bookingCount += 1;
        await event.save();

        // Populate booking data for response
        await booking.populate('user', 'name email');
        await booking.populate('event');

        // Send confirmation email (Fire and forget, don't block response)
        try {
            const ticketUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/user/bookings/${booking._id}`;

            // qrCodeData is a Data URL (data:image/png;base64,...). 
            // We can pass it directly to nodemailer attachment with 'path' property

            const emailData = {
                email: req.user.email,
                subject: 'Booking Confirmation - EventSense',
                html: bookingConfirmationTemplate({
                    userName: req.user.name,
                    bookingReference,
                    eventTitle: event.title,
                    eventDate: new Date(event.date).toDateString(),
                    eventTime: event.time,
                    venue: event.venue,
                    seats,
                    totalAmount,
                    ticketUrl, // Pass dynamic URL
                }),
                attachments: [
                    {
                        filename: 'qrcode.png',
                        path: qrCodeData, // Nodemailer supports data URI here
                        cid: 'qrcode' // Same cid value as in the html img src
                    }
                ]
            };

            await sendEmail(emailData);
        } catch (emailError) {
            console.error('Failed to send booking confirmation email:', emailError);
            // Continue without failing the request
        }

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private (User)
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('event')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: bookings.length,
            bookings,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private (User - own bookings only)
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('event');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if user owns this booking
        if (booking.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this booking' });
        }

        res.json({
            success: true,
            booking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get bookings for organizer's events
// @route   GET /api/bookings/organizer/event/:eventId
// @access  Private (Organizer)
export const getEventBookings = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Check if event exists and belongs to organizer
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view these bookings' });
        }

        const bookings = await Booking.find({ event: eventId })
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: bookings.length,
            bookings,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
