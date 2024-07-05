import Link from "next/link";
import { signOut } from "../../../auth";
function Navbar() {
  return (
    <nav className="pt-5">
      <ul className="text-center">
        <Link href="/">Home</Link>
        <li>Browse</li>
        <li>Search</li>
        <Link href="/add-recipe">Add Recipe</Link>
        <li>Login</li>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button>
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </ul>
    </nav>
  );
}

export default Navbar;
