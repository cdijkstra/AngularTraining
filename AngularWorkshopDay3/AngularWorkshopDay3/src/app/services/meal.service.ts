import {inject, Injectable} from '@angular/core';
import {MealModel} from '../components/meal-detail/meal.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReceivedRecipeOverview} from "./ReceivedRecipeOverview";
import {spoontacularApis} from "./spoontacularApis";
import {environment} from "../../environments/environment";
import {BehaviorSubject, forkJoin, Observable, of, tap} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MealService {

  private meals: BehaviorSubject<MealModel[]> = new BehaviorSubject<MealModel[]>([]);

  private httpClient = inject(HttpClient);
  private getReceivedRecipesOverviewKey(cuisine: string, count: number): string {
    return `receivedRecipesOverviewKey_${cuisine}_${count}`;
  }

  fetchGenericRecipes(cuisine: string, count: number = 10): Observable<MealModel[]> {
    // Check if we have cached data
    const storedMeals = localStorage.getItem(`meals_${cuisine}_${count}`);
    if (storedMeals) {
      console.log('Loading from cache');
      const cachedMeals = JSON.parse(storedMeals);
      this.meals = cachedMeals; // Update service state
      return of(cachedMeals); // Return the actual cached data
    }

    console.log('API call')
    const url = spoontacularApis.recipeOverview(cuisine, count);
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
          this.meals.next(meals); // Update service state
          console.log('Meals loaded from API:', this.meals);
          this.saveReceivedRecipes(cuisine, count);
          this.saveMealsToStorage(cuisine, count, meals);
        })
    );
  }

  private saveReceivedRecipes(cuisine: string, count: number) {
    localStorage.setItem(this.getReceivedRecipesOverviewKey(cuisine, count), JSON.stringify(this.receivedRecipes));
  }

  private saveMealsToStorage(cuisine: string, count: number, meals: MealModel[]) {
    localStorage.setItem(`meals_${cuisine}_${count}`, JSON.stringify(meals));
  }

  private loadReceivedRecipes(cuisine: string, count: number) {
    const stored = localStorage.getItem(this.getReceivedRecipesOverviewKey(cuisine, count));
    this.receivedRecipes = stored ? JSON.parse(stored) : [];
  }

  private loadMealsFromStorage(cuisine: string, count: number) {
    const stored = localStorage.getItem(`meals_${cuisine}_${count}`);
    this.meals = stored ? JSON.parse(stored) : [];
    this.loadReceivedRecipes(cuisine, count);
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

  getMealById(id: number): MealModel | undefined {
    return this.meals.getValue().find(meal => meal.id === id);
  }

  getFavoritesMeals(favoriteIds: number[]): MealModel[] {
    const allFavorites: MealModel[] = [];

    // Search through all localStorage entries for meals
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('meals_')) {
        const storedMeals = localStorage.getItem(key);
        if (storedMeals) {
          const meals: MealModel[] = JSON.parse(storedMeals);
          const matchingMeals = meals.filter(meal => favoriteIds.includes(meal.id));
          allFavorites.push(...matchingMeals);
        }
      }
    }

    // Remove duplicates (in case same meal is in multiple cuisine/count combinations)
    return allFavorites.filter((meal, index, self) =>
        index === self.findIndex(m => m.id === meal.id)
    );
  }

  /**
   * Get a random meal from all cached meals in localStorage
   */
  getRandomMeal(): MealModel | undefined {
    const allMeals: MealModel[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('meals_')) {
        const storedMeals = localStorage.getItem(key);
        if (storedMeals) {
          allMeals.push(...JSON.parse(storedMeals));
        }
      }
    }
    if (allMeals.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * allMeals.length);
    return allMeals[randomIndex];
  }
}
