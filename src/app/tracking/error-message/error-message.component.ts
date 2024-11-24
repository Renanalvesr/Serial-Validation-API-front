import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * `ErrorMessageComponent` is a component used to display an error message in the application.
 * It accepts a `message` input property and displays the message if it is not null or empty.
 *
 * @component
 * @example
 * <app-error-message [message]="'Error fetching data. Please try again later.'"></app-error-message>
 */
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  /**
   * The error message to be displayed in the component.
   *
   * This input property accepts a string or null. If the value is not null, the message will
   * be displayed; if null or empty, nothing will be shown.
   *
   * @type {string | null}
   * @default null
   * @example
   * <app-error-message [message]="'Invalid tracking number. Please check again.'"></app-error-message>
   */
  @Input() message: string | null = null;
}
