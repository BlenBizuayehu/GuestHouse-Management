import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            _id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            _id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
        };
    }>;
    getProfile(req: any): any;
}
