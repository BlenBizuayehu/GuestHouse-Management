
import React, { useCallback, useEffect, useState } from 'react';
import { STATUS_COLORS } from '../../constants';
import { Room } from '../../types';
import { api, useAuth } from '../App';
import RoomModal from './RoomModal';
import { BedDouble, Edit, Trash2 } from './ui/Icons';

const SkeletonRow: React.FC = () => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
        <td className="p-4"><div className="h-16 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div></td>
        <td className="px-6 py-4"><div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
        <td className="px-6 py-4 hidden md:table-cell"><div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
        <td className="px-6 py-4 hidden lg:table-cell"><div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
        <td className="px-6 py-4 hidden sm:table-cell"><div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div></td>
        <td className="px-6 py-4"><div className="flex space-x-2"><div className="h-7 w-7 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-7 w-7 bg-gray-200 dark:bg-gray-700 rounded"></div></div></td>
    </tr>
);

const Rooms: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const { token } = useAuth();

    const fetchRooms = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.get('/rooms', token);
            setRooms(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch rooms.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const handleAddRoom = () => {
        setSelectedRoom(null);
        setIsModalOpen(true);
    };

    const handleEditRoom = (room: Room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleDeleteRoom = async (roomId: string) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                await api.delete(`/rooms/${roomId}`, token);
                setRooms(rooms.filter(r => r._id !== roomId));
            } catch (err: any) {
                alert(`Failed to delete room: ${err.message}`);
            }
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedRoom(null);
    };

    const handleModalSave = (room: Room) => {
        if (selectedRoom) {
            setRooms(rooms.map(r => r._id === room._id ? room : r));
        } else {
            setRooms([...rooms, room]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Rooms</h2>
                <button onClick={handleAddRoom} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow hover:shadow-lg">
                    <BedDouble className="h-5 w-5 mr-2" />
                    Add Room
                </button>
            </div>
            
            {error && <div className="p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-lg">{error}</div>}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">Image</th>
                                <th scope="col" className="px-6 py-3">Room No.</th>
                                <th scope="col" className="px-6 py-3 hidden md:table-cell">Type</th>
                                <th scope="col" className="px-6 py-3 hidden lg:table-cell">Price</th>
                                <th scope="col" className="px-6 py-3 hidden sm:table-cell">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : (
                                rooms.map(room => (
                                    <tr key={room._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4">
                                            <img src={room.images[0] || `https://placehold.co/150x100/e2e8f0/adb5bd?text=Room ${room.number}`} alt={`Room ${room.number}`} className="h-16 w-24 object-cover rounded-md bg-gray-200 dark:bg-gray-700" />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{room.number}</td>
                                        <td className="px-6 py-4 hidden md:table-cell">{room.type}</td>
                                        <td className="px-6 py-4 hidden lg:table-cell">${room.pricePerNight.toFixed(2)}</td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[room.status]}`}>
                                                {room.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleEditRoom(room)} className="p-2 text-gray-500 rounded-md hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-gray-700 dark:hover:text-indigo-400"><Edit className="h-5 w-5" /></button>
                                                <button onClick={() => handleDeleteRoom(room._id)} className="p-2 text-gray-500 rounded-md hover:bg-red-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400"><Trash2 className="h-5 w-5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <RoomModal
                    room={selectedRoom}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
};

export default Rooms;
