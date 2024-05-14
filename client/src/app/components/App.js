import "../styles/App.css";
import Home from "./Home.jsx";
import LogIn from "./LogIn.jsx";
import Navbar from "./Navbar.jsx";
import { useContext } from "react";
import { AuthContext } from "./Auth.jsx";

export default function App() {
  const { isLoggedIn } = useContext(AuthContext);

  let content;
  isLoggedIn ? (content = <Home />) : (content = <LogIn />);

  return (
    <div className="App">
      <Navbar />
      {content}
    </div>
  );
}
