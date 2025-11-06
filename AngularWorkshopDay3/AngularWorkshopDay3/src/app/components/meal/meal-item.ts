import {Component, inject, Input} from '@angular/core';
import { MealModel } from '../meal-detail/meal.model';
import {Router, RouterOutlet} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'meal-item',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule],
  templateUrl: './meal-item.html',
  styleUrl: './meal-item.css',
})

export class MealItemComponent {
  @Input() meal!: MealModel;
  router = inject(Router)

  OpenMealDetail(mealId: number) {
    this.router.navigate(['/meal', mealId]);
  }

  favorites: number[] = []

  toggleFavorite(mealId: number) {
    if (this.favorites.includes(mealId)) {
      this.favorites = this.favorites.filter(id => id !== mealId);
    } else {
      this.favorites.push(mealId);
    }
  }

  isFavorite(mealId: number): boolean {
    return this.favorites.includes(mealId);
  }
}
