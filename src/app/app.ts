import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Battery } from '../components/battery/battery';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Battery],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AngularWorkshopDay1');
}
