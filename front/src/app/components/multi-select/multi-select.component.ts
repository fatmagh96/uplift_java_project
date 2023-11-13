import { Component, OnInit } from '@angular/core';

interface DropdownItem {
  id: number;
  text: string;
}
@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent  implements OnInit {
  dropdownList: string[] = [];
  selectedItems: DropdownItem[] = [];
  dropdownSettings: any = {};
   ngOnInit() {
    //  this.dropdownList = [
    //    { id: 1, text: 'Barbecue' },
    //    { id: 2, text: 'Mustard' },
    //    { id: 3, text: 'Ketchup' },
    //    { id: 4, text: 'Mayonaise' }
    //  ];

     this.dropdownList = [
        "homs",
        "felfel",
        "ma9rouna",
        "vfgsdddbhjfgbjfgjhfjg"

    ];
     this.selectedItems = [
       { id: 1, text: 'Barbecue' },
       { id: 2, text: 'Mustard' }
     ];
     this.dropdownSettings = {
       singleSelection: false,
       idField: 'id',
       textField: 'text',
       selectAllText: 'Select All',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 3,
       allowSearchFilter: true,
       limitSelection: 2
     };
   }
 }
 