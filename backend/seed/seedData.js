import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Event from '../models/Event.js';
import connectDB from '../config/db.js';

dotenv.config();

// Sample data
const users = [
    {
        name: 'Admin User',
        email: 'admin@eventsense.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 9876543210',
    },
    {
        name: 'John Organizer',
        email: 'john@example.com',
        password: 'password123',
        role: 'organizer',
        phone: '+91 9876543211',
    },
    {
        name: 'Sarah Events',
        email: 'sarah@example.com',
        password: 'password123',
        role: 'organizer',
        phone: '+91 9876543212',
    },
    {
        name: 'Alice User',
        email: 'alice@example.com',
        password: 'password123',
        role: 'user',
        phone: '+91 9876543213',
        preferences: {
            categories: ['Music', 'Technology'],
            locations: ['Mumbai', 'Bangalore'],
        },
    },
    {
        name: 'Bob User',
        email: 'bob@example.com',
        password: 'password123',
        role: 'user',
        phone: '+91 9876543214',
        preferences: {
            categories: ['Sports', 'Entertainment'],
            locations: ['Delhi', 'Pune'],
        },
    },
];

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Event.deleteMany();

        console.log('🗑️  Cleared existing data');

        // Create users
        const createdUsers = await User.create(users);
        console.log('✅ Users created');

        // Find organizers
        const organizer1 = createdUsers.find((u) => u.email === 'john@example.com');
        const organizer2 = createdUsers.find((u) => u.email === 'sarah@example.com');

        // Sample events
        const events = [
            {
                title: 'Tech Conference 2026',
                description:
                    'Join us for the biggest tech conference of the year featuring industry leaders, innovative startups, and cutting-edge technology demonstrations.',
                category: 'Technology',
                location: 'Mumbai',
                venue: 'Mumbai Convention Center',
                date: new Date('2026-03-15'),
                time: '10:00 AM',
                price: 2499,
                totalSeats: 500,
                availableSeats: 500,
                images: [],
                organizer: organizer1._id,
                status: 'approved',
            },
            {
                title: 'Summer Music Festival',
                description:
                    'Experience 3 days of non-stop music with top artists from around the world. Food, fun, and unforgettable memories await!',
                category: 'Music',
                location: 'Bangalore',
                venue: 'Palace Grounds',
                date: new Date('2026-04-20'),
                time: '06:00 PM',
                price: 1999,
                totalSeats: 2000,
                availableSeats: 2000,
                images: [],
                organizer: organizer2._id,
                status: 'approved',
            },
            {
                title: 'Cricket Premier League Finals',
                description:
                    'Witness the epic showdown in the CPL finals. Book your seats now for the most anticipated match of the season!',
                category: 'Sports',
                location: 'Delhi',
                venue: 'National Stadium',
                date: new Date('2026-05-10'),
                time: '03:00 PM',
                price: 3500,
                totalSeats: 50000,
                availableSeats: 50000,
                images: [],
                organizer: organizer1._id,
                status: 'approved',
            },
            {
                title: 'Stand-Up Comedy Night',
                description:
                    'Laugh out loud with the best comedians in the country. A night filled with humor, wit, and entertainment.',
                category: 'Entertainment',
                location: 'Pune',
                venue: 'Phoenix Marketcity',
                date: new Date('2026-02-28'),
                time: '08:00 PM',
                price: 799,
                totalSeats: 300,
                availableSeats: 300,
                images: [],
                organizer: organizer2._id,
                status: 'approved',
            },
            {
                title: 'Art & Culture Exhibition',
                description:
                    'Explore contemporary art from renowned artists. Paintings, sculptures, and interactive installations.',
                category: 'Art',
                location: 'Mumbai',
                venue: 'Jehangir Art Gallery',
                date: new Date('2026-03-05'),
                time: '11:00 AM',
                price: 500,
                totalSeats: 200,
                availableSeats: 200,
                images: [],
                organizer: organizer1._id,
                status: 'approved',
            },
            {
                title: 'Startup Pitch Competition',
                description:
                    'Watch innovative startups pitch their ideas to top investors. Network with entrepreneurs and investors.',
                category: 'Business',
                location: 'Bangalore',
                venue: 'Sheraton Grand',
                date: new Date('2026-04-01'),
                time: '09:00 AM',
                price: 1500,
                totalSeats: 150,
                availableSeats: 150,
                images: [],
                organizer: organizer2._id,
                status: 'pending',
            },
            {
                title: 'Food & Wine Festival',
                description:
                    'A culinary journey featuring top chefs, wine tastings, and gourmet food from around the world.',
                category: 'Food',
                location: 'Mumbai',
                venue: 'Bombay Exhibition Centre',
                date: new Date('2026-03-25'),
                time: '05:00 PM',
                price: 2000,
                totalSeats: 400,
                availableSeats: 400,
                images: [],
                organizer: organizer1._id,
                status: 'approved',
            },
            {
                title: 'Yoga & Wellness Retreat',
                description:
                    'Rejuvenate your mind and body with expert-led yoga sessions, meditation, and wellness workshops.',
                category: 'Health',
                location: 'Goa',
                venue: 'Beachside Resort',
                date: new Date('2026-02-15'),
                time: '06:00 AM',
                price: 3500,
                totalSeats: 100,
                availableSeats: 100,
                images: [],
                organizer: organizer2._id,
                status: 'approved',
            },
            {
                title: 'AI & Machine Learning Workshop',
                description:
                    'Hands-on workshop on AI/ML fundamentals, deep learning, and real-world applications.',
                category: 'Education',
                location: 'Bangalore',
                venue: 'Tech Park Auditorium',
                date: new Date('2026-03-18'),
                time: '10:00 AM',
                price: 1999,
                totalSeats: 250,
                availableSeats: 250,
                images: [],
                organizer: organizer1._id,
                status: 'pending',
            },
            {
                title: 'Rock Concert - Live',
                description:
                    'Headbanging rock music featuring legendary bands. Sound, lights, and pure energy!',
                category: 'Music',
                location: 'Delhi',
                venue: 'Jawaharlal Nehru Stadium',
                date: new Date('2026-05-20'),
                time: '07:00 PM',
                price: 2500,
                totalSeats: 10000,
                availableSeats: 10000,
                images: [],
                organizer: organizer2._id,
                status: 'approved',
            },
        ];

        await Event.create(events);
        console.log('✅ Events created');

        console.log('\n🎉 Database seeded successfully!\n');
        console.log('📋 Test Accounts:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Admin:     admin@eventsense.com / admin123');
        console.log('Organizer: john@example.com / password123');
        console.log('Organizer: sarah@example.com / password123');
        console.log('User:      alice@example.com / password123');
        console.log('User:      bob@example.com / password123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
