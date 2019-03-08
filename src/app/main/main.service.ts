import {Subject} from 'rxjs';

export class MainService {
    /* inputExists becomes true when the search bar has a value entered inside.
     */
    inputExists = new Subject<boolean>();
}
