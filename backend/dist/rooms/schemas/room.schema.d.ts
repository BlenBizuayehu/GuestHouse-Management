import { Document } from 'mongoose';
import { RoomType, RoomStatus } from '../../types';
export type RoomDocument = Room & Document;
declare class Amenities {
    has_air_conditioning: boolean;
    has_tv: boolean;
    has_minibar: boolean;
}
export declare class Room {
    number: string;
    type: RoomType;
    status: RoomStatus;
    capacity: number;
    pricePerNight: number;
    description: string;
    amenities: Amenities;
    images: string[];
}
export declare const RoomSchema: import("mongoose").Schema<Room, import("mongoose").Model<Room, any, any, any, Document<unknown, any, Room, any> & Room & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Room, Document<unknown, {}, import("mongoose").FlatRecord<Room>, {}> & import("mongoose").FlatRecord<Room> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
