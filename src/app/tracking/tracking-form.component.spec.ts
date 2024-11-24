import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TrackingFormComponent } from './tracking-form.component';
import { TrackingValidatorService } from '../service/tracking-validator-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { TrackingInputComponent } from './tracking-input/tracking-input.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TrackingFormComponent', () => {
  let component: TrackingFormComponent;
  let fixture: ComponentFixture<TrackingFormComponent>;
  let trackingValidatorService: jasmine.SpyObj<TrackingValidatorService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TrackingValidatorService', [
      'getProductByTracking',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        TrackingInputComponent,
        ProductDisplayComponent,
        ErrorMessageComponent,
        TrackingFormComponent,
      ],
      providers: [{ provide: TrackingValidatorService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackingFormComponent);
    component = fixture.componentInstance;
    trackingValidatorService = TestBed.inject(
      TrackingValidatorService
    ) as jasmine.SpyObj<TrackingValidatorService>;

    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the trackingForm with a trackingNumber control', () => {
    expect(component.trackingForm.contains('trackingNumber')).toBeTrue();
  });

  it('should make the trackingNumber control required', () => {
    const control = component.trackingForm.get('trackingNumber');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('should call getProductByTracking when the form is valid and submitted', fakeAsync(() => {
    const mockProduct = {
      name: 'Product 1',
      description: 'Product description',
    };

    trackingValidatorService.getProductByTracking.and.returnValue(
      of(mockProduct)
    );

    component.trackingForm.setValue({
      trackingNumber: '123e4567-e89b-12d3-a456-426614174000',
    });

    expect(component.trackingForm.valid).toBeTrue();

    component.onSubmit();

    tick(); 
    fixture.detectChanges();

    expect(trackingValidatorService.getProductByTracking).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000'
    );

    expect(component.product).toEqual(mockProduct);
    expect(component.loading).toBeFalse();
  }));
  
  it('should handle errors when getProductByTracking fails', fakeAsync(() => {
    const mockErrorResponse = new Error('Product fetch error');
    trackingValidatorService.getProductByTracking.and.returnValue(
      throwError(() => mockErrorResponse) 
    );
  
    component.trackingForm.setValue({
      trackingNumber: '123e4567-e89b-12d3-a456-426614174000',
    });
  
    component.onSubmit();
  
    tick();
    fixture.detectChanges(); 
  
    expect(component.errorMessage).toBe(
      'Product fetch error'
    );
  
    expect(component.product).toBeNull();
  
    expect(component.loading).toBeFalse();
  
    const errorMessageElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain(
      'Product fetch error' 
    );
  }));
  
  

});
