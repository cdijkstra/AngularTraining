import { Injectable } from '@angular/core';
import { MealModel } from '../components/meal-detail/meal.model';

@Injectable({ providedIn: 'root' })
export class MealService {
  private meals: MealModel[] = [
    {
      id: 1,
      title: 'Spaghetti',
      description: 'Classic Italian pasta with tomato sauce and cheese.',
      ingredients: ['pasta', 'tomato', 'cheese'],
      usedIngredients: 3,
      recipe: `1. Boil pasta until al dente.\n2. Prepare tomato sauce by simmering tomatoes with herbs.\n3. Mix pasta with sauce and top with cheese.\n4. Serve hot.`
    },
    {
      id: 2,
      title: 'Chicken Curry',
      description: 'Spicy chicken curry served with rice.',
      ingredients: ['chicken', 'curry powder', 'rice'],
      usedIngredients: 3,
      recipe: `1. Sauté chicken pieces until browned.\n2. Add curry powder and cook for 2 minutes.\n3. Add water and simmer until chicken is cooked.\n4. Serve with steamed rice.`
    },
    {
      id: 3,
      title: 'Vegetable Stir Fry',
      description: 'Mixed vegetables stir-fried in soy sauce.',
      ingredients: ['broccoli', 'carrot', 'soy sauce'],
      usedIngredients: 3,
      recipe: `1. Chop vegetables into bite-sized pieces.\n2. Heat oil in a wok and add vegetables.\n3. Stir fry for 5 minutes.\n4. Add soy sauce and cook for another 2 minutes.\n5. Serve immediately.`
    }
  ];

  getMeals(): MealModel[] {
    return this.meals;
  }

  getMealById(id: number): MealModel | undefined {
    return this.meals.find(meal => meal.id === id);
  }
}
