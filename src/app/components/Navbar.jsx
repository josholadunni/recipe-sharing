import Link from "next/link";
function Navbar() {
  return (
    <nav className="pt-5">
      <ul className="text-center">
        <Link href="/">Home</Link>
        <li>Browse</li>
        <li>Search</li>
        <Link href="/add-recipe">Add Recipe</Link>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;
