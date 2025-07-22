import { Model } from 'mongoose';
import { GuestDocument } from 'src/guests/schemas/guest.schema';
import { RoomsService } from 'src/rooms/rooms.service';
import { GuestsService } from '../guests/guests.service';
import { RoomDocument } from '../rooms/schemas/room.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingDocument } from './schemas/booking.schema';
export declare class BookingsService {
    private bookingModel;
    private roomModel;
    private guestsService;
    private guestModel;
    private roomsService;
    constructor(bookingModel: Model<BookingDocument>, roomModel: Model<RoomDocument>, guestsService: GuestsService, guestModel: Model<GuestDocument>, roomsService: RoomsService);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    createPublicBooking(bookingData: any): Promise<import("mongoose").Document<unknown, {}, BookingDocument, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
