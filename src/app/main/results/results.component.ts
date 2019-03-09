import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Result} from './result.model';
import {AngularFireDatabase} from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  resultObserve: Observable<any>;
  modifiedResultObserve: Observable<any>;
  results: Result[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.resultObserve = this.db.list('documentation').valueChanges();
    this.modifiedResultObserve = this.resultObserve.pipe(map(
        (results: Result[]) => {
          results.map(
              (item: Result) => {
                item.searchString = this.mergeArrayItemsToString(
                    [item.title, item.technology, item.category, ...item.keywords]
                );
                switch (item.technology) {
                  case 'JavaScript':
                    item.image = './assets/img/javascript.png';
                    break;
                  case 'Angular':
                    item.image = './assets/img/angular.png';
                    break;
                  case 'React Redux':
                    item.image = './assets/img/react.png';
                    break;
                }
              }
          );
          return results;
        }
    ));
    this.modifiedResultObserve.subscribe(
        (result) => {
          this.results = result;
        }
    );
  }

  lowerStringRemoveSpace (value: string) {
    return value.toLowerCase().replace(/\s/g, '');
  }

  mergeArrayItemsToString (arr: string[]) {
    let mergedString = '';
    arr.forEach(item => {
      mergedString = mergedString + this.lowerStringRemoveSpace(item);
    });
    return mergedString;
  }

}
