
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AITools from '../src/components/AITools';
import Bookings from '../src/components/Bookings';
import Dashboard from '../src/components/Dashboard';
import Header from '../src/components/Header';
import HomePage from '../src/components/HomePage';
import LoginPage from '../src/components/LoginPage';
import PublicFooter from '../src/components/PublicFooter';
import PublicNavbar from '../src/components/PublicNavbar';
import PublicRoomsPage from '../src/components/PublicRoomsPage';
import Reports from '../src/components/Reports';
import Rooms from '../src/components/Rooms';
import Sidebar from '../src/components/Sidebar';
import { Hotel } from '../src/components/ui/Icons';
import UsersPage from '../src/components/UsersPage';
import { User } from '../types';
import BookingConfirmationPage from './components/BookingConfirmationPage';
import PublicBookingPage from './components/PublicBookingPage';

// API wrapper for authenticated requests
export const api = {
    request: async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, token: string | null, body?: any) => {
        const headers: HeadersInit = {
            'Authorization': `Bearer ${token}`,
        };
        const options: RequestInit = {
            method,
            headers,
        };

        if (body) {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`http://localhost:3001/api${endpoint}`, options);
        
        if (response.status === 401) {
             throw new Error('Unauthorized');
        }
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }
        return response.json();
    },
    get: (endpoint: string, token: string | null) => api.request('GET', endpoint, token),
    post: (endpoint: string, token: string | null, body: any) => api.request('POST', endpoint, token, body),
    put: (endpoint: string, token: string | null, body: any) => api.request('PUT', endpoint, token, body),
    delete: (endpoint: string, token: string | null) => api.request('DELETE', endpoint, token),
};

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const PublicLayout: React.FC = () => {
    const [page, setPage] = useState('home');

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            console.log('Current hash:', hash); // Debugging
            setPage(hash || 'home');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderPage = () => {
        console.log('Rendering page for:', page); // Debugging
        
        // Handle /book/:roomId route
        if (page.startsWith('/book/')) {
            const roomId = page.split('/book/')[1];
            return <PublicBookingPage roomId={roomId} />;
        }
        
        // Handle other routes
        switch (page) {
            case '/rooms':
                return <PublicRoomsPage />;
            case '/booking-confirmation':
                return <BookingConfirmationPage />;
            case '/login':
                window.location.hash = '#/dashboard/login';
                return null;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <PublicNavbar />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <PublicFooter />
        </div>
    );
};


const AppContent: React.FC = () => {
    const [activePage, setActivePage] = useState('Dashboard');
    const { logout, user } = useAuth();

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#/dashboard/', '').toLowerCase() || 'dashboard';
            let pageName = hash.charAt(0).toUpperCase() + hash.slice(1);
            if (hash === 'ai-tools') pageName = 'AITools';
            if (hash === 'users') pageName = 'Users';
            setActivePage(pageName);
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Set initial page

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderPage = () => {
        switch (activePage) {
            case 'Dashboard': return <Dashboard />;
            case 'Rooms': return <Rooms />;
            case 'Bookings': return <Bookings />;
            case 'Reports': return <Reports />;
            case 'AITools': return <AITools />;
            case 'Users': 
                if (user?.role === 'admin') return <UsersPage />;
                // Fallback for non-admins trying to access via URL
                return <Dashboard />; 
            default: return <Dashboard />;
        }
    };
    
    const getPageTitle = (page: string) => {
        if(page === 'AITools') return 'AI Tools';
        return page;
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar activePage={activePage} onLogout={logout} user={user} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={getPageTitle(activePage)} user={user} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        window.location.hash = '/'; // Redirect to public home on logout
    }, []);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                try {
                    const profile = await api.get('/auth/profile', storedToken);
                    setToken(storedToken);
                    setUser(profile);
                } catch (error) {
                    console.error("Session validation failed", error);
                    logout();
                }
            }
            setIsLoading(false);
        };
        checkLoggedIn();
    }, [logout]);
    
    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(newUser);
        window.location.hash = '#/dashboard';
    };

    const authContextValue = {
        token,
        user,
        login,
        logout,
        isLoading,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Root />
        </AuthProvider>
    );
};

const Root: React.FC = () => {
    const { token, login, isLoading } = useAuth();
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="flex items-center space-x-3">
                    <Hotel className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                     <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">Loading NestHaven...</span>
                </div>
            </div>
        );
    }

    const isDashboardRoute = hash.startsWith('#/dashboard');

    if (!token && isDashboardRoute) {
        return <LoginPage onLogin={login} />;
    }
    
    if (token && isDashboardRoute) {
        return <AppContent />;
    }

    // Default to public site
    return <PublicLayout />;
};

export default App;
