import { NumbersModule } from './numbers/numbers.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { NumbersComponent } from './numbers/numbers.component';

import { numberReducer } from './numbers/store/numbers.reducers';


const reducers: ActionReducerMap<any> = {
  numbers: numberReducer
};

const logger = storeLogger({
  collapsed: true,
  duration: false,
  timestamp: false,
});

const metaReducers = [logger];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NumbersModule,
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
