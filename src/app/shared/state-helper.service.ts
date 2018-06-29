import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { curryN } from 'ramda';
import { first, map, catchError } from 'rxjs/operators';
import { of, Observable, pipe } from 'rxjs';


enum AsyncTypes {
  REQUESTED = 'REQUESTED',
  SUCCEEDED = 'SUCCEEDED',
  CANCELLED = 'CANCELLED',
  ERRORED = 'ERRORED',
}

interface RequestTypes {
  REQUESTED: string;
  SUCCEEDED: string;
  CANCELLED: string;
  ERRORED: string;
}

interface NAction extends Action {
  type: string;
  payload?: any;
  meta?: { requestType?: string, type?: string };
  error?: any;
}

@Injectable()
export class StateHelperService {

  constructor(
    private store: Store<any>,
  ) {}

  static createTypes = (base: string): RequestTypes => ({
    REQUESTED: `${base}_${AsyncTypes.REQUESTED}`,
    SUCCEEDED: `${base}_${AsyncTypes.SUCCEEDED}`,
    CANCELLED: `${base}_${AsyncTypes.CANCELLED}`,
    ERRORED: `${base}_${AsyncTypes.ERRORED}`,
  })

  createAction = (type: string, payload?: any, meta?: any): NAction => {
    return { type, payload, meta };
  }

  createRequestAction = (type: string, payload = {}, meta = {}): NAction => {
    const requestType = type.split('_').slice(-1)[0];
    return this.createAction(type, payload, {
      requestType,
      ...meta,
    });
  }

  private handleSuccess = (action: NAction) => (response) => {
    const resultAction = {
      type: AsyncTypes.SUCCEEDED,
      payload: response,
      meta: {
        type: action.type,
        root: action,
      }
    };
    this.store.dispatch(resultAction);
    return resultAction;
  }

  private handleError = (action: NAction) => (error) => {
    const resultErrorAction = {
      type: AsyncTypes.ERRORED,
      payload: error,
      meta: {
        type: action.type,
        root: action,
      },
      error: true,
    };
    this.store.dispatch(resultErrorAction);
    return of(resultErrorAction);
  }

  private _asyncToAction = (asyncMethod, action) =>
    asyncMethod.pipe(
      first(),
      map(this.handleSuccess(action)),
      catchError(this.handleError(action)),
      map(newAction => ({
        ...newAction
      }))
    )

  // tslint:disable-next-line
  asyncToAction = curryN(2, this._asyncToAction);

}
