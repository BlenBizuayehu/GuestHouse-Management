declare class GuestDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
export declare class CreateBookingDto {
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    guest: GuestDto;
}
export {};
