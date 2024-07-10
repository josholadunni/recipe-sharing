"use server";

import { Recipe } from "./models";
import { RecipeCategory } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Like from "./models/Like";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import User from "./models/User";
import bcrypt from "bcrypt";

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

export async function createUser(formData) {
  const saltRounds = 10;
  await User.sync();
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    const inputPassword = formData.get("password");
    const inputConfirmPassword = formData.get("confirm-password");

    const hashedPassword = await bcrypt.hash(inputPassword, salt);

    if (inputPassword === inputConfirmPassword) {
      await User.create({
        username: formData.get("username"),
        email: formData.get("email"),
        password: hashedPassword,
      });
      console.log("User registered sucecssfully");
    } else {
      console.error("Couldn't register user - passwords don't match");
    }
  } catch (error) {
    console.error("Couldn't create user", error);
  }
}

export async function createLike(e) {
  try {
    const recipe = await Recipe.findByPk(e.id);

    if (!recipe) {
      throw new Error("Recipe not found");
    }
    const newLike = await Like.create({
      RecipeId: recipe.id,
    });

    console.log("New like added:", newLike);
  } catch (error) {
    console.error("Error adding like:", error);
  }
  revalidatePath("/");
}

export async function authenticate(prevState, formData) {
  console.log("Server: Authentication attempt");
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Server: Authentication error", result.error);
      return { success: false, message: result.error };
    }

    console.log("Server: Authentication successful");
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Server: Authentication error", error);
    return { success: false, message: "Authentication failed" };
  }
}
