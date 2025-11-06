import { Component, effect, OnInit } from '@angular/core';
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
export class MealDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private mealService = inject(MealService);
    private router = inject(Router);
    meal?: MealModel;
    id: number;

    constructor() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngOnInit() {
        // If meals are not loaded, try to load from localStorage (default: asian, 10)
        if (this.mealService['meals'].getValue().length === 0) {
            const storedMeals = localStorage.getItem('meals_asian_10');
            if (storedMeals) {
                this.mealService['meals'].next(JSON.parse(storedMeals));
            }
        }
        effect(() => {
            const meals = this.mealService['meals'].getValue();
            this.meal = meals.find(meal => meal.id === this.id);
            console.log('MealDetailComponent: Looking for meal ID', this.id, 'Found:', this.meal);
        });
    }

    GoBack() {
        this.router.navigate(['/meals']);
    }
}
