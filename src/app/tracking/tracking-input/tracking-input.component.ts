import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
/**
 * Component for an input field that integrates with Angular's `ControlValueAccessor`.
 * This allows it to be used as a form control in Angular forms (ReactiveForms or Template-Driven Forms).
 * It is typically used for collecting and validating tracking numbers.
 * 
 * The component implements the `ControlValueAccessor` interface to be used within Angular forms and provides
 * methods for writing and reading values, as well as handling changes and touches.
 *
 * @component
 * @example
 * <app-tracking-input [control]="trackingForm.get('trackingNumber')"></app-tracking-input>
 *
 * @Input {AbstractControl} control - The `AbstractControl` instance that represents the form control this input is bound to.
 * 
 * The component binds to a form control and updates the value when the input changes, allowing it to be used
 * with Angular's form validation and change detection.
 *
 * Implements `ControlValueAccessor` to provide custom form control behavior:
 * - `writeValue`: Updates the component's value.
 * - `registerOnChange`: Registers a callback to be called when the input value changes.
 * - `registerOnTouched`: Registers a callback to be called when the input is touched.
 * - `setDisabledState`: Provides a method to set the disabled state of the input.
 */
@Component({
  selector: 'app-tracking-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tracking-input.component.html',
  styleUrls: ['./tracking-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrackingInputComponent),
      multi: true,
    },
  ],
})
export class TrackingInputComponent implements ControlValueAccessor {
  @Input() control!: AbstractControl;
  value: string = '';

  // Functions for handling changes and touches
  onChange = (value: string) => {};
  onTouched = () => {};

  /**
   * Writes a value to the input field.
   * @param {string} value - The value to set.
   */
  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  /**
   * Registers a function to call when the input value changes.
   * @param {(value: string) => void} fn - The function to be called when the value changes.
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a function to call when the input is touched.
   * @param {() => void} fn - The function to be called when the input is touched.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the input element.
   * @param {boolean} isDisabled - Whether the input should be disabled or not.
   */
  setDisabledState(isDisabled: boolean): void {}
}
