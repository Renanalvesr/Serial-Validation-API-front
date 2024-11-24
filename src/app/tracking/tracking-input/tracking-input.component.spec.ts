import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingInputComponent } from './tracking-input.component';

describe('TrackingInputComponent', () => {
  let component: TrackingInputComponent;
  let fixture: ComponentFixture<TrackingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
