import { Event } from "./Event.model";
import { Address } from "./address.model";
import { Category } from "./category.model";
import { Donation } from "./donation.model";
import { File } from "./file.model";
import { User } from "./user.model";

export class Charity {
    id?: number;
    name?: string;
    rib?: string;
    phone?: string;
    email?: string;
    description?: string;
    logo?: string;
    foundationYear?: number;
    numJort?: string;
    status?: CharityStatus;
    createdAt?: Date;
    updatedAt?: Date;
    founder?: User;
    address?: Address = new Address();
    followers?: User[];
    categories?: Category[];
    files?: File[];
    charityEvents?: Event[];
    donationsReceived?: Donation[];

}

export enum CharityStatus {
    ACCEPTED,
    DECLINED,
    PENDING
  }