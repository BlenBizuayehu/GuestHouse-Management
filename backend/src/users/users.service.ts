
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto, role: 'admin' | 'staff' = 'staff'): Promise<UserDocument> {
    const createdUser = new this.userModel({ ...createUserDto, role });
    return createdUser.save();
  }

  async findOne(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async findById(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(id).exec();
  }
  
  async findAll(): Promise<User[]> {
      return this.userModel.find().sort({ createdAt: -1 }).exec();
  }
  
  async count(): Promise<number> {
      return this.userModel.countDocuments().exec();
  }

  async remove(id: string): Promise<any> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      return null;
    }
    return { message: 'User deleted successfully' };
  }
}