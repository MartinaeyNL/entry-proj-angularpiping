import {Component, OnInit} from '@angular/core';
import {Time} from '@angular/common';
import {StopwatchService} from '../services/stopwatch.service';
import {catchError, first, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-app-stopwatch',
  templateUrl: './app-stopwatch.component.html',
  styleUrls: ['./app-stopwatch.component.scss']
})
export class AppStopwatchComponent implements OnInit {

  // Variables
  stopwatchTime: Time;

  // Constructor & onInit
  constructor(private stopwatchService: StopwatchService) {
  }

  ngOnInit(): void {
  }

  // Methods
  startStopwatch(): void {
    console.log('Start!');
    this.stopwatchService.startStopwatch()

      // Map and edit the data so it fits the front end
      .pipe(map(data => {
        console.log(data);
        return data.toLocaleString() + 's';
      }),
        // Catch errors if needed
        catchError(err => {
        return throwError(err);
      }))


      // Start the process and display data
      .subscribe(subData => {
        console.log(subData);
        this.stopwatchTime = subData;
        },
        error => {
          console.log('Error!');
        },
        () => {
          console.log('Completed!');
        });

  }

}
