
import React, { useEffect, useState } from 'react';
import { STATUS_COLORS } from '../../constants';
import { Room, RoomStatus } from '../../types';
import { CheckCircle2, Tv, Wifi, Wind } from './ui/Icons';


const Amenity: React.FC<{ icon: React.ReactNode; text: string; available: boolean }> = ({ icon, text, available }) => (
    <div className={`flex items-center space-x-2 ${available ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500 line-through'}`}>
        {icon}
        <span>{text}</span>
    </div>
);

const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % room.images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + room.images.length) % room.images.length);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 relative">
                 {room.images.length > 0 ? (
                    <>
                        <img src={room.images[currentImage]} alt={`Room ${room.number}`} className="h-64 w-full object-cover md:h-full" />
                        {room.images.length > 1 && (
                            <>
                                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition">&lt;</button>
                                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition">&gt;</button>
                            </>
                        )}
                    </>
                ) : (
                    <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{room.type} Room <span className="text-lg font-normal text-gray-500 dark:text-gray-400">(No. {room.number})</span></h3>
                         <span className={`mt-1 px-3 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[room.status]}`}>
                            {room.status}
                        </span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{room.description}</p>
                    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white">Amenities:</h4>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <Amenity icon={<Wind className="h-5 w-5"/>} text="A/C" available={room.amenities.has_air_conditioning} />
                            <Amenity icon={<Tv className="h-5 w-5"/>} text="TV" available={room.amenities.has_tv} />
                            <Amenity icon={<Wifi className="h-5 w-5"/>} text="Minibar" available={room.amenities.has_minibar} />
                            <Amenity icon={<CheckCircle2 className="h-5 w-5 text-green-500"/>} text={`Sleeps ${room.capacity}`} available={true}/>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${room.pricePerNight}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/night</span></span>
                    <button disabled={room.status !== RoomStatus.Available} className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {room.status === RoomStatus.Available ? 'Book Now' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
};


const SkeletonCard: React.FC = () => (
     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row animate-pulse">
        <div className="md:w-1/2 h-64 md:h-auto bg-gray-200 dark:bg-gray-700"></div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
                <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="mt-3 h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="mt-1 h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                 <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                 </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                 <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
                 <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </div>
    </div>
)


const PublicRoomsPage: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3001/api/public/rooms');
                if (!response.ok) throw new Error('Failed to fetch rooms');
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error("Error fetching public rooms:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Our Rooms</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Find the perfect space for your stay. Each room is designed for comfort and convenience.
                    </p>
                </div>
                <div className="space-y-8">
                    {loading ? (
                         Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        rooms.map(room => (
                            <RoomCard key={room._id} room={room} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicRoomsPage;
