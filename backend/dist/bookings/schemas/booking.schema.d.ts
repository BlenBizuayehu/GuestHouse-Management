import { Document, Types } from 'mongoose';
import { Guest } from '../../guests/schemas/guest.schema';
import { Room } from '../../rooms/schemas/room.schema';
export type BookingDocument = Booking & Document;
export declare class Booking {
    guest: Guest;
    room: Room;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfGuests: number;
    totalCost: number;
    status: string;
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking, any> & Booking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>, {}> & import("mongoose").FlatRecord<Booking> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
