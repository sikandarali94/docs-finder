import { Component, OnInit } from '@angular/core';
import {Result} from './result.model';
import {MainService} from '../main.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: Result[] = [];

  constructor(private mainService: MainService) {}

  ngOnInit() {
  }

}
