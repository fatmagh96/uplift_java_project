import { Address } from "./address.model"
import { Category } from "./category.model"
import { Event } from "./Event.model"

export class EventDto {
  event? : Event;
  address? : Address;
  categories? : Category[];


  constructor(){
    this.event = new Event();
    this.address = new Address();
    this.categories = [];
  }

}