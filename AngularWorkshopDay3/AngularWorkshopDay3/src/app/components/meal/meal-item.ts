import {Component, inject, Input} from '@angular/core';
import { MealModel } from '../meal-detail/meal.model';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'meal-item',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './meal-item.html',
  styleUrl: './meal-item.css',
})

export class MealItemComponent {
  @Input() meal!: MealModel;
  router = inject(Router)

  OpenMealDetail(mealId: number) {
    this.router.navigate(['/meal', mealId]);
  }
}

