import H1 from "../../components/H1";
import {
  findUserFromUsername,
  fetchAllUsers,
  fetchRecipesByUserId,
  fetchRecipeLikes,
} from "../../lib/data";
import RecipeGrid from "../../components/Home/RecipeGrid";
import { findUserIdFromEmail } from "../../lib/data";

export async function generateStaticParams() {
  console.log("Generating static params for users page");
  const users = await fetchAllUsers();
  console.log(users);
  return users.map((user) => ({
    name: user.dataValues.username,
  }));
}

export default async function UserPage(params) {
  const { name } = params.params;
  const user = await findUserFromUsername(name);

  if (!user || !user.result) {
    return <div>User not found</div>;
  }

  const userId = user.result.id;

  try {
    const [recipeList, allLikes, currentUserId] = await Promise.all([
      fetchRecipesByUserId(userId),
      fetchRecipeLikes(),
      findUserIdFromEmail(),
    ]);

    // Serialize the data
    const serializedData = {
      recipes: JSON.parse(JSON.stringify(recipeList)),
      allLikes: JSON.parse(JSON.stringify(allLikes)),
      currentUserId: currentUserId?.result || null,
    };

    return (
      <div className="relative top-12 min-h-screen">
        <H1 text={`${user.result.username}'s Recipes`}></H1>
        <div className="mt-10">
          <div className="flex justify-center">
            <RecipeGrid
              allLikes={serializedData.allLikes}
              currentUserId={serializedData.currentUserId}
              recipes={serializedData.recipes}
              deleteButton={false}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading user page:", error);
    return <div>Error loading recipes. Please try again later.</div>;
  }
}
