export interface MealModel {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  usedIngredients: number;
  recipe: string;
}