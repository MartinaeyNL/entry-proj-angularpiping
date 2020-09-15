import { Injectable } from '@angular/core';
import {BehaviorSubject, interval, NEVER, Observable, timer} from 'rxjs';
import {Time} from '@angular/common';
import {map, scan, startWith, switchMap, tap} from 'rxjs/operators';
import {State} from '../models/stopwatchState';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {

  constructor() {}

  // Main Function for the stopwatch
  public startStopwatch(clickObs): Observable<any> {
    return clickObs.pipe(
      // First value emitted
      startWith({
        isCounting: true,
        speed: 100,
        value: 0,
        increase: 0.1
      }),
      // Scan to accumulate/merge objects
      scan((state, curr) => Object.assign({}, state, curr), []),
      tap((state: State) => console.log(state)),
      switchMap((state: State) => {
        return state.isCounting
          ? interval(state.speed).pipe(
            map(() => {
              state.value += state.increase;
              return state;
            }))
          : NEVER;
      })
    );
  }
}
