export declare enum RoomStatus {
    Available = "Available",
    Occupied = "Occupied",
    Cleaning = "Cleaning",
    Maintenance = "Maintenance",
    Booked = "Booked"
}
export declare enum RoomType {
    Single = "Single",
    Double = "Double",
    Suite = "Suite",
    Family = "Family"
}
export interface Room {
    id: string;
    number: string;
    type: RoomType;
    status: RoomStatus;
    capacity: number;
    pricePerNight: number;
}
export interface Guest {
    id: string;
    name: string;
    email: string;
    phone: string;
}
export interface Booking {
    id: string;
    guestId: string;
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    totalCost: number;
    status: 'Confirmed' | 'CheckedIn' | 'CheckedOut' | 'Cancelled';
}
