import H1 from "../../components/H1";
import { findUserFromUsername, fetchAllUsers } from "../../lib/data";

export async function generateStaticParams() {
  const users = await fetchAllUsers();
  return users.map((user) => ({
    name: user.dataValues.name,
  }));
}

export default async function UserPage(params) {
  const { name } = params.params;
  const user = await findUserFromUsername(name);

  if (!user) {
    return <div>User not found</div>;
  }

  console.log(user);

  return <H1 text={user.result.username}></H1>;
}
