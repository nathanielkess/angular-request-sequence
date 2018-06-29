import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { NumberActions } from './numbers.actions';
import { Observable, of } from 'rxjs';

@Injectable()
export class NumbersStateService {
  constructor(
    private store: Store<any>,
    private numberActions: NumberActions,
  ) {}

  // selectors
  getNumber$: Observable<number> = of(1);

  // dispatchers
  onIncrement = (): void => this.store.dispatch(this.numberActions.incremented());
  onDecrement = (): void => this.store.dispatch(this.numberActions.decremented());
  onRequestNumber = (): void => this.store.dispatch(this.numberActions.requested());
}
