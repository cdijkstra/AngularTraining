export interface MealModel {
  id: number;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  usedIngredients: number;
  recipe: string;
}