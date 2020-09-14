import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStopwatchComponent } from './app-stopwatch.component';

describe('AppStopwatchComponent', () => {
  let component: AppStopwatchComponent;
  let fixture: ComponentFixture<AppStopwatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStopwatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStopwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
