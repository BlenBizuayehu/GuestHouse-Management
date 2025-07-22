
import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../../types';
import { api, useAuth } from '../App';
import AddUserModal from './AddUserModal';
import { Edit, Trash2, UserPlus } from './ui/Icons';

const SkeletonRow: React.FC = () => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 animate-pulse">
        <td className="px-6 py-4">
            <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                <div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 hidden md:table-cell"><div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div></td>
        <td className="px-6 py-4"><div className="flex space-x-2"><div className="h-7 w-7 bg-gray-200 dark:bg-gray-700 rounded"></div><div className="h-7 w-7 bg-gray-200 dark:bg-gray-700 rounded"></div></div></td>
    </tr>
);


const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { token, user: currentUser } = useAuth();

    const fetchUsers = useCallback(async () => {
        if (!token) return;
        try {
            setLoading(true);
            setError(null);
            const data = await api.get('/users', token);
            setUsers(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    
    const handleAddUser = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    
    const handleModalSave = (newUser: User) => {
        setUsers([...users, newUser]);
        setIsModalOpen(false);
    };

    const handleDeleteUser = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/users/${userId}`, token);
                setUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
            } catch (err: any) {
                alert(`Failed to delete user: ${err.message}`);
            }
        }
    };


    if (currentUser?.role !== 'admin') {
        return <div className="p-4 text-red-700 bg-red-100 rounded">Access Denied.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Users</h2>
                <button onClick={handleAddUser} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow hover:shadow-lg">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Add User
                </button>
            </div>

            {error && <div className="p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-lg">{error}</div>}
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">User</th>
                                <th scope="col" className="px-6 py-3 hidden md:table-cell">Role</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : (
                                users.map(user => (
                                    <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                             <div className="flex items-center">
                                                <img className="h-10 w-10 rounded-full mr-4" src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} alt={`${user.firstName} ${user.lastName}`}/>
                                                <div>
                                                    <div className="font-bold">{user.firstName} {user.lastName}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button disabled className="p-2 text-gray-500 rounded-md hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-gray-700 dark:hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"><Edit className="h-5 w-5" /></button>
                                                <button onClick={() => handleDeleteUser(user._id)} disabled={user._id === currentUser._id} className="p-2 text-gray-500 rounded-md hover:bg-red-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"><Trash2 className="h-5 w-5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <AddUserModal
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
};

export default UsersPage;