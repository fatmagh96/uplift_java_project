import { Address } from "./address.model"
import { Category } from "./category.model"
import { Charity } from "./charity.model"

export class CharityDto {
  charity? : Charity;
  address? : Address;
  categories? : Category[];

  constructor(){
    this.charity = new Charity();
    this.address = new Address();
    this.categories = [];
  }
}