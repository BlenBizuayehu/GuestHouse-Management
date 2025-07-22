
import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: any) {
    const payload = { 
        email: user.email, 
        sub: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName,
        role: user.role
    };
    
    // Create a user object to return without the Mongoose document overhead
    const userForClient = {
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: userForClient,
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // toObject() removes Mongoose-specific properties
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  async register(createUserDto: CreateUserDto) {
     const userCount = await this.usersService.count();
     
     if (userCount > 0) {
        throw new ForbiddenException('Public registration is disabled. Contact an administrator to create an account.');
     }

     const existingUser = await this.usersService.findOne(createUserDto.email);
     if (existingUser) {
        throw new BadRequestException('Email already registered');
     }

     // First user becomes admin
     const user = await this.usersService.create(createUserDto, 'admin');

     return this.generateToken(user);
  }
}
