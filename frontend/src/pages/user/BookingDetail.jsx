import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { bookingAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const BookingDetail = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookingDetails();
    }, [id]);

    const fetchBookingDetails = async () => {
        try {
            const response = await bookingAPI.getBookingById(id);
            setBooking(response.data.booking);
        } catch (error) {
            console.error('Error fetching booking:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDownloadQR = () => {
        if (booking.qrCode) {
            // If backend provided QR code (Data URL), download it directly
            const downloadLink = document.createElement('a');
            downloadLink.href = booking.qrCode;
            downloadLink.download = `ticket-${booking.bookingReference}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            // Fallback for client-side generated QR
            const svg = document.getElementById('qr-code');
            if (!svg) return;

            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            // Add margin and white background
            const padding = 20;
            canvas.width = 300;
            canvas.height = 300;

            img.onload = () => {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Center the QR code
                ctx.drawImage(img, padding, padding, canvas.width - (padding * 2), canvas.height - (padding * 2));
                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = `ticket-${booking.bookingReference}.png`;
                downloadLink.href = pngFile;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            };

            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }
    };

    if (loading) return <Loading />;
    if (!booking) return <div className="container-custom py-12">Booking not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="card p-6 mb-6 gradient-primary text-white">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">Booking Confirmation</h1>
                        <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-danger'}`}>
                            {booking.status}
                        </span>
                    </div>
                    <p className="text-white/90">
                        Booking Reference: <span className="font-mono font-bold text-lg">{booking.bookingReference}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Details */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Event Name</p>
                                <p className="font-semibold text-lg">{booking.event?.title}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                                <p className="font-semibold">{formatDate(booking.event?.date)}</p>
                                <p className="text-gray-700">{booking.event?.time}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Venue</p>
                                <p className="font-semibold">{booking.event?.venue}</p>
                                <p className="text-gray-700">{booking.event?.location}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Category</p>
                                <span className="badge badge-primary">{booking.event?.category}</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Attendee Name</p>
                                <p className="font-semibold">{booking.user?.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                <p className="font-semibold">{booking.user?.email}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Phone</p>
                                <p className="font-semibold">{booking.user?.phone || 'N/A'}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Number of Seats</p>
                                <p className="font-semibold text-2xl">{booking.seats}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                <p className="font-bold text-3xl text-purple-600">₹{booking.totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Code */}
                <div className="card p-8 text-center mt-6">
                    <h2 className="text-2xl font-bold mb-4">Your Ticket QR Code</h2>
                    <p className="text-gray-600 mb-6">
                        Show this QR code at the event entrance for verification
                    </p>

                    <div className="inline-block p-6 bg-white rounded-xl shadow-lg">
                        {booking.qrCode ? (
                            <img src={booking.qrCode} alt="QR Code" className="w-64 h-64 mx-auto" />
                        ) : (
                            <QRCodeSVG
                                id="qr-code"
                                value={JSON.stringify({
                                    bookingId: booking.bookingReference,
                                    eventTitle: booking.event?.title,
                                    userName: booking.user?.name,
                                    seats: booking.seats,
                                })}
                                size={256}
                                level="H"
                            />
                        )}
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                        <button onClick={handleDownloadQR} className="btn-primary">
                            <svg className="w-5 h-5 inline mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download QR Code
                        </button>
                        <button onClick={() => window.print()} className="btn-secondary">
                            <svg className="w-5 h-5 inline mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Ticket
                        </button>
                    </div>
                </div>

                {/* Important Information */}
                <div className="card p-6 mt-6 bg-yellow-50 border border-yellow-200">
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                        <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Important Information
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-yellow-600 mr-2">•</span>
                            Please arrive at least 30 minutes before the event starts
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-600 mr-2">•</span>
                            Carry a valid government ID for verification
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-600 mr-2">•</span>
                            The QR code is valid only for the number of seats booked
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-600 mr-2">•</span>
                            No refunds or cancellations are allowed
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookingDetail;
