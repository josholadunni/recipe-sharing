"use server";

import { Recipe } from "./models";
import { RecipeCategory } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipe(formData) {
  await Recipe.sync();
  await RecipeCategory.sync();
  try {
    const recipe = await Recipe.create({
      name: formData.get("rname"),
      imageURL: formData.get("iurl"),
      description: formData.get("rdescription"),
      short_description: formData.get("srdescription"),
      isDummy: true,
    });
    const categories = await RecipeCategory.findAll({
      where: { name: formData.get("rcselect") },
    });
    try {
      await recipe.addRecipeCategories(categories);
    } catch (error) {
      console.error("Couldn't assign category ", error);
    }
    console.log("Recipe created successfully");
  } catch (error) {
    console.error("Couldn't post recipe", error);
  }
  revalidatePath("/");
  redirect("/");
}
