export interface RecipeType {
  id: number;
  name: string;
  imageURL: string;
  description: string;
  short_description: string;
  ingredients: object;
  method: object;
  likes: number;
  username: string;
  isDummy: boolean;
}
