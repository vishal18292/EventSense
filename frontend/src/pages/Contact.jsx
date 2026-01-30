import { useState } from 'react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container-custom py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have a question, feedback, or need support? We're here to help!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="card p-6 border-l-4 border-purple-600">
                            <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                            <p className="text-gray-600 mb-4">Our support team is available 24/7 for any urgent queries.</p>
                            <p className="font-semibold text-purple-600">support@eventsense.com</p>
                            <p className="text-sm text-gray-500 mt-1">+91 98765 43210</p>
                        </div>

                        <div className="card p-6 border-l-4 border-pink-600">
                            <h3 className="text-xl font-bold mb-2">Business Inquiries</h3>
                            <p className="text-gray-600 mb-4">For partnerships, sponsorships, and organizer support.</p>
                            <p className="font-semibold text-pink-600">partners@eventsense.com</p>
                        </div>

                        <div className="card p-6 border-l-4 border-blue-600">
                            <h3 className="text-xl font-bold mb-2">Office Headquarters</h3>
                            <p className="text-gray-600">
                                123 Innovation Tower, Tech Park,<br />
                                Mumbai, Maharashtra 400001,<br />
                                India
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card p-8">
                        <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                        {submitted ? (
                            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
                                <p className="font-bold">Message Sent!</p>
                                <p>We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" className="input-field" placeholder="Your Name" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" className="input-field" placeholder="your@email.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input type="text" className="input-field" placeholder="How can we help?" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea rows="4" className="input-field" placeholder="Write your message here..." required></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full">Send Message</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
