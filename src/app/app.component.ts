import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrackingFormComponent } from './tracking/tracking-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrackingFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Tracking';
}
