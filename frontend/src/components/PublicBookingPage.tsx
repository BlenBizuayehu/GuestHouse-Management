// components/PublicBookingPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from './ui/Icons';

interface RoomDetails {
    _id: string;
    number: string;
    type: string;
    pricePerNight: number;
    images: string[];
}

const PublicBookingPage: React.FC<{ roomId: string }> = ({ roomId }) => {
    const [room, setRoom] = useState<RoomDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        guestName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        numberOfGuests: 1,
        specialRequests: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/public/rooms/${roomId}`);
                if (!response.ok) throw new Error('Failed to fetch room details');
                const data = await response.json();
                setRoom(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/public/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomId,
                    ...formData
                }),
            });
            
            if (!response.ok) throw new Error('Booking failed');
            
            navigate('#/booking-confirmation');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    if (loading) return <div>Loading room details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!room) return <div>Room not found</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">Book Room #{room.number}</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    {room.images.length > 0 && (
                        <img 
                            src={room.images[0]} 
                            alt={`Room ${room.number}`} 
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                    )}
                    <h2 className="text-xl font-semibold">{room.type} Room</h2>
                    <p className="text-lg font-bold text-indigo-600 my-2">
                        ${room.pricePerNight} / night
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block font-medium">Guest Information</label>
                        <div className="flex items-center space-x-2 p-2 border rounded-lg">
                            <Users className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="flex-1 outline-none"
                                value={formData.guestName}
                                onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2 p-2 border rounded-lg">
  <input
    type="email"
    placeholder="Email"
    className="flex-1 outline-none"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    required
  />
</div>
<div className="flex items-center space-x-2 p-2 border rounded-lg">
  <input
    type="tel"
    placeholder="Phone"
    className="flex-1 outline-none"
    value={formData.phone}
    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    required
  />
</div>

                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded-lg">
  <input
    type="number"
    min={1}
    placeholder="Number of Guests"
    className="flex-1 outline-none"
    value={formData.numberOfGuests || ''}
    onChange={(e) =>
      setFormData({ ...formData, numberOfGuests: Number(e.target.value) })
    }
    required
  />
</div>


                    {/* Dates Section */}
                    <div className="space-y-2">
                        <label className="block font-medium">Dates</label>
                        
                        {/* Check-in */}
                        <div className="flex items-center space-x-2 p-2 border rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                className="flex-1 outline-none"
                                value={formData.checkIn}
                                onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                                required
                            />
                        </div>
                        
                        {/* Check-out */}
                        <div className="flex items-center space-x-2 p-2 border rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                className="flex-1 outline-none"
                                value={formData.checkOut}
                                onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block font-medium">Special Requests</label>
                        <textarea
                            className="w-full p-2 border rounded-lg"
                            rows={3}
                            value={formData.specialRequests}
                            onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Confirm Booking
                    </button>
                    
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default PublicBookingPage;