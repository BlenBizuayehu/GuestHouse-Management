import { RoomStatus } from './types';

// Mock Data has been moved to the NestJS backend.
// The frontend will now fetch data from the API.

// UI Constants
export const STATUS_COLORS: Record<RoomStatus, string> = {
    [RoomStatus.Available]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [RoomStatus.Occupied]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    [RoomStatus.Cleaning]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    [RoomStatus.Maintenance]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};