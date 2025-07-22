import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './schemas/room.schema';
export declare class RoomsService {
    private roomModel;
    constructor(roomModel: Model<RoomDocument>);
    create(createRoomDto: CreateRoomDto): Promise<Room>;
    findAll(): Promise<Room[]>;
    findOne(id: string): Promise<RoomDocument>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room>;
    remove(id: string): Promise<any>;
    findAllPublic(): Promise<Room[]>;
    findOnePublic(id: string): Promise<Room>;
}
