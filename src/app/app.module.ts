import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MainComponent } from './main/main.component';
import { SearchBarComponent } from './main/search-bar/search-bar.component';
import { FooterComponent } from './main/footer/footer.component';
import { ResultsComponent } from './main/results/results.component';
import { MainService } from './main/main.service';

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
        AngularFireModule.initializeApp(environment.firebase),
        FlexLayoutModule,
        AngularFireDatabaseModule
    ],
    providers: [MainService],
    bootstrap: [AppComponent]
})
export class AppModule { }
