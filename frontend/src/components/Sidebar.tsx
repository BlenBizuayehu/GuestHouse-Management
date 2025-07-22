
import React from 'react';
import { User } from '../../types';
import { BarChart2, BedDouble, Home, Hotel, LogOut, Sparkles, UserPlus, Users } from './ui/Icons';

const SIDEBAR_LINKS = [
    { name: 'Dashboard', href: '#/dashboard', icon: Home, adminOnly: false },
    { name: 'Rooms', href: '#/dashboard/rooms', icon: BedDouble, adminOnly: false },
    { name: 'Bookings', href: '#/dashboard/bookings', icon: Users, adminOnly: false },
    { name: 'Reports', href: '#/dashboard/reports', icon: BarChart2, adminOnly: false },
    { name: 'Users', href: '#/dashboard/users', icon: UserPlus, adminOnly: true },
    { name: 'AI Tools', href: '#/dashboard/ai-tools', icon: Sparkles, adminOnly: false },
];

interface SidebarProps {
    activePage: string;
    onLogout: () => void;
    user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onLogout, user }) => {
    
    const getPageNameFromHref = (href: string) => {
        const hash = href.replace('#/dashboard/', '').toLowerCase();
        let pageName = hash.charAt(0).toUpperCase() + hash.slice(1);
        if (hash === 'ai-tools') pageName = 'AITools';
        if (hash === 'users') pageName = 'Users';
        if (href === '#/dashboard') pageName = 'Dashboard';
        return pageName;
    }
    
    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col hidden lg:flex">
            <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200 dark:border-gray-700">
                <Hotel className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">NestHaven</h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
                {SIDEBAR_LINKS.map((link) => {
                    if (link.adminOnly && user?.role !== 'admin') {
                        return null;
                    }
                    const pageName = getPageNameFromHref(link.href);
                    const isActive = activePage === pageName;
                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                                isActive
                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                            }`}
                        >
                            <link.icon className="h-5 w-5 mr-3" />
                            <span>{link.name}</span>
                        </a>
                    );
                })}
            </nav>
            <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={onLogout}
                    className="flex w-full items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
