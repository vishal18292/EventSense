import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        rating: {
            type: Number,
            required: [true, 'Please provide a rating'],
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: [true, 'Please provide a comment'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate reviews from same user for same event
reviewSchema.index({ user: 1, event: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
