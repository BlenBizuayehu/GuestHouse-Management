import { Model } from 'mongoose';
import { BookingDocument } from '../bookings/schemas/booking.schema';
export declare class ReportsService {
    private bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    getRevenueByRoomType(): Promise<{
        name: string;
        value: number;
    }[]>;
}
