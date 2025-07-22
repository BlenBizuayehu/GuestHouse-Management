import { Document } from 'mongoose';
export type GuestDocument = Guest & Document;
export declare class Guest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
export declare const GuestSchema: import("mongoose").Schema<Guest, import("mongoose").Model<Guest, any, any, any, Document<unknown, any, Guest, any> & Guest & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Guest, Document<unknown, {}, import("mongoose").FlatRecord<Guest>, {}> & import("mongoose").FlatRecord<Guest> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
