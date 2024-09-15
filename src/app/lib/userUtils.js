import { User } from "./models/index.js";

export async function getUser(inputEmail) {
  try {
    const user = await User.findAll({
      where: {
        email: inputEmail,
      },
    });
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
