import { Model } from 'mongoose';
import { Room, RoomDocument } from '../rooms/schemas/room.schema';
export declare class PublicController {
    private roomModel;
    constructor(roomModel: Model<RoomDocument>);
    findAllRooms(): Promise<(import("mongoose").Document<unknown, {}, RoomDocument, {}> & Room & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
