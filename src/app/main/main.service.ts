import {Observable, Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Result} from './results/result.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {Injectable} from '@angular/core';

@Injectable()
export class MainService {
    resultObserve: Observable<any>;
    modifiedResultObserve: Subscription;
    documentationRetrieved = new Subject<boolean>();
    /* inputExists becomes true when the search bar has a value entered inside.
     */
    inputExists = new Subject<boolean>();
    docList: Result[];

    constructor(private db: AngularFireDatabase) {}

    getDocumentationList() {
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
        )).subscribe(
            (modifiedDocList) => {
                this.docList = modifiedDocList;
                this.documentationRetrieved.next(true);
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
