
import React, { useEffect, useState } from 'react';
import { Room } from '../../types';
import { Check, ParkingSquare, Tv, UtensilsCrossed, Wifi, Wind } from './ui/Icons';

const Feature: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex flex-col items-center p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-3 mb-4 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300">
            {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{children}</p>
    </div>
);

const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
  <div className="overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
    <img className="object-cover w-full h-56" src={room.images[0] || `https://placehold.co/600x400/e2e8f0/adb5bd?text=NestHaven`} alt={`View of ${room.type} room`}/>
    <div className="p-6">
      <div className="flex justify-between items-baseline">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{room.type} Room</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">Room {room.number}</p>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-400 h-20 overflow-hidden">{room.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${room.pricePerNight}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/night</span></span>
        <a href="#/rooms" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">View Details</a>
      </div>
    </div>
  </div>
);


const HomePage: React.FC = () => {
    const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/public/rooms');
                if (!response.ok) throw new Error('Failed to fetch rooms');
                const data = await response.json();
                // Select first 3 rooms as "featured"
                setFeaturedRooms(data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching public rooms:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    return (
        <div className="text-gray-800 dark:text-gray-200">
            {/* Hero Section */}
            <section className="relative bg-gray-700 text-white h-[60vh] flex items-center justify-center text-center">
                 <div className="absolute inset-0 bg-black opacity-50"></div>
                 <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')"}}></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Your Serene Getaway Awaits</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">Experience unparalleled comfort and hospitality at NestHaven. Your perfect retreat from the everyday.</p>
                    <a href="#/rooms" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform hover:scale-105">
                        Explore Our Rooms
                    </a>
                </div>
            </section>
            
            {/* Features Section */}
            <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Everything You Need for a Perfect Stay</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                           From essential amenities to thoughtful extras, we've got you covered.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <Feature icon={<Wifi className="h-8 w-8"/>} title="High-Speed WiFi">Stay connected with free, fast internet access throughout the property.</Feature>
                        <Feature icon={<ParkingSquare className="h-8 w-8"/>} title="Free Parking">Enjoy the convenience and security of complimentary on-site parking.</Feature>
                        <Feature icon={<Wind className="h-8 w-8"/>} title="Air Conditioning">All our rooms are equipped with modern AC for your comfort.</Feature>
                        <Feature icon={<Tv className="h-8 w-8"/>} title="Flat Screen TVs">Unwind with a wide selection of channels on our high-definition TVs.</Feature>
                        <Feature icon={<UtensilsCrossed className="h-8 w-8"/>} title="On-site Dining">Savor delicious meals at our guest house restaurant, serving breakfast and dinner.</Feature>
                        <Feature icon={<Check className="h-8 w-8"/>} title="24/7 Reception">Our friendly staff is always available to assist you, any time of day or night.</Feature>
                    </div>
                </div>
            </section>

            {/* Featured Rooms Section */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                         <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Our Featured Rooms</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">A glimpse into the comfort and style that awaits you at NestHaven.</p>
                    </div>
                    {loading ? (
                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
                            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        </div>
                    ) : (
                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredRooms.map(room => <RoomCard key={room._id} room={room} />)}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
