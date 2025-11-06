import { Component } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { MealModel } from '../meal-detail/meal.model';

@Component({
  selector: 'app-swipe',
  standalone: true,
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css'],
  imports: []
})
export class SwipeComponent {
  meal: MealModel | undefined;
  swipedIds: number[] = [];
  allMeals: MealModel[] = [];
  favorites: number[] = [];
  showDetails = false;

  constructor(private mealService: MealService) {
    this.loadAllMeals();
    this.loadFavorites();
    this.loadRandomMeal();
  }

  loadAllMeals() {
    // Get all cached meals from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('meals_')) {
        const storedMeals = localStorage.getItem(key);
        if (storedMeals) {
          this.allMeals.push(...JSON.parse(storedMeals));
        }
      }
    }
    // Remove duplicates
    this.allMeals = this.allMeals.filter((meal, index, self) =>
      index === self.findIndex(m => m.id === meal.id)
    );
  }

  loadFavorites() {
    const stored = localStorage.getItem('favorites');
    this.favorites = stored ? JSON.parse(stored) : [];
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadRandomMeal() {
    this.showDetails = false;
    const remainingMeals = this.allMeals.filter(meal => !this.swipedIds.includes(meal.id));
    if (remainingMeals.length === 0) {
      this.meal = undefined;
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingMeals.length);
    this.meal = remainingMeals[randomIndex];
  }

  likeMeal() {
    if (this.meal) {
      if (!this.favorites.includes(this.meal.id)) {
        this.favorites.push(this.meal.id);
        this.saveFavorites();
      }
      this.showDetails = true;
      this.swipedIds.push(this.meal.id);
    }
  }

  dislikeMeal() {
    if (this.meal) {
      this.swipedIds.push(this.meal.id);
      this.loadRandomMeal();
    }
  }

  nextMeal() {
    this.loadRandomMeal();
  }
}
