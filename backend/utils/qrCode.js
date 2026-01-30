import QRCode from 'qrcode';

// Generate QR code for booking
export const generateQRCode = async (bookingData) => {
    try {
        const qrData = JSON.stringify({
            bookingId: bookingData.bookingReference,
            eventTitle: bookingData.eventTitle,
            userName: bookingData.userName,
            seats: bookingData.seats,
            date: bookingData.date,
        });

        // Generate QR code as data URL
        const qrCodeDataURL = await QRCode.toDataURL(qrData, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            width: 300,
            margin: 1,
        });

        return qrCodeDataURL;
    } catch (error) {
        console.error('QR Code generation error:', error);
        throw new Error('Failed to generate QR code');
    }
};
