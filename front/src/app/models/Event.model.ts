import { Address } from "./address.model";
import { Category } from "./category.model";
import { Charity } from "./charity.model";
import { User } from "./user.model";



export class Event {
  id?: number;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;

  
  eventCreator?: Charity;
  participants?: User[];
  eventAddress?: Address;
  eventCategories?: Category[];

} 