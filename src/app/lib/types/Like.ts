export interface LikeType {
  id: number;
  User: {
    id: number;
    username: string;
    email: string;
  };
  //Like and Recipe joins
  RecipeId?: number;
}
