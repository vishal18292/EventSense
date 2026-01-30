import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../../components/common/Loading';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await adminAPI.getAnalytics();
            setAnalytics(response.data.analytics);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Platform overview and statistics</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/90">Total Users</h3>
                            <svg className="w-8 h-8 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold">{analytics.users.total}</p>
                        <p className="text-sm text-white/70 mt-2">{analytics.users.organizers} organizers</p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/90">Total Events</h3>
                            <svg className="w-8 h-8 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold">{analytics.events.total}</p>
                        <p className="text-sm text-white/70 mt-2">{analytics.events.pending} pending approval</p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/90">Total Bookings</h3>
                            <svg className="w-8 h-8 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold">{analytics.bookings.total}</p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/90">Total Revenue</h3>
                            <svg className="w-8 h-8 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold">₹{analytics.bookings.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Events by Category */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-bold mb-4">Events by Category</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analytics.eventsByCategory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8b5cf6" name="Events" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Event Status Distribution */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-bold mb-4">Event Status Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Approved', value: analytics.events.approved },
                                        { name: 'Pending', value: analytics.events.pending },
                                        { name: 'Rejected', value: analytics.events.rejected },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {[0, 1, 2].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
                    {analytics.recentBookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4">User</th>
                                        <th className="text-left py-3 px-4">Event</th>
                                        <th className="text-left py-3 px-4">Date</th>
                                        <th className="text-right py-3 px-4">Seats</th>
                                        <th className="text-right py-3 px-4">Amount</th>
                                        <th className="text-left py-3 px-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.recentBookings.map((booking) => (
                                        <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">{booking.user?.name}</td>
                                            <td className="py-3 px-4">{booking.event?.title}</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">
                                                {new Date(booking.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4 text-right">{booking.seats}</td>
                                            <td className="py-3 px-4 text-right font-semibold text-purple-600">
                                                ₹{booking.totalAmount}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-danger'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-4">No bookings yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
