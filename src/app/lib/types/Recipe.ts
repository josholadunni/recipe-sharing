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
  allLikes: LikeType[] | null;
  recipes: RecipeType[] | null;
  currentUserId: UserIdType;
  deleteButton: boolean | undefined;
}

export interface RecipeCardType {
  id: number;
  title: string;
  imgFileName: string;
  description: string;
  allLikes: LikeType[] | null;
  currentUserId: UserIdType | null;
  categories: [string, number][];
  username: string;
  slug: string;
  createdAt: Date;
  deletable: boolean;
}
