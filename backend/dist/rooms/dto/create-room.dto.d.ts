import { RoomType, RoomStatus } from '../../types';
declare class AmenitiesDto {
    has_air_conditioning: boolean;
    has_tv: boolean;
    has_minibar: boolean;
}
export declare class CreateRoomDto {
    number: string;
    type: RoomType;
    status?: RoomStatus;
    capacity: number;
    pricePerNight: number;
    description?: string;
    amenities?: AmenitiesDto;
    images?: string[];
}
export {};
