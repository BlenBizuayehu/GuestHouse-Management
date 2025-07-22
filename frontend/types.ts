
export enum RoomStatus {
  Available = 'Available',
  Occupied = 'Occupied',
  Cleaning = 'Cleaning',
  Maintenance = 'Maintenance',
}

export enum RoomType {
    Single = 'Single',
    Double = 'Double',
    Suite = 'Suite',
    Family = 'Family',
}

export interface Room {
  _id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  capacity: number;
  pricePerNight: number;
  description: string;
  amenities: {
    has_air_conditioning: boolean;
    has_tv: boolean;
    has_minibar: boolean;
  };
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Guest {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface Booking {
  _id: string;
  guest: Guest;
  room: Room;
  checkInDate: string; // ISO string format
  checkOutDate: string; // ISO string format
  numberOfGuests: number;
  totalCost: number;
  status: 'Confirmed' | 'CheckedIn' | 'CheckedOut' | 'Cancelled';
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff';
}