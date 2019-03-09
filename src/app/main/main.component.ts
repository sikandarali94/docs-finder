import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainService} from './main.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  inputSubscription: Subscription;
  valueInSearch = false;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getDocumentationList();
    this.inputSubscription = this.mainService.inputExists.subscribe(
        (value) => {
          this.valueInSearch = value;
        }
    );
  }

  ngOnDestroy() {
    this.inputSubscription.unsubscribe();
  }

}
