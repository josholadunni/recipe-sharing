import { Recipe } from "@/app/lib/models";
import RecipeCategory from "@/app/lib/models/RecipeCategory";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recipes = await Recipe.findAll();
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching recipes", error },
      { status: 500 }
    );
  }
}

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     // console.log("Data", data);
//     const recipe = await Recipe.create({
//       name: data.rname,
//       imageURL: data.iurl,
//       description: data.rdescription,
//       short_description: data.srdescription,
//       isDummy: true,
//     });
//     const categories = await RecipeCategory.findAll({
//       where: { name: data.rcselect },
//     });
//     try {
//       await recipe.addRecipeCategories(categories);
//     } catch (error) {
//       console.error("Couldn't assign category ", error);
//       return NextResponse.error(new Error("Couldn't assign category"));
//     }

//     return NextResponse.json({ message: "Recipe posted successfully" });
//   } catch (error) {
//     console.error("Couldn't post recipe", error);
//     return NextResponse.error(new Error("Couldn't post recipe"));
//   }
// }
