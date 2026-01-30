import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide event title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide event description'],
        },
        category: {
            type: String,
            required: [true, 'Please provide event category'],
            enum: [
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
            ],
        },
        location: {
            type: String,
            required: [true, 'Please provide event location'],
        },
        venue: {
            type: String,
            required: [true, 'Please provide venue name'],
        },
        date: {
            type: Date,
            required: [true, 'Please provide event date'],
        },
        time: {
            type: String,
            required: [true, 'Please provide event time'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide ticket price'],
            min: 0,
        },
        totalSeats: {
            type: Number,
            required: [true, 'Please provide total seats'],
            min: 1,
        },
        availableSeats: {
            type: Number,
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        bookingCount: {
            type: Number,
            default: 0,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Set availableSeats to totalSeats before saving if not set
eventSchema.pre('save', function (next) {
    if (this.isNew && !this.availableSeats) {
        this.availableSeats = this.totalSeats;
    }
    next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
