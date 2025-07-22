// components/BookingConfirmationPage.tsx
import React from 'react';
import { CheckCircle2 } from './ui/Icons';

const BookingConfirmationPage: React.FC = () => {
    return (
        <div className="max-w-md mx-auto py-16 px-4 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-3 text-2xl font-bold">Booking Confirmed!</h2>
            <p className="mt-2 text-gray-600">
                Thank you for your reservation. We've sent a confirmation to your email.
            </p>
            <div className="mt-8">
                <a 
                    href="#/rooms" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Back to Rooms
                </a>
            </div>
        </div>
    );
};

export default BookingConfirmationPage;