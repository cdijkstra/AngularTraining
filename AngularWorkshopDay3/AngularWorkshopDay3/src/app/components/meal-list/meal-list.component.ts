import {Component, inject} from '@angular/core';
import { MealModel } from '../meal-detail/meal.model';
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
  meals: MealModel[] = [];

  ngOnInit(): void {
    this.mealService.fetchGenericRecipes('asian').subscribe((meals: MealModel[]) => {
      this.meals = meals;
    });
  }
}
