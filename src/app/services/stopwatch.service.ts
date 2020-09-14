import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {Time} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {

  private stopwatchTimeSubject: BehaviorSubject<Time> = new BehaviorSubject<Time>(null);
  public stopwatchTime: Observable<Time>;

  // Constructor
  constructor() {
    this.stopwatchTime = this.stopwatchTimeSubject.asObservable();
  }

  public startStopwatch(): any/*Observable<any>*/ {
    return timer(0, 1000);
  }
}
