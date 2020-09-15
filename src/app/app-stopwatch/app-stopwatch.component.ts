import {Component, OnInit} from '@angular/core';
import {State} from '../models/stopwatchState';
import {
  map, mapTo,
  scan, startWith,
  switchMap, tap,
} from 'rxjs/operators';
import {fromEvent, interval, merge, NEVER, Observable} from 'rxjs';
import {StopwatchService} from '../services/stopwatch.service';

@Component({
  selector: 'app-app-stopwatch',
  templateUrl: './app-stopwatch.component.html',
  styleUrls: ['./app-stopwatch.component.scss']
})

export class AppStopwatchComponent implements OnInit {

  // Variables
  stopwatchDisplay: string;
  clickObs$ = null;

  // Constructor & onInit
  constructor(private stopwatchService: StopwatchService) {}

  ngOnInit(): void {
    this.clickObs$ = merge(
      this.getClickObservable('pauseBtn', { isCounting: false }),
      this.getClickObservable('resumeBtn', { isCounting: true }),
      this.getClickObservable('resetBtn', { value: 0 })
    );
  }

  // Function to create trigger from parameters
  getClickObservable(elemId: string, obj: {}): Observable<any> {
    return fromEvent(document.getElementById(elemId), 'click').pipe(mapTo(obj));
  }

  // Main function to start the stopwatch
  startStopwatch(): void {
    this.stopwatchService.startStopwatch(this.clickObs$).subscribe(
      timerData => { this.stopwatchDisplay = timerData.value.toFixed(2); },
      error => { console.log(error); },
      () => { console.log('Completed!'); }
    );
  }
}
