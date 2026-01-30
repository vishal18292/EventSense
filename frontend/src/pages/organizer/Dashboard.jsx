import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { organizerAPI } from '../../services/api';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../../components/common/Loading';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await organizerAPI.getAnalytics();
            setAnalytics(response.data.analytics);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

    const statusData = [
        { name: 'Approved', value: analytics.summary.approvedEvents },
        { name: 'Pending', value: analytics.summary.pendingEvents },
        { name: 'Rejected', value: analytics.summary.rejectedEvents },
    ].filter((item) => item.value > 0);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Organizer Dashboard</h1>
                        <p className="text-gray-600">Welcome back! Here's your event overview</p>
                    </div>
                    <Link to="/organizer/create-event" className="btn-primary">
                        <svg className="w-5 h-5 inline mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        Create Event
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/90">Total Events</h3>
                            <svg className="w-8 h-8 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold">{analytics.summary.totalEvents}</p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/90">Total Bookings</h3>
                            <svg className="w-8 h-8 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold">{analytics.summary.totalBookings}</p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/90">Total Revenue</h3>
                            <svg className="w-8 h-8 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold">₹{analytics.summary.totalRevenue.toLocaleString()}</p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white/90">Seats Sold</h3>
                            <svg className="w-8 h-8 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-4xl font-bold">{analytics.summary.totalSeats}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-bold mb-4">Revenue Trend (Last 6 Months)</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analytics.monthlyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name="Revenue (₹)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Event Status */}
                    <div className="card p-6">
                        <h2 className="text-2xl font-bold mb-4">Events by Status</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Event Analytics Table */}
                <div className="card p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Event Performance</h2>
                        <Link to="/organizer/events" className="text-purple-600 hover:text-purple-700 font-medium">
                            View All Events →
                        </Link>
                    </div>

                    {analytics.eventAnalytics.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4">Event Name</th>
                                        <th className="text-left py-3 px-4">Status</th>
                                        <th className="text-right py-3 px-4">Bookings</th>
                                        <th className="text-right py-3 px-4">Seats Sold</th>
                                        <th className="text-right py-3 px-4">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics.eventAnalytics.map((event) => (
                                        <tr key={event.eventId} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <p className="font-semibold">{event.title}</p>
                                                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`badge ${event.status === 'approved' ? 'badge-success' :
                                                        event.status === 'pending' ? 'badge-warning' :
                                                            'badge-danger'
                                                    }`}>
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right font-semibold">{event.bookingCount}</td>
                                            <td className="py-3 px-4 text-right">
                                                {event.seatsSold}/{event.totalSeats}
                                            </td>
                                            <td className="py-3 px-4 text-right font-bold text-purple-600">
                                                ₹{event.revenue.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No events yet. Create your first event to see analytics!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
