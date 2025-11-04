import { Component, signal } from '@angular/core';
import { MealList } from './components/meal-list/meal-list.component';

@Component({
  selector: 'app-root',
  imports: [MealList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularWorkshopDay3');
}
