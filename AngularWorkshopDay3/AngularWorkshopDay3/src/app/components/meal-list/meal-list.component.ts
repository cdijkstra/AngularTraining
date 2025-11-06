import {Component, inject, OnInit, signal} from '@angular/core';
import { MealItemComponent } from '../meal/meal-item';
import { MealService } from '../../services/meal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-meal-list',
  imports: [MealItemComponent, FormsModule, CommonModule],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})

export class MealList implements OnInit {
  mealService = inject(MealService);
  meals = toSignal(this.mealService.meals)

  selectedCuisine: string = 'asian';
  selectedCount: number = 10;
  loading: boolean = false;
  showingFavorites: boolean = false;

  cuisineOptions = [
    { value: 'asian', label: 'Asian' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' }
  ];

  countOptions = [1, 2, 5, 10, 20, 50];

  ngOnInit(): void {
    // this.loadMeals();
    this.mealService.fetchGenericRecipes(this.selectedCuisine, this.selectedCount)

  }

  onCuisineChange(): void {
    this.loadMeals();
  }

  onCountChange(count: number): void {
    this.selectedCount = count;
    this.loadMeals();
  }

  showFavorites(): void {
    this.showingFavorites = true;
    this.loading = true;

    // Get favorite IDs from localStorage
    const stored = localStorage.getItem('meal-favorites');
    const favoriteIds: number[] = stored ? JSON.parse(stored) : [];

    if (favoriteIds.length === 0) {
      this.loading = false;
      return;
    }

    // Get all favorite meals from service
    const favoriteMeals = this.mealService.getFavoritesMeals(favoriteIds);
    this.loading = false;
  }

  showAllMeals(): void {
    this.showingFavorites = false;
    this.loadMeals();
  }


  private loadMeals(): void {
    this.loading = true;

    console.log(`Loading meals: cuisine=${this.selectedCuisine}, count=${this.selectedCount}`);
  }
}
