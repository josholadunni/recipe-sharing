import Link from "next/link";
import { signOut } from "@/auth";
import { useRouter } from "next/navigation.js";
// const router = useRouter();
function Navbar() {
  return (
    <div>
      <nav className="pt-5">
        <ul className="text-center">
          <Link href="/">Home</Link>
          <li>Browse</li>
          <li>Search</li>
          <Link href="/add-recipe">Add Recipe</Link>
          <li>Login</li>
          <li>
            {" "}
            <form
              action={async () => {
                "use server";
                const data = await signOut({
                  redirect: false,
                  callbackUrl: "/",
                });
                router.push(data.callbackUrl);
              }}
            >
              <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
