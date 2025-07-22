
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, ValidateNested, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomType, RoomStatus } from '../../types';

class AmenitiesDto {
    @IsBoolean()
    @IsOptional()
    has_air_conditioning: boolean;

    @IsBoolean()
    @IsOptional()
    has_tv: boolean;

    @IsBoolean()
    @IsOptional()
    has_minibar: boolean;
}

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    number: string;

    @IsEnum(RoomType)
    @IsNotEmpty()
    type: RoomType;

    @IsEnum(RoomStatus)
    @IsOptional()
    status?: RoomStatus;

    @IsNumber()
    @IsNotEmpty()
    capacity: number;

    @IsNumber()
    @IsNotEmpty()
    pricePerNight: number;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => AmenitiesDto)
    amenities?: AmenitiesDto;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
}
