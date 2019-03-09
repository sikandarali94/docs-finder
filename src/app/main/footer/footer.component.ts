import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  date: Date = new Date(); // Store the current date.
  year: number; // Stores the current full year.

  constructor() { }

  ngOnInit() {
    this.year = this.date.getFullYear(); // Store the full year of the current date.
  }

}
