"use server";

import { Recipe, User, RecipeCategory } from "./models/index.js";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../auth.js";
import bcrypt from "bcrypt";
import { findUserIdFromEmail, findUsername } from "./data";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import z from "zod";
import { Op } from "sequelize";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `images/${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return fileName;
  } catch (error) {
    throw error;
  }
}

export async function createRecipe(prevState, formData) {
  await Recipe.sync();
  await RecipeCategory.sync();

  try {
    const file = formData.get("file");

    if (file.size === 0) {
      return {
        status: "error",
        message: "Please select a file.",
      };
    }

    const fileName = `${file.name}${Date.now()}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(buffer, fileName);

    const userId = await findUserIdFromEmail();
    const user = await User.findByPk(userId.result);

    const ingredientFields = formData.getAll("ingredient");
    const methodFields = formData.getAll("method");

    const newRecipe = await user.createRecipe({
      name: formData.get("rname"),
      imageURL:
        `https://recipe-website-nextjs.s3.eu-west-2.amazonaws.com/images/` +
        fileName,
      description: formData.get("rdescription"),
      short_description: formData.get("srdescription"),
      ingredients: ingredientFields,
      method: methodFields,
      username: user.username,
      isDummy: true,
    });

    const categories = await RecipeCategory.findAll({
      where: { name: formData.getAll("rcselect") },
    });
    try {
      await newRecipe.addRecipeCategories(categories);
    } catch (error) {
      console.error("Couldn't assign category ", error);
    }
    revalidatePath("/");
    console.log("Recipe created successfully");
    return { status: "success", message: "File has been uploaded." };
  } catch (error) {
    console.error("Couldn't post recipe", error);
    return {
      status: "error",
      message: "Failed to upload file.",
    };
  }
}

export async function deleteRecipe(id) {
  try {
    const recipe = await Recipe.findByPk(id);
    await recipe.destroy();
    console.log("Recipe successfully deleted");
    revalidatePath("/dashboard");
    return { status: "success", message: "Recipe successfully deleted" };
  } catch (error) {
    return { status: "fail", message: "Recipe could not be deleted." };
  }
}

export async function createUser(prevState, formData) {
  const registrationSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .trim()
        .toLowerCase(),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .trim()
        .toLowerCase(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .trim(),
      confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const saltRounds = 10;
  await User.sync();

  try {
    const validatedData = registrationSchema.parse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    });

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const emailExists = await findUserIdFromEmail(validatedData.email);
    const usernameExists = await findUsername(validatedData.username);

    if (emailExists === undefined && usernameExists === undefined) {
      await User.create({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
      });
      return { success: true, message: "Registered successfully!" };
    } else {
      return {
        success: false,
        errors: [emailExists?.message, usernameExists?.message],
      };
    }
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      const errors = {};
      error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { form: "An unexpected error occurred" } };
  }
}

export async function createLike(e) {
  const userId = await findUserIdFromEmail();
  try {
    const recipe = await Recipe.findByPk(e.id);

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    const newLike = await recipe.createLike({
      UserId: userId.result,
    });

    console.log("New like added:", newLike);
  } catch (error) {
    console.error("Error adding like:", error);
  }
  revalidatePath("/");
}

export async function removeLike(e) {
  const userId = await findUserIdFromEmail();
  console.log(userId);
  console.log(typeof userId.result);
  try {
    const recipe = await Recipe.findByPk(e.id);

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    const like = await recipe.getLikes({
      where: {
        UserId: userId.result,
      },
    });

    if (like && like.length > 0) {
      await like[0].destroy();
    } else {
      throw new Error("Like not found");
    }
  } catch (error) {
    console.error("Error removing like:", error);
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

export async function logOut() {
  console.log("LOGGING OUT");
  await signOut({
    redirect: false,
  });
  return { isLoggedOut: true };
}

export async function search(term) {
  const recipes = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${term.trim()}%`,
      },
    },
  });
  return JSON.parse(JSON.stringify(recipes));
}
