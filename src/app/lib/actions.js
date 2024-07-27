"use server";

import { Recipe } from "./models";
import { RecipeCategory } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Like from "./models/Like";
import { signIn } from "../auth.js";
import { signOut } from "../auth.js";
import { AuthError } from "next-auth";
import User from "./models/User";
import bcrypt from "bcrypt";
import { auth } from "../auth.js";
import { findUserIdFromEmail } from "./data";
import { findUsernameFromEmail } from "./data";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
    Key: `images/${fileName}${Date.now()}`,
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
  const session = await auth();
  const username = await findUsernameFromEmail(session.user.email);

  try {
    const file = formData.get("file");

    console.log(file);

    if (file.size === 0) {
      return {
        status: "error",
        message: "Please select a file.",
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(buffer, file.name);

    // const recipe = await Recipe.create({
    //   name: formData.get("rname"),
    //   imageURL: formData.get("iurl"),
    //   description: formData.get("rdescription"),
    //   short_description: formData.get("srdescription"),
    //   username: username,
    //   isDummy: true,
    // });
    // const categories = await RecipeCategory.findAll({
    //   where: { name: formData.get("rcselect") },
    // });
    // try {
    //   await recipe.addRecipeCategories(categories);
    // } catch (error) {
    //   console.error("Couldn't assign category ", error);
    // }
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
  // redirect("/");
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
  const session = await auth();
  const userId = await findUserIdFromEmail(session.user.email);
  try {
    const recipe = await Recipe.findByPk(e.id);

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    const newLike = await Like.create({
      RecipeId: recipe.id,
      UserId: userId,
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

export async function logOut() {
  console.log("LOGGING OUT");
  await signOut({
    redirect: false,
  });
  return { isLoggedOut: true };
}
