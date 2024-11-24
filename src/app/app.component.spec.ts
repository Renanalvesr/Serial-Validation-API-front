import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TrackingValidatorService } from './service/tracking-validator-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TrackingFormComponent } from './tracking/tracking-form.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterOutlet,
        TrackingFormComponent,
      ],
      providers: [TrackingValidatorService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Tracking' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Tracking');
  });
});
