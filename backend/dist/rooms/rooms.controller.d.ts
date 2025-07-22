import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    create(createRoomDto: CreateRoomDto): Promise<import("./schemas/room.schema").Room>;
    findAll(): Promise<import("./schemas/room.schema").Room[]>;
    findOne(id: string): Promise<import("./schemas/room.schema").Room>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<import("./schemas/room.schema").Room>;
    remove(id: string): Promise<any>;
}
