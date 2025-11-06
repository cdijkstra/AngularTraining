import { environment } from '../../environments/environment';

export const spoontacularApis = {
  recipeOverview: (cuisine: string) =>
    `${environment.spoonacularApiUrl}/complexSearch?cuisine=${cuisine}&number=10&offset=0`,
  recipeDetails: (id: number) =>
    `${environment.spoonacularApiUrl}/${id}/information`
};