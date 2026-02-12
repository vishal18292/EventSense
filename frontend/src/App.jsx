import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseEvents from './pages/user/BrowseEvents';
import EventDetail from './pages/user/EventDetail';
import MyBookings from './pages/user/MyBookings';
import BookingDetail from './pages/user/BookingDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

// Organizer Pages
import OrganizerDashboard from './pages/organizer/Dashboard';
import CreateEvent from './pages/organizer/CreateEvent';
import MyEvents from './pages/organizer/MyEvents';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ApproveEvents from './pages/admin/ApproveEvents';

import ScrollToTop from './components/common/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/events" element={<BrowseEvents />} />
                        <Route path="/events/:id" element={<EventDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />

                        {/* User Routes */}
                        <Route
                            path="/user/bookings"
                            element={
                                <ProtectedRoute>
                                    <MyBookings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/user/bookings/:id"
                            element={
                                <ProtectedRoute>
                                    <BookingDetail />
                                </ProtectedRoute>
                            }
                        />

                        {/* Organizer Routes */}
                        <Route
                            path="/organizer/dashboard"
                            element={
                                <RoleRoute allowedRoles={['organizer']}>
                                    <OrganizerDashboard />
                                </RoleRoute>
                            }
                        />
                        <Route
                            path="/organizer/create-event"
                            element={
                                <RoleRoute allowedRoles={['organizer']}>
                                    <CreateEvent />
                                </RoleRoute>
                            }
                        />
                        <Route
                            path="/organizer/events"
                            element={
                                <RoleRoute allowedRoles={['organizer']}>
                                    <MyEvents />
                                </RoleRoute>
                            }
                        />

                        {/* Admin Routes */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <RoleRoute allowedRoles={['admin']}>
                                    <AdminDashboard />
                                </RoleRoute>
                            }
                        />
                        <Route
                            path="/admin/approve-events"
                            element={
                                <RoleRoute allowedRoles={['admin']}>
                                    <ApproveEvents />
                                </RoleRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
