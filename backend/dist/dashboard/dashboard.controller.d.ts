import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        totalRooms: number;
        availableRooms: number;
        occupiedRooms: number;
        currentGuests: number;
        recentCheckIns: (import("mongoose").Document<unknown, {}, import("../bookings/schemas/booking.schema").BookingDocument, {}> & import("../bookings/schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        upcomingCheckOuts: (import("mongoose").Document<unknown, {}, import("../bookings/schemas/booking.schema").BookingDocument, {}> & import("../bookings/schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
}
