import { Charity } from './charity.model'; // Assuming Charity model exists
import { Cities } from './enums/cities.enum';


export class Address {
  id?: number;
  street?: string;
  city?: Cities;
  zipCode?: string;
  charity?: Charity;
}