import { LikeType } from "./Like";
import { UserIdType } from "./User";
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
  createdAt: Date;
  RecipeCategories: { id: number; name: string }[];
}

export interface RecipeSectionType {
  currentUserId: { result: number; message: string };
  fetchRecipeLikes: () => Promise<LikeType[]>;
  fetchRecipes: (categoryId?: number) => Promise<RecipeType[]>;
  categoryId?: number;
  isDeletable?: boolean;
  layout: "carousel" | "grid";
}

export interface RecipeLayoutType {
  allLikes: LikeType[];
  recipes: RecipeType[];
  currentUserId: UserIdType;
  deleteButton: boolean | undefined;
}
