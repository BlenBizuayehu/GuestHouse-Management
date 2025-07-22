
import React, { useState } from 'react';
import { Room, RoomStatus, RoomType } from '../../types';
import { api, useAuth } from '../App';

interface RoomModalProps {
    room: Room | null;
    onClose: () => void;
    onSave: (room: Room) => void;
}

const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onSave }) => {
    const [formData, setFormData] = useState<Omit<Room, '_id' | 'createdAt' | 'updatedAt'>>({
        number: room?.number || '',
        type: room?.type || RoomType.Single,
        status: room?.status || RoomStatus.Available,
        capacity: room?.capacity || 1,
        pricePerNight: room?.pricePerNight || 0,
        description: room?.description || '',
        amenities: room?.amenities || { has_air_conditioning: false, has_tv: false, has_minibar: false },
        images: room?.images || [],
    });
    const [imageFiles, setImageFiles] = useState<string[]>(room?.images || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'capacity' || name === 'pricePerNight' ? Number(value) : value }));
    };

    const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            amenities: { ...prev.amenities, [name]: checked }
        }));
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newImageUrls: string[] = [];
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImageUrls.push(reader.result as string);
                    if(newImageUrls.length === files.length) {
                       setImageFiles(prev => [...prev, ...newImageUrls]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    
    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = { ...formData, images: imageFiles };
        
        try {
            let savedRoom;
            if (room) {
                // Update existing room
                savedRoom = await api.put(`/rooms/${room._id}`, token, payload);
            } else {
                // Create new room
                savedRoom = await api.post('/rooms', token, payload);
            }
            onSave(savedRoom);
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{room ? 'Edit Room' : 'Add New Room'}</h2>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room Number</label>
                                <input type="text" name="number" value={formData.number} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room Type</label>
                                <select name="type" value={formData.type} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500">
                                    {Object.values(RoomType).map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500">
                                    {Object.values(RoomStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Capacity</label>
                                <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} min="1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Per Night ($)</label>
                                <input type="number" name="pricePerNight" value={formData.pricePerNight} onChange={handleInputChange} min="0" step="0.01" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"/>
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amenities</label>
                                <div className="mt-2 space-y-2">
                                    <label className="flex items-center"><input type="checkbox" name="has_air_conditioning" checked={formData.amenities.has_air_conditioning} onChange={handleAmenityChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" /> <span className="ml-2">A/C</span></label>
                                    <label className="flex items-center"><input type="checkbox" name="has_tv" checked={formData.amenities.has_tv} onChange={handleAmenityChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" /> <span className="ml-2">TV</span></label>
                                    <label className="flex items-center"><input type="checkbox" name="has_minibar" checked={formData.amenities.has_minibar} onChange={handleAmenityChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50" /> <span className="ml-2">Minibar</span></label>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Images</label>
                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {imageFiles.map((img, index) => (
                                        <div key={index} className="relative">
                                            <img src={img} alt="preview" className="h-20 w-20 object-cover rounded"/>
                                            <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 text-xs">&times;</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400">
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomModal;
