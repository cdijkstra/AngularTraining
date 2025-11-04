import { Routes } from '@angular/router';
import { MealList } from './components/meal-list/meal-list.component';
import { MealDetailComponent } from './components/meal/meal-detail';

export const routes: Routes = [
  {
    path: '',
    component: MealList
  },
  {
    path: 'meal/:id',
    component: MealDetailComponent
  }
];
