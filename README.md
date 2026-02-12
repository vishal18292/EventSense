# EventSense - Smart Event Booking Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for event discovery, booking, and management with role-based access control.

## 🚀 Features

### For Users
- 🔍 Browse and search events with filters (category, location, price, date)
- 🎫 Book tickets with real-time seat availability
- 📱 QR code-based digital tickets
- ⭐ Rate and review events
- 📧 Email confirmations
- 💳 View booking history

### For Organizers
- 📅 Create and manage events
- 📊 Dashboard with analytics (revenue, bookings, charts)
- 👥 View event bookings
- 📈 Track event performance

### For Admins
- ✅ Approve/reject events
- 👨‍💼 Manage users
- 📊 Platform-wide analytics
- 📈 Monitor all activities

## 🛠️ Technology Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- bcrypt for password hashing
- Nodemailer for email notifications
- QR Code generation

### Frontend
- React.js with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Recharts for analytics visualization
- Context API for state management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## ⚙️ Installation

### 1. Clone the repository
```bash
cd "d:/1_Project Event booking"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (already created) with:
```
MONGO_URI=mongodb+srv://vishal:Vishal8264@cluster0.lfpl7c7.mongodb.net/EventSense?retryWrites=true&w=majority
JWT_SECRET=eventsense_super_secret_jwt_key_2026_production_ready
PORT=5000

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=EventSense <noreply@eventsense.com>
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Seed Database

```bash
cd ../backend
npm run seed
```

This will create test accounts:
- **Admin**: admin@eventsense.com / admin123
- **Organizer**: john@example.com / password123
- **User**: alice@example.com / password123

## 🚀 Running the Application

### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

## 👥 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@eventsense.com | admin123 |
| Organizer | john@example.com | password123 |
| Organizer | sarah@example.com | password123 |
| User | alice@example.com | password123 |
| User | bob@example.com | password123 |

## 📱 Usage Flow

1. **User Registration**: Sign up as User or Organizer
2. **Browse Events**: Search and filter available events
3. **Book Tickets**: Select seats and confirm booking
4. **Get QR Code**: Receive digital ticket with QR code
5. **Organizer**: Create events (pending admin approval)
6. **Admin**: Approve/reject events, view analytics

## 🏗️ Project Structure

```
EventSense/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & role middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # QR code, email utilities
│   ├── seed/            # Database seed script
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # User, Organizer, Admin pages
│   │   ├── services/    # API service
│   │   └── App.jsx      # Main app component
│   └── public/
└── README.md
```

## 🔐 API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get profile
- PUT `/api/auth/profile` - Update profile

### Events
- GET `/api/events` - Get all approved events (with filters)
- GET `/api/events/:id` - Get event by ID
- POST `/api/events` - Create event (Organizer)
- PUT `/api/events/:id` - Update event (Organizer)
- DELETE `/api/events/:id` - Delete event (Organizer)

### Bookings
- POST `/api/bookings` - Create booking
- GET `/api/bookings` - Get user bookings
- GET `/api/bookings/:id` - Get booking details

### Reviews
- POST `/api/reviews` - Add review
- GET `/api/reviews/event/:eventId` - Get event reviews

### Admin
- GET `/api/admin/analytics` - Platform analytics
- GET `/api/admin/events/pending` - Pending events
- PATCH `/api/admin/events/:id/status` - Approve/reject event

### Organizer
- GET `/api/organizer/analytics` - Organizer dashboard data

## 🎨 Key Features Implementation

### Smart Event Discovery
- Advanced search with multiple filters
- Category-based browsing
- Sorting options (popular, price, date, rating)

### Booking System
- Real-time seat availability check
- Prevent double booking
- QR code generation
- Email confirmation

### Analytics Dashboards
- Revenue charts (Line, Bar, Pie)
- Event performance metrics
- Booking statistics

### Security
- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API routes

## 📧 Email Notifications

The app sends emails for:
- Booking confirmation with QR code
- Event approval notification

Configure SMTP settings in `.env` for email functionality.

## 🌐 Deployment

EventSense can be deployed with:
- **Backend**: Render (free tier available)
- **Frontend**: Vercel (free tier available)

### Quick Deploy

1. **Backend to Render**:
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Add environment variables (see [DEPLOYMENT.md](DEPLOYMENT.md))

2. **Frontend to Vercel**:
   - Connect your GitHub repository
   - Set root directory to `frontend`
   - Add `VITE_API_URL` environment variable

📖 **For detailed step-by-step deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## 🎯 Future Enhancements

- Payment gateway integration
- Event categories with images
- Social media sharing
- Mobile app (React Native)
- Push notifications
- Advanced analytics with more charts
- Event cancellation & refunds

## 🤝 Contributing

This is a final-year project. Feel free to fork and enhance!

## 📄 License

MIT License

## 👨‍💻 Developer

Developed as a major project for final year demonstration.

---

**EventSense** - Your smart platform for unforgettable event experiences! 🎉
