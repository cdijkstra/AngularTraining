import { environment } from '../../environments/environment';

export const spoontacularApis = {
  recipeOverview: (cuisine: string, count: number = 10) =>
    `${environment.spoonacularApiUrl}/complexSearch?cuisine=${cuisine}&number=${count}&offset=0`,
  recipeDetails: (id: number) =>
    `${environment.spoonacularApiUrl}/${id}/information`
};