import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MealService } from '../../services/meal.service';
import { MealModel } from './meal.model';

@Component({
    selector: 'app-meal-detail',
    standalone: true,
    templateUrl: './meal-detail.html',
    styleUrl: './meal-detail.css',
})
export class MealDetailComponent {
    private route = inject(ActivatedRoute);
    private mealService = inject(MealService);
    private router = inject(Router);
    meal?: MealModel;


    constructor() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.meal = this.mealService.getMealById(id);
    }

    GoBack()
    {
        this.router.navigate(['/meals']);
    }
}
