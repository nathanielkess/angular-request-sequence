import { Injectable } from '@angular/core';
import { StateHelperService } from './../../shared/state-helper.service';

export const NUMBER_INCREMENTED = 'NUMBER_INCREMENTED';
export const NUMBER_DECREMENTED = 'NUMBER_DECREMENTED';
export const NUMBER = StateHelperService.createTypes('NUMBER');

@Injectable()
export class NumberActions {

  constructor(
    private stateHelper: StateHelperService,
  ) {}

  incremented = () => this.stateHelper.createAction(NUMBER_INCREMENTED);
  decremented = () => this.stateHelper.createAction(NUMBER_DECREMENTED);
  requested = () => this.stateHelper.createRequestAction(NUMBER.REQUESTED);

}
