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
      description: 'Classic Italian pasta with tomato sauce and cheese.',
      ingredients: ['pasta', 'tomato', 'cheese']
    },
    {
      title: 'Chicken Curry',
      description: 'Spicy chicken curry served with rice.',
      ingredients: ['chicken', 'curry powder', 'rice']
    },
    {
      title: 'Vegetable Stir Fry',
      description: 'Mixed vegetables stir-fried in soy sauce.',
      ingredients: ['broccoli', 'carrot', 'soy sauce']
    }
  ];
}
