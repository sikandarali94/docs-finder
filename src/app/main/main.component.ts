import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MainService } from './main.service';
import { LogoPathsModel } from '../models/models';
import { LogoPaths } from '../constants/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    inputSubscription: Subscription;
    valueInSearch = false;
    @Input() technologies: string[];
    logoPaths: LogoPathsModel = LogoPaths;

    constructor(private mainService: MainService) { }

    ngOnInit() {
        this.mainService.getDocumentationList(this.technologies);
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
