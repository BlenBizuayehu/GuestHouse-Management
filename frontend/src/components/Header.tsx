
import React, { useEffect } from 'react';
import { User } from '../../types';
import { Moon, Sun } from './ui/Icons';

interface HeaderProps {
    title: string;
    user: User | null;
}

const Header: React.FC<HeaderProps> = ({ title, user }) => {
    // Basic theme toggle logic for demonstration
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);
    
    return (
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">{title}</h2>
            <div className="flex items-center space-x-4">
                 <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                     <Sun className="h-6 w-6 hidden dark:block" />
                     <Moon className="h-6 w-6 block dark:hidden" />
                 </button>
                {user && (
                    <div className="relative">
                        <button className="flex items-center space-x-2">
                            <img className="h-9 w-9 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} alt="User avatar" />
                            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {user.firstName} {user.lastName}
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
