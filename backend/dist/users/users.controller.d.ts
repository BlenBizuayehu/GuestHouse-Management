import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<import("./schemas/user.schema").User[]>;
    remove(id: string): Promise<any>;
}
