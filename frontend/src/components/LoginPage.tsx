
import React, { useState } from 'react';
import { User } from '../../types';
import { Hotel } from './ui/Icons';

interface LoginPageProps {
    onLogin: (token: string, user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = `http://localhost:3001/api/auth/${isLogin ? 'login' : 'register'}`;
        const body = isLogin ? { email, password } : { email, password, firstName, lastName };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred.');
            }

            onLogin(data.access_token, data.user);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Hotel className="mx-auto h-12 w-auto text-indigo-600 dark:text-indigo-400" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Welcome to NestHaven
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
                    <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setIsLogin(true)} className={`${isLogin ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'} whitespace-nowrap border-b-2 py-3 px-1 text-base font-medium`}>
                                Sign In
                            </button>
                            <button onClick={() => setIsLogin(false)} className={`${!isLogin ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'} whitespace-nowrap border-b-2 py-3 px-1 text-base font-medium`}>
                                Register
                            </button>
                        </nav>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && (
                             <div className="flex space-x-4">
                                <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First Name"/>
                                <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last Name"/>
                            </div>
                        )}
                        
                        <input id="email-address" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                        
                        <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"/>

                        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

                        <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                            {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Create account')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
