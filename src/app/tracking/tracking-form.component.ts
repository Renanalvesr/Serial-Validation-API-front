import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrackingValidatorService } from '../service/tracking-validator-service.service';
import { CommonModule } from '@angular/common';
import { TrackingInputComponent } from './tracking-input/tracking-input.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * TrackingFormComponent is a form component that allows the user to input a tracking number,
 * which is then used to fetch the associated product details from an external service.
 * It includes a loading spinner during the request, and displays either the product data or an error message based on the result.
 */
@Component({
  selector: 'app-tracking-form',
  standalone: true,
  templateUrl: './tracking-form.component.html',
  imports: [
    CommonModule,
    TrackingInputComponent,
    ProductDisplayComponent,
    ErrorMessageComponent,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./tracking-form.component.scss'],
})
export class TrackingFormComponent implements OnInit {
  
  /**
   * The form group containing the tracking number input.
   * @type {FormGroup}
   */
  trackingForm!: FormGroup;
  
  /**
   * A flag to indicate if the form submission is in progress (loading state).
   * @type {boolean}
   * @default false
   */
  loading: boolean = false;

  /**
   * Holds the product details fetched from the service.
   * @type {any}
   * @default null
   */
  product: any = null;

  /**
   * Stores error messages that will be displayed if something goes wrong.
   * @type {string | null}
   * @default null
   */
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private trackingValidator: TrackingValidatorService
  ) {}

  /**
   * Lifecycle hook that initializes the form group with tracking number control.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.trackingForm = this.fb.group({
      trackingNumber: [
        '',
        [Validators.required, Validators.pattern(/^[a-fA-F0-9\-]{36}$/)],
      ],
    });
  }

  /**
   * Submits the tracking form and fetches product details from the service.
   * Displays loading spinner while fetching and shows either product data or an error message.
   * @method onSubmit
   */
  onSubmit(): void {
    if (this.trackingForm.valid) {
      const trackingNumber = this.trackingForm.value.trackingNumber;
      this.loading = true;
      this.errorMessage = null;

      this.trackingValidator.getProductByTracking(trackingNumber).subscribe(
        (product) => {
          this.loading = false;
          this.product = product;
        },
        (error) => {
          this.loading = false;
          this.product = null;
          this.errorMessage = error.message || 'Error fetching product. Please try again later.';
        }
      );
    }
  }
}
