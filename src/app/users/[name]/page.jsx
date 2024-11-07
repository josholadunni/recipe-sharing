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
  const users = await fetchAllUsers();
  return users.map((user) => ({
    name: user.dataValues.name,
  }));
}

export default async function UserPage(params) {
  const { name } = params.params;
  const user = await findUserFromUsername(name);
  const userId = user.result.id;

  if (!user) {
    return <div>User not found</div>;
  }

  const recipeList = await fetchRecipesByUserId(userId);
  const allLikes = await fetchRecipeLikes();
  const currentUserId = await findUserIdFromEmail();

  return (
    <div className="relative top-12 min-h-screen">
      <H1 text={`${user.result.username}'s Recipes`}></H1>
      <div className="mt-10">
        <div className="flex justify-center">
          <RecipeGrid
            allLikes={allLikes}
            currentUserId={currentUserId}
            recipes={recipeList}
            deleteButton={false}
          />
        </div>
      </div>
    </div>
  );
}
