import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const getDashboardLink = () => {
        if (user?.role === 'admin') return '/admin/dashboard';
        if (user?.role === 'organizer') return '/organizer/dashboard';
        return '/user/bookings';
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-40">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="text-2xl font-bold text-gradient">EventSense</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/events"
                            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                        >
                            Browse Events
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={getDashboardLink()}
                                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>

                                {user.role === 'organizer' && (
                                    <Link
                                        to="/organizer/create-event"
                                        className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                                    >
                                        Create Event
                                    </Link>
                                )}

                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin/approve-events"
                                        className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                                    >
                                        Approve Events
                                    </Link>
                                )}

                                <div className="flex items-center space-x-4">
                                    <div className="text-sm">
                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/events"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                            >
                                Browse Events
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to={getDashboardLink()}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                                    >
                                        Dashboard
                                    </Link>

                                    {user.role === 'organizer' && (
                                        <Link
                                            to="/organizer/create-event"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                                        >
                                            Create Event
                                        </Link>
                                    )}

                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin/approve-events"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                                        >
                                            Approve Events
                                        </Link>
                                    )}

                                    <div className="px-4 py-2 border-t border-gray-200">
                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-500 capitalize mb-2">{user.role}</p>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="mx-4 btn-primary text-center"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
