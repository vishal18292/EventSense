import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-gray-900">{question}</span>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className="px-6 py-4 text-gray-600 bg-white border-t border-gray-100 animate-fade-in">
                    {answer}
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "How do I book tickets for an event?",
            answer: "Booking tickets is simple! Browse our events page, select the event you're interested in, choose the number of seats, and proceed to checkout. Once confirmed, you'll receive a QR code ticket instantly."
        },
        {
            question: "Is my payment information secure?",
            answer: "Yes, absolutely. We use industry-standard encryption and secure payment gateways to ensure your personal and financial information is always protected."
        },
        {
            question: "Can I cancel my booking?",
            answer: "Cancellation policies vary by event. Please check the 'Important Information' section on the event details page. Generally, tickets are non-refundable unless the event is cancelled."
        },
        {
            question: "How do I become an organizer?",
            answer: "Sign up for an account and select 'Organizer' as your role. You'll gain access to our dashboard where you can create, manage, and track your events."
        },
        {
            question: "Do I need to print my ticket?",
            answer: "No, printing is optional! You can simply show the QR code on your mobile device at the event entrance for scanning."
        },
        {
            question: "What happens if an event is cancelled?",
            answer: "In the rare event of a cancellation, you will be notified via email and a full refund will be processed to your original payment method within 5-7 business days."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="bg-purple-700 text-white py-16">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-extrabold mb-4">Frequently Asked Questions</h1>
                    <p className="text-purple-100 max-w-2xl mx-auto">
                        Find answers to the most common questions about EventSense.
                    </p>
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <Link to="/contact" className="btn-secondary inline-block">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
