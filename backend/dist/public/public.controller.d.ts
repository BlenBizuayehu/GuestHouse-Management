import { BookingsService } from '../bookings/bookings.service';
import { RoomsService } from '../rooms/rooms.service';
export declare class PublicController {
    private readonly roomsService;
    private readonly bookingsService;
    constructor(roomsService: RoomsService, bookingsService: BookingsService);
    findAllRooms(): Promise<import("../rooms/schemas/room.schema").Room[]>;
    findOneRoom(id: string): Promise<import("../rooms/schemas/room.schema").Room>;
    createBooking(bookingData: any): Promise<import("mongoose").Document<unknown, {}, import("../bookings/schemas/booking.schema").BookingDocument, {}> & import("../bookings/schemas/booking.schema").Booking & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
