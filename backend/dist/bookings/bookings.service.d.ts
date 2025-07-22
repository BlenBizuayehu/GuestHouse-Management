import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GuestsService } from '../guests/guests.service';
import { RoomDocument } from '../rooms/schemas/room.schema';
export declare class BookingsService {
    private bookingModel;
    private roomModel;
    private guestsService;
    constructor(bookingModel: Model<BookingDocument>, roomModel: Model<RoomDocument>, guestsService: GuestsService);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(): Promise<Booking[]>;
}
