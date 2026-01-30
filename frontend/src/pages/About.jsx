import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="text-5xl font-extrabold mb-6">About EventSense</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">
                        We are on a mission to bring people together through unforgettable live experiences.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 2026, EventSense started with a simple idea: booking tickets for your favorite events shouldn't be a hassle.
                            We noticed that while there were many platforms, few offered a seamless, user-friendly experience that catered
                            equally to attendees and organizers.
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Today, we are a thriving community where thousands of event-goers discover their next passion, and organizers
                            find the tools they need to succeed. From sold-out music festivals to intimate workshops, EventSense powers it all.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-pink-200 transform rotate-3 rounded-2xl"></div>
                        <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    <span>Secure and seamless booking process</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    <span>Instant QR code ticketing</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    <span>Verified organizers and events</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-600 mr-3">✓</span>
                                    <span>24/7 dedicated customer support</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-100 py-16">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Experience More?</h2>
                    <Link to="/events" className="btn-primary inline-block">
                        Browse Events
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
