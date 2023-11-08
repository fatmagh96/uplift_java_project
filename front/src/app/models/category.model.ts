import { Charity } from "./charity.model";
import { Categories } from "./enums/categories.enum";

export class Category {
    id?: number;
    categoryName?: Categories;
    charities?: Charity[];
}