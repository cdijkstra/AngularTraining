import { Component, signal } from '@angular/core';
import { Meal } from './components/meal/meal';

@Component({
  selector: 'app-root',
  imports: [Meal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularWorkshopDay3');
}
