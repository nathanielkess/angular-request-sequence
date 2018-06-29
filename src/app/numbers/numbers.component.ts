import { NumbersStateService } from './store/numbers-state.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent {

  constructor(
    private store: Store<any>,
    private numbersState: NumbersStateService,
  ) { }

  currentNumber$ = this.numbersState.getNumber$;

  handleUp = (): void => {
    this.numbersState.onIncrement();
  }

  handleDown = (): void => {
    this.numbersState.onDecrement();
  }

  handleRequestRandom = (): void => {
    this.numbersState.onRequestNumber();
  }

}
