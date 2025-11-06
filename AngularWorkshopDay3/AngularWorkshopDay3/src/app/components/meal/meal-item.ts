import {Component, inject, Input, OnInit} from '@angular/core';
import { MealModel } from '../meal-detail/meal.model';
import {Router} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'meal-item',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './meal-item.html',
  styleUrl: './meal-item.css',
})

export class MealItemComponent implements OnInit {
  @Input() meal!: MealModel;
  router = inject(Router)
  private readonly FAVORITES_KEY = 'meal-favorites';

  ngOnInit(): void {
    // Component initializes - favorites are now loaded from localStorage on demand
  }

  OpenMealDetail(mealId: number) {
    this.router.navigate(['/meal', mealId]);
  }

  private saveFavorites(favorites: number[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  private getFavorites(): number[] {
    const stored = localStorage.getItem(this.FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  toggleFavorite(mealId: number) {
    const currentFavorites = this.getFavorites();

    if (currentFavorites.includes(mealId)) {
      // Remove from favorites
      const updatedFavorites = currentFavorites.filter(id => id !== mealId);
      this.saveFavorites(updatedFavorites);
    } else {
      // Add to favorites
      const updatedFavorites = [...currentFavorites, mealId];
      this.saveFavorites(updatedFavorites);
    }
  }

  isFavorite(mealId: number): boolean {
    return this.getFavorites().includes(mealId);
  }
}
