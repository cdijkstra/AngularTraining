import {inject, Injectable} from '@angular/core';
import { MealModel } from '../components/meal-detail/meal.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReceivedRecipeOverview} from "./ReceivedRecipeOverview";
import {spoontacularApis} from "./spoontacularApis";
import {environment} from "../../environments/environment";
import {forkJoin, Observable, of, tap} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MealService {

  private httpClient = inject(HttpClient);
  private getReceivedRecipesOverviewKey(cuisine: string): string {
    return `receivedRecipesOverviewKey_${cuisine}`;
  }

  fetchGenericRecipes(cuisine: string): Observable<MealModel[]> {
    if (localStorage.getItem(this.getReceivedRecipesOverviewKey(cuisine))) {
      const storedMeals = localStorage.getItem(`meals_${cuisine}`);
      if (storedMeals) {
        this.loadMealsFromStorage(cuisine);
        return of(this.meals);
      }
    }

    console.log('API call')
    const url = spoontacularApis.recipeOverview(cuisine);
    const headers = new HttpHeaders({
      'x-api-key': environment.spoonacularApiKey
    });

    return this.httpClient.get<any>(url, { headers }).pipe(
        switchMap(response => {
          // Store lightweight recipes (from search)
          this.receivedRecipes = response.results.map((r: any) => ({
            id: r.id,
            title: r.title,
            image: r.image
          }));

          // Build an array of detailed recipe requests
          const detailRequests = this.receivedRecipes.map(recipe =>
              this.httpClient.get<any>(
                  spoontacularApis.recipeDetails(recipe.id),
                  { headers }
              )
          );

          // Wait for all detail requests to complete
          return forkJoin(detailRequests);
        }),
        map((detailedResponses: any[]) => {
          return detailedResponses.map(r => this.mapToMealModel(r));
        }),
        tap((meals: MealModel[]) => {
          this.meals.push(...meals);
          console.log('Meals added:', this.meals);
          this.saveReceivedRecipes(cuisine);
          this.saveMealsToStorage(cuisine, meals);
        })
    );
  }

  private saveReceivedRecipes(cuisine: string) {
    localStorage.setItem(this.getReceivedRecipesOverviewKey(cuisine), JSON.stringify(this.receivedRecipes));
  }

  private saveMealsToStorage(cuisine: string, meals: MealModel[]) {
    localStorage.setItem(`meals_${cuisine}`, JSON.stringify(meals));
  }

  private loadReceivedRecipes(cuisine: string) {
    const stored = localStorage.getItem(this.getReceivedRecipesOverviewKey(cuisine));
    this.receivedRecipes = stored ? JSON.parse(stored) : [];
  }

  private loadMealsFromStorage(cuisine: string) {
    const stored = localStorage.getItem(`meals_${cuisine}`);
    this.meals = stored ? JSON.parse(stored) : [];
    this.loadReceivedRecipes(cuisine);
  }

  // 🧽 Helper: remove HTML tags from summary
  private stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }


  // 🧩 Helper: map Spoonacular detail response to MealModel
  private mapToMealModel(response: any): MealModel {
    return {
      id: response.id,
      title: response.title,
      image: response.image,
      description: this.stripHtmlTags(response.summary),
      ingredients: response.extendedIngredients.map((i: any) => i.original),
      usedIngredients: response.extendedIngredients.length,
      recipe: response.analyzedInstructions?.[0]?.steps
          ?.map((s: any) => `${s.number}. ${s.step}`)
          .join('\n') || ''
    };
  }

  private receivedRecipes: ReceivedRecipeOverview[] = [];

  private meals: MealModel[] = []
    // {
    //   id: 1,
    //   title: 'Spaghetti',
    //   description: 'Classic Italian pasta with tomato sauce and cheese.',
    //   ingredients: ['pasta', 'tomato', 'cheese'],
    //   usedIngredients: 3,
    //   recipe: `1. Boil pasta until al dente.\n2. Prepare tomato sauce by simmering tomatoes with herbs.\n3. Mix pasta with sauce and top with cheese.\n4. Serve hot.`
    // },
    // {
    //   id: 2,
    //   title: 'Chicken Curry',
    //   description: 'Spicy chicken curry served with rice.',
    //   ingredients: ['chicken', 'curry powder', 'rice'],
    //   usedIngredients: 3,
    //   recipe: `1. Sauté chicken pieces until browned.\n2. Add curry powder and cook for 2 minutes.\n3. Add water and simmer until chicken is cooked.\n4. Serve with steamed rice.`
    // },
    // {
    //   id: 3,
    //   title: 'Vegetable Stir Fry',
    //   description: 'Mixed vegetables stir-fried in soy sauce.',
    //   ingredients: ['broccoli', 'carrot', 'soy sauce'],
    //   usedIngredients: 3,
    //   recipe: `1. Chop vegetables into bite-sized pieces.\n2. Heat oil in a wok and add vegetables.\n3. Stir fry for 5 minutes.\n4. Add soy sauce and cook for another 2 minutes.\n5. Serve immediately.`
    // }

  getMealById(id: number): MealModel | undefined {
    return this.meals.find(meal => meal.id === id);
  }
}
