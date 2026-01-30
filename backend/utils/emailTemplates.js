// Email templates for booking confirmations

export const bookingConfirmationTemplate = (bookingDetails) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .booking-details {
          background: #f0f0f0;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }
        .qr-code {
          text-align: center;
          margin: 20px 0;
        }
        .qr-code img {
          max-width: 250px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #666;
          font-size: 12px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>EventSense - Your ticket to amazing experiences</p>
        </div>
        <div class="content">
          <h2>Hi ${bookingDetails.userName},</h2>
          <p>Your booking has been confirmed! We're excited to see you at the event.</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <strong>Booking Reference:</strong>
              <span>${bookingDetails.bookingReference}</span>
            </div>
            <div class="detail-row">
              <strong>Event:</strong>
              <span>${bookingDetails.eventTitle}</span>
            </div>
            <div class="detail-row">
              <strong>Date & Time:</strong>
              <span>${bookingDetails.eventDate} at ${bookingDetails.eventTime}</span>
            </div>
            <div class="detail-row">
              <strong>Venue:</strong>
              <span>${bookingDetails.venue}</span>
            </div>
            <div class="detail-row">
              <strong>Number of Seats:</strong>
              <span>${bookingDetails.seats}</span>
            </div>
            <div class="detail-row">
              <strong>Total Amount:</strong>
              <span>₹${bookingDetails.totalAmount}</span>
            </div>
          </div>

          <div class="qr-code">
            <h3>Your Ticket QR Code</h3>
            <p>Show this QR code at the event entrance</p>
            <img src="cid:qrcode" alt="Ticket QR Code" />
          </div>

          <p><strong>Important:</strong> Please arrive 30 minutes before the event starts. Carry a valid ID for verification.</p>
          
          <div style="text-align: center;">
            <a href="${bookingDetails.ticketUrl}" class="button">View Full Ticket</a>
          </div>
        </div>
        <div class="footer">
          <p>© 2026 EventSense. All rights reserved.</p>
          <p>If you have any questions, please contact us at support@eventsense.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const eventApprovalTemplate = (eventDetails) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: white;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 0 0 10px 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Event Approved!</h1>
        </div>
        <div class="content">
          <h2>Congratulations!</h2>
          <p>Your event "<strong>${eventDetails.title}</strong>" has been approved and is now live on EventSense.</p>
          <p>Users can now discover and book tickets for your event.</p>
          <p>Login to your organizer dashboard to track bookings and manage your event.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
