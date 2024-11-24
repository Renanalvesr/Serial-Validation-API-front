import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TrackingFormComponent } from '../tracking/tracking-form.component';
import { TrackingValidatorService } from './tracking-validator-service.service';

describe('TrackingFormComponent', () => {
  let component: TrackingFormComponent;
  let fixture: ComponentFixture<TrackingFormComponent>;
  let trackingValidatorService: TrackingValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TrackingFormComponent],
      providers: [TrackingValidatorService],
    });

    fixture = TestBed.createComponent(TrackingFormComponent);
    component = fixture.componentInstance;
    trackingValidatorService = TestBed.inject(TrackingValidatorService);

    fixture.detectChanges();
  });

  it('should handle errors when getProductByTracking fails', fakeAsync(() => {
    const mockErrorResponse = new Error('Error fetching product. Please try again later.');
    spyOn(trackingValidatorService, 'getProductByTracking').and.returnValue(
      throwError(() => mockErrorResponse)
    );

    component.trackingForm.setValue({
      trackingNumber: '123e4567-e89b-12d3-a456-426614174000',
    });

    component.onSubmit();

    tick(); 
    fixture.detectChanges();

    expect(component.errorMessage).toBe(
      'Error fetching product. Please try again later.' 
    );

    expect(component.product).toBeNull();

    expect(component.loading).toBeFalse();

    const errorMessageElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain(
      'Error fetching product. Please try again later.'
    );
  }));
});
