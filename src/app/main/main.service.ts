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

    getDocumentationList() {
        this.resultObserve = this.db.list('documentation').valueChanges();
        this.modifiedResultObserve = this.resultObserve.pipe(map(
            (results: Result[]) => {
                const filteredTechnologies = this.filterByTechnology(results, ['VueJS', 'PHP']);
                filteredTechnologies.map(
                    (doc: Result) => {
                        doc.searchString = this.mergeArrayItemsToString(
                            [doc.title, doc.technology, doc.category, ...(doc.keywords || [])]
                        );
                        switch (doc.technology) {
                            // case 'JavaScript':
                            //     doc.image = './assets/img/javascript.png';
                            //     break;
                            // case 'Angular':
                            //     doc.image = './assets/img/angular.png';
                            //     break;
                            // case 'React Redux':
                            //     doc.image = './assets/img/react.png';
                            //     break;
                            case 'VueJS':
                                doc.image = './assets/img/vue.svg';
                                break;
                            case 'PHP':
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
