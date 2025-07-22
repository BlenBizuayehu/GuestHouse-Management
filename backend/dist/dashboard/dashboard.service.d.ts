import { Model } from 'mongoose';
import { RoomDocument } from '../rooms/schemas/room.schema';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
export declare class DashboardService {
    private roomModel;
    private bookingModel;
    constructor(roomModel: Model<RoomDocument>, bookingModel: Model<BookingDocument>);
    getDashboardStats(): Promise<{
        totalRooms: number;
        availableRooms: number;
        occupiedRooms: number;
        currentGuests: number;
        recentCheckIns: (import("mongoose").Document<unknown, {}, BookingDocument, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        upcomingCheckOuts: (import("mongoose").Document<unknown, {}, BookingDocument, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
}
