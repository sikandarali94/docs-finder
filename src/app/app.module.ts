import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchBarComponent } from './main/search-bar/search-bar.component';
import { FooterComponent } from './main/footer/footer.component';
import { ResultsComponent } from './main/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchBarComponent,
    FooterComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
