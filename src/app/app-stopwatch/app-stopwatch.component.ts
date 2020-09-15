import {Component, OnInit} from '@angular/core';
import {State} from '../models/stopwatchState';
import {
  map, mapTo,
  scan, startWith,
  switchMap, tap,
} from 'rxjs/operators';
import {fromEvent, interval, merge, NEVER, Observable} from 'rxjs';

@Component({
  selector: 'app-app-stopwatch',
  templateUrl: './app-stopwatch.component.html',
  styleUrls: ['./app-stopwatch.component.scss']
})

export class AppStopwatchComponent implements OnInit {

  // Variables
  stopwatchDisplay: string;
  events$ = null;

  // Constructor & onInit
  constructor() {}

  ngOnInit(): void {
    this.events$ = merge(
      this.getClickTrigger('pauseBtn', { isCounting: false }),
      this.getClickTrigger('resumeBtn', { isCounting: true })
    );
  }

  // Function to create trigger from parameters
  getClickTrigger(elemId: string, obj: {}): Observable<any> {
    return fromEvent(document.getElementById(elemId), 'click').pipe(mapTo(obj));
  }

  // Main function to start the stopwatch
  startStopwatch(): void {
    this.events$.pipe(
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
    )
      // Start the process and display data
      .subscribe(timerData => { this.stopwatchDisplay = timerData.value.toFixed(2); },
        error => { console.log(error); },
        () => { console.log('Completed!'); });

  }

}
