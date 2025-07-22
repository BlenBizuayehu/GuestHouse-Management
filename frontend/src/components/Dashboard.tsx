
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api, useAuth } from '../App';
import { BedDouble, UserCheck, UserX, Users } from './ui/Icons';

const StatCard = ({ icon, title, value, color, loading }: { icon: React.ReactNode, title: string, value: string | number, color: string, loading?: boolean }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            {loading ? 
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1"></div> :
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            }
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalRooms: 0,
        availableRooms: 0,
        occupiedRooms: 0,
        currentGuests: 0,
        recentCheckIns: [],
        upcomingCheckOuts: [],
    });
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await api.get('/dashboard-stats', token);
                setStats(data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        if(token) fetchStats();
    }, [token]);

    const occupancyData = [
        { name: 'Mon', Occupancy: 65 },
        { name: 'Tue', Occupancy: 70 },
        { name: 'Wed', Occupancy: 85 },
        { name: 'Thu', Occupancy: 80 },
        { name: 'Fri', Occupancy: 95 },
        { name: 'Sat', Occupancy: 100 },
        { name: 'Sun', Occupancy: 90 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<BedDouble className="h-6 w-6 text-blue-600 dark:text-blue-400" />} title="Total Rooms" value={stats.totalRooms} color="bg-blue-100 dark:bg-blue-900" loading={loading} />
                <StatCard icon={<BedDouble className="h-6 w-6 text-green-600 dark:text-green-400" />} title="Available" value={stats.availableRooms} color="bg-green-100 dark:bg-green-900" loading={loading} />
                <StatCard icon={<BedDouble className="h-6 w-6 text-red-600 dark:text-red-400" />} title="Occupied" value={stats.occupiedRooms} color="bg-red-100 dark:bg-red-900" loading={loading} />
                <StatCard icon={<Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />} title="Current Guests" value={stats.currentGuests} color="bg-purple-100 dark:bg-purple-900" loading={loading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Weekly Occupancy Rate (%)</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={occupancyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.3)" />
                            <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
                            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#4b5563' }} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                                contentStyle={{
                                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                    borderColor: '#4b5563',
                                    color: '#f9fafb',
                                    borderRadius: '0.5rem',
                                }}
                            />
                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                            <Bar dataKey="Occupancy" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
                        {loading ? (
                            <div className="space-y-4">
                                <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        ) : (
                        <ul className="space-y-4">
                            {stats.recentCheckIns.map((b: any) => (
                                <li key={b._id} className="flex items-center text-sm">
                                    <UserCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">Guest checked into Room <strong>{b.room.number}</strong></span>
                                </li>
                            ))}
                             {stats.upcomingCheckOuts.map((b: any) => (
                                <li key={`out-${b._id}`} className="flex items-center text-sm">
                                    <UserX className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">Guest departing from Room <strong>{b.room.number}</strong></span>
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
