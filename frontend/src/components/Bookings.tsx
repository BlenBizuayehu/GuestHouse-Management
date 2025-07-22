
import React, { useEffect, useState } from 'react';
import { Booking } from '../../types';
import { api, useAuth } from '../App';
import { Edit, Eye, UserPlus } from './ui/Icons';

const StatusBadge = ({ status }: { status: Booking['status'] }) => {
    const colorClasses = {
        Confirmed: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        CheckedIn: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        CheckedOut: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorClasses[status]}`}>{status}</span>;
};

const SkeletonRow: React.FC = () => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
        <td className="px-6 py-4">
            <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                <div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 hidden md:table-cell"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
        <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
        <td className="px-6 py-4 hidden sm:table-cell"><div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div></td>
        <td className="px-6 py-4 flex items-center space-x-3">
            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </td>
    </tr>
);

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const data = await api.get('/bookings', token);
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [token]);
    
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Bookings</h2>
                <a href="#/dashboard/bookings/new" className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow hover:shadow-lg">
                    <UserPlus className="h-5 w-5 mr-2" />
                    New Booking
                </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Guest</th>
                                <th scope="col" className="px-6 py-3 hidden md:table-cell">Room</th>
                                <th scope="col" className="px-6 py-3">Dates</th>
                                <th scope="col" className="px-6 py-3 hidden sm:table-cell">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : (
                                bookings.map(booking => (
                                    <tr key={booking._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <img className="h-8 w-8 rounded-full mr-3" src={`https://ui-avatars.com/api/?name=${booking.guest?.firstName}+${booking.guest?.lastName}&background=random`} alt={`${booking.guest?.firstName} ${booking.guest?.lastName}`}/>
                                                <div>
                                                    <div>{booking.guest?.firstName} {booking.guest?.lastName}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                                                        <StatusBadge status={booking.status} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">Room {booking.room?.number || 'N/A'}</td>
                                        <td className="px-6 py-4">{formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}</td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <StatusBadge status={booking.status} />
                                        </td>
                                        <td className="px-6 py-4 flex items-center space-x-3">
                                            <button className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"><Eye className="h-5 w-5" /></button>
                                            <button className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"><Edit className="h-5 w-5" /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;