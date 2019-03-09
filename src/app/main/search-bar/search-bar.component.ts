import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  docListSubscription: Subscription;

  documentationRetrieved = false;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.docListSubscription = this.mainService.documentationRetrieved.subscribe(
        (value) => {
          this.documentationRetrieved = value;
        }
    );
  }

  onSearchChange(inputValue: string) {
    /* If search bar has a value entered, indicate to the main service that input exists in the search bar.
     */
    if (inputValue.length !== 0) {
      this.mainService.inputExists.next(true);
      this.mainService.searchDocList(inputValue.toLowerCase().replace(/\s/g, ''));
    } else {
      this.mainService.inputExists.next(false);
    }
  }

}
