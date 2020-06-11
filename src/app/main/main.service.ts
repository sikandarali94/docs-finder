import { Observable, Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

import { Result } from './results/result.model';
import { Technologies } from '../constants/constants';

@Injectable()
export class MainService {
    resultObserve: Observable<any>;
    modifiedResultObserve: Subscription;
    documentationRetrieved = new Subject<boolean>();
    listFiltered = new Subject<Result[]>();
    filteredDocList: Result[];
    /* inputExists becomes true when the search bar has a value entered inside.
     */
    inputExists = new Subject<boolean>();
    docList: Result[];

    constructor(private db: AngularFireDatabase) {}

    filterByTechnology(docs: Result[], technologies: string[]) {
        return docs.filter(doc => technologies.includes(doc.technology));
    }

    getDocumentationList(technologies: string[]) {
        this.resultObserve = this.db.list('documentation').valueChanges();
        this.modifiedResultObserve = this.resultObserve.pipe(map(
            (results: Result[]) => {
                const filteredTechnologies = this.filterByTechnology(results, technologies);
                filteredTechnologies.map(
                    (doc: Result) => {
                        doc.searchString = this.mergeArrayItemsToString(
                            [doc.title, doc.technology, doc.category, ...(doc.keywords || [])]
                        );
                        switch (doc.technology) {
                            case Technologies.JS:
                                doc.image = './assets/img/javascript.png';
                                break;
                            case Technologies.Angular:
                                doc.image = './assets/img/angular.png';
                                break;
                            case Technologies.React:
                                doc.image = './assets/img/react.png';
                                break;
                            case Technologies.Vue:
                                doc.image = './assets/img/vue.svg';
                                break;
                            case Technologies.PHP:
                                doc.image = './assets/img/php.png';
                                break;
                        }
                    }
                );
                return filteredTechnologies;
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

    searchDocList(searchInput: string) {
        this.filteredDocList = this.docList.filter(
            (doc: Result) => doc.searchString.includes(searchInput)
        );
        this.listFiltered.next(this.filteredDocList);
    }
}
