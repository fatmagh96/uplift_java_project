import { Charity } from "./charity.model";
import { Donation } from "./donation.model";

export class User {

    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirm?: string;
    isBanned?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    charity?: Charity;
    participatedEvents?: Event[];
    followedCharities?: Charity[];
    donations?: Donation[];

}