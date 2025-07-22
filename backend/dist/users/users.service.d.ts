import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto, role?: 'admin' | 'staff'): Promise<UserDocument>;
    findOne(email: string): Promise<UserDocument | undefined>;
    findById(id: string): Promise<UserDocument | undefined>;
    findAll(): Promise<User[]>;
    count(): Promise<number>;
    remove(id: string): Promise<any>;
}
