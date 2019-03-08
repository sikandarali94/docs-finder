import { Component, OnInit } from '@angular/core';
import {MainService} from './main.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  inputSubscription$: Subscription;
  valueInSearch = false;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.inputSubscription$ = this.mainService.inputExists.subscribe(
        (value) => {
          this.valueInSearch = value;
        }
    );
  }

}
