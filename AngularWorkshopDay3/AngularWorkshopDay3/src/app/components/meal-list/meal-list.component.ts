import { Component } from '@angular/core';
import { MealModel } from '../meal/meal.model';
import { MealItemComponent } from '../meal/meal-item';

@Component({
  selector: 'app-meal-list',
  imports: [MealItemComponent],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})


export class MealList {
  meals: MealModel[] = [
    {
      title: 'Spaghetti',
      ingredients: ['pasta', 'tomato', 'cheese']
    },
    {
      title: 'Chicken Curry',
      ingredients: ['chicken', 'curry powder', 'rice']
    },
    {
      title: 'Vegetable Stir Fry',
      ingredients: ['broccoli', 'carrot', 'soy sauce']
    }
  ];
}
