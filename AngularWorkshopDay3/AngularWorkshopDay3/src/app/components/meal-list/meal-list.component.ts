import {Component, inject} from '@angular/core';
import { MealModel } from '../meal/meal.model';
import { MealItemComponent } from '../meal/meal-item';
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'app-meal-list',
  imports: [MealItemComponent],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})

export class MealList {
  mealService = inject(MealService);
  meals: MealModel[] = this.mealService.getMeals();
}
