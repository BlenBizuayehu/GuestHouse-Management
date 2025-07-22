
import React from 'react';
import { Hotel } from './ui/Icons';

const PublicFooter: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <div className="flex items-center">
                           <Hotel className="h-10 w-10 text-indigo-400" />
                           <span className="ml-3 text-3xl font-bold text-white">NestHaven</span>
                        </div>
                        <p className="text-gray-400 text-base">
                            Your serene getaway. Unparalleled comfort and hospitality.
                        </p>
                        {/* Social media links can be added here */}
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigate</h3>
                                <ul className="mt-4 space-y-4">
                                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Home</a></li>
                                    <li><a href="#/rooms" className="text-base text-gray-300 hover:text-white">Our Rooms</a></li>
                                    <li><a href="#" className="text-base text-gray-300 hover:text-white">About Us</a></li>
                                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact</a></li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                                <ul className="mt-4 space-y-4">
                                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy Policy</a></li>
                                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                             <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact Us</h3>
                                <ul className="mt-4 space-y-4">
                                    <li className="text-base text-gray-300">123 Haven Lane, Serenity City, 12345</li>
                                    <li className="text-base text-gray-300">contact@nesthaven.com</li>
                                    <li className="text-base text-gray-300">+1 (234) 567-890</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} NestHaven Guest House. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;
