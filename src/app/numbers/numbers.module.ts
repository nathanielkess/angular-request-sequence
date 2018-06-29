import { NumbersService } from './numbers.service';
import { NumberActions } from './store/numbers.actions';
import { StateHelperService } from './../shared/state-helper.service';
import { BrowserModule } from '@angular/platform-browser';
import { NumbersStateService } from './store/numbers-state.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NumbersComponent } from './numbers.component';
import { EffectsModule } from '@ngrx/effects';
import { NumbersEffects } from './store/numbers.effects';
import { SharedModule } from '../shared/share.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    EffectsModule.forRoot([
      NumbersEffects,
    ]),
    SharedModule,
  ],
  declarations: [
    NumbersComponent,
  ],
  exports: [
    NumbersComponent,
  ],
  providers: [
    NumbersStateService,
    StateHelperService,
    NumberActions,
    NumbersService,
  ]
})
export class NumbersModule {}
