import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/schemas/user.schema';
type JwtPayload = {
    sub: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'staff';
};
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<Partial<User & {
        _id: string;
    }>>;
}
export {};
