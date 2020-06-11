import { Component } from '@angular/core';

import { Technologies } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    technologies: string[] = [ Technologies.Angular ];
}
