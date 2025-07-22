
import { IsString, IsNotEmpty, IsDateString, IsNumber, Min, ValidateNested, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class GuestDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    roomId: string;

    @IsDateString()
    @IsNotEmpty()
    checkInDate: string;
    
    @IsDateString()
    @IsNotEmpty()
    checkOutDate: string;

    @IsNumber()
    @Min(1)
    numberOfGuests: number;

    @ValidateNested()
    @Type(() => GuestDto)
    guest: GuestDto;
}