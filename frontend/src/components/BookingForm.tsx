
import React, { useEffect, useState } from 'react';
import { Room, RoomStatus } from '../../types';
import { api, useAuth } from '../frontend/App';

const BookingForm: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [guestFirstName, setGuestFirstName] = useState('');
    const [guestLastName, setGuestLastName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const allRooms = await api.get('/rooms', token);
                const availableRooms = allRooms.filter((r: Room) => r.status === RoomStatus.Available);
                setRooms(availableRooms);
            } catch (err) {
                console.error("Failed to fetch rooms", err);
            }
        };
        if (token) {
            fetchRooms();
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRoom || !checkInDate || !checkOutDate) {
            setError('Please fill in all required fields.');
            return;
        }
        setLoading(true);
        setError('');

        const payload = {
            roomId: selectedRoom,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            guest: {
                firstName: guestFirstName,
                lastName: guestLastName,
                email: guestEmail,
                phone: guestPhone,
            },
        };

        try {
            await api.post('/bookings', token, payload);
            window.location.hash = '#/dashboard/bookings';
        } catch (err: any) {
            setError(err.message || 'Failed to create booking.');
        } finally {
            setLoading(false);
        }
    };
    
    const selectedRoomDetails = rooms.find(r => r._id === selectedRoom);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create New Booking</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Enter booking and guest information below.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Booking Details */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="room" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room</label>
                            <select id="room" name="room" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">Select an available room</option>
                                {rooms.map(room => <option key={room._id} value={room._id}>Room {room.number} ({room.type}) - ${room.pricePerNight}/night</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Guests</label>
                            <input type="number" id="numberOfGuests" name="numberOfGuests" value={numberOfGuests} onChange={(e) => setNumberOfGuests(Number(e.target.value))} min="1" max={selectedRoomDetails?.capacity || 1} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-in Date</label>
                            <input type="date" id="checkInDate" name="checkInDate" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-out Date</label>
                            <input type="date" id="checkOutDate" name="checkOutDate" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                        </div>
                    </div>
                </div>

                {/* Guest Details */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Guest Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="guestFirstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                            <input type="text" id="guestFirstName" value={guestFirstName} onChange={(e) => setGuestFirstName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="guestLastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                            <input type="text" id="guestLastName" value={guestLastName} onChange={(e) => setGuestLastName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input type="email" id="guestEmail" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="guestPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                            <input type="tel" id="guestPhone" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                        </div>
                    </div>
                </div>

                {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}

                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={() => window.history.back()} className="px-6 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400">
                        {loading ? 'Creating Booking...' : 'Create Booking'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
