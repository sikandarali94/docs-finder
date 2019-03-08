import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

  onSearchChange(inputValue: string) {
    /* If search bar has a value entered, indicate to the main service that input exists in the search bar.
     */
    if (inputValue.length !== 0) {
      this.mainService.inputExists.next(true);
    } else {
      this.mainService.inputExists.next(false);
    }
  }

}
