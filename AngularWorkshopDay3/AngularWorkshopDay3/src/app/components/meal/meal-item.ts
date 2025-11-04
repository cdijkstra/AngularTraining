import { Component, Input } from '@angular/core';
import { MealModel } from './meal.model';

@Component({
  selector: 'meal-item',
  standalone: true,
  imports: [],
  templateUrl: './meal-item.html',
  styleUrl: './meal-item.css',
})
export class MealItemComponent {
  @Input() meal!: MealModel;
}

