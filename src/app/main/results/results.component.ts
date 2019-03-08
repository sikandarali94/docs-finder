import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Result} from './result.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  resultObserve: Observable<any>;
  results: Result[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.resultObserve = this.db.list('documentation').valueChanges();
    this.resultObserve.subscribe(
        (results) => {
          this.results = results;
        }
    );
  }

}
