import { Component } from '@angular/core';
import { MealModel } from './meal.model';

@Component({
  selector: 'app-meal',
  imports: [],
  templateUrl: './meal.html',
  styleUrl: './meal.css',
})


export class Meal {
  meals: MealModel[] = [
    {
      name: 'Spaghetti',
      ingredients: ['pasta', 'tomato', 'cheese']
    },
    {
      name: 'Chicken Curry',
      ingredients: ['chicken', 'curry powder', 'rice']
    },
    {
      name: 'Vegetable Stir Fry',
      ingredients: ['broccoli', 'carrot', 'soy sauce']
    }
  ];
}
