import { Charity } from "./charity.model";
import { User } from "./user.model";


export class Donation {
  id?: number;
  amount?: number;
  donor?: User;
  recipient?: Charity;
}