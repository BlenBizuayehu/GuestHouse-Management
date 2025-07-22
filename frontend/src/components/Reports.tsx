
import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { api, useAuth } from '../App';
import { BarChart2 } from './ui/Icons';

const Reports: React.FC = () => {
    const [revenueByRoomType, setRevenueByRoomType] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                setLoading(true);
                const data = await api.get('/reports/revenue-by-room-type', token);
                setRevenueByRoomType(data);
            } catch (error) {
                console.error("Error fetching report data:", error);
            } finally {
                setLoading(false);
            }
        };
        if(token) fetchReportData();
    }, [token]);

    const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#f97316'];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-2 bg-gray-700 text-white rounded-md shadow-lg border border-gray-600">
                    <p className="label">{`${payload[0].name} : $${payload[0].value.toLocaleString()}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Reports</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue by Room Type</h3>
                    {loading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <div className="w-[200px] h-[200px] bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                        </div>
                    ) : (
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={revenueByRoomType}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent = 0 }) => `${(percent * 100).toFixed(0)}%`}

                            >
                                {revenueByRoomType.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                        </PieChart>
                    </ResponsiveContainer>
                    )}
                </div>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">More Reports Coming Soon</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Future reports will include detailed occupancy analysis, guest demographics, booking trends, and financial summaries.
                    </p>
                    <BarChart2 className="w-24 h-24 mt-6 text-gray-300 dark:text-gray-600"/>
                </div>
            </div>
        </div>
    );
};

export default Reports;
