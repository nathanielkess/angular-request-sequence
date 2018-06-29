import { pipe, Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { NUMBER_INCREMENTED, NUMBER } from './numbers.actions';
import { NumbersService } from '../numbers.service';
import { StateHelperService } from '../../shared/state-helper.service';

@Injectable()
export class NumbersEffects {

  constructor(
    private actions$: Actions,
    private numbersService: NumbersService,
    private stateHelper: StateHelperService
  ) {}

  @Effect()
  numberRequests: Observable<Action> = this.actions$
    .ofType(NUMBER_INCREMENTED)
    .pipe(
      tap(v => console.log('v is', v)),
      map(v => ({ type: 'hey girl'})),
    );

    @Effect()
    randomNumberRequests: Observable<Action> = this.actions$
      .ofType(NUMBER.REQUESTED)
      .pipe(
        switchMap(this.stateHelper.asyncToAction(this.numbersService.getRandomNumber())),
        map(v => ({ type: 'it worked'})),
      );
}
