import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventAPI } from '../services/api';
import EventCard from '../components/common/EventCard';
import Loading from '../components/common/Loading';

const Landing = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedEvents();
    }, []);

    const fetchFeaturedEvents = async () => {
        try {
            const response = await eventAPI.getEvents({ sortBy: 'popular' });
            setFeaturedEvents(response.data.events.slice(0, 6));
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'Music', icon: '🎵', color: 'from-pink-500 to-rose-500' },
        { name: 'Technology', icon: '💻', color: 'from-blue-500 to-cyan-500' },
        { name: 'Sports', icon: '⚽', color: 'from-green-500 to-emerald-500' },
        { name: 'Art', icon: '🎨', color: 'from-purple-500 to-pink-500' },
        { name: 'Business', icon: '💼', color: 'from-gray-600 to-gray-800' },
        { name: 'Food', icon: '🍕', color: 'from-orange-500 to-red-500' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="hero-pattern relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>

                <div className="container-custom relative z-10 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
                            Discover Amazing Events
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                                Near You
                            </span>
                        </h1>

                        <p className="text-xl text-gray-100 mb-8 animate-slide-up">
                            Book tickets for music festivals, tech conferences, sports events, and more. Your next unforgettable experience awaits!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-200">
                            <Link to="/events" className="btn-primary text-lg px-8 py-4">
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Browse Events
                                </span>
                            </Link>

                            <Link
                                to="/register"
                                className="btn-secondary text-lg px-8 py-4 bg-white/10 hover:bg-white/20 border-white text-white backdrop-blur-sm"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Floating Cards Animation */}
                    <div className="hidden lg:block absolute top-20 left-10 animate-pulse-slow">
                        <div className="glass-dark p-4 rounded-xl">
                            <p className="text-white font-semibold">🎉 1000+ Events</p>
                        </div>
                    </div>

                    <div className="hidden lg:block absolute bottom-20 right-10 animate-pulse-slow animate-delay-300">
                        <div className="glass-dark p-4 rounded-xl">
                            <p className="text-white font-semibold">⭐ 50K+ Happy Users</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Browse by Category
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Find events that match your interests
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <Link
                                key={category.name}
                                to={`/events?category=${category.name}`}
                                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl`}>
                                    {category.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className="section bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Trending Events
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Most popular events happening soon
                        </p>
                    </div>

                    {loading ? (
                        <Loading fullScreen={false} />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredEvents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/events" className="btn-primary text-lg">
                            View All Events
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose EventSense?
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            The smartest way to discover and book events
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-purple-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Discovery</h3>
                            <p className="text-gray-600">
                                Find events that match your interests with our smart search and filtering
                            </p>
                        </div>

                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-purple-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Booking</h3>
                            <p className="text-gray-600">
                                Safe and secure payment processing with instant booking confirmation
                            </p>
                        </div>

                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-purple-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">QR Tickets</h3>
                            <p className="text-gray-600">
                                Digital tickets with QR codes for easy and contactless entry
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section gradient-primary">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of event-goers and organizers who trust EventSense for their event needs
                    </p>
                    <Link to="/register" className="btn-primary bg-white text-purple-600 hover:bg-gray-100">
                        Create Free Account
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Landing;
