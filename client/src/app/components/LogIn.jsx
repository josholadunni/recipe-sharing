import React, { useContext } from "react";
import { AuthContext } from "./Auth";

export default function LogIn() {
  const { setIsLoggedIn } = useContext(AuthContext);
  return (
    <div>
      <h1>Log In</h1>
      <button onClick={() => setIsLoggedIn(true)}>Log In</button>
      {/* <form action="/login/password" method="post">
        <section>
          <label for="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
            autofocus
          ></input>
        </section>
        <section>
          <label for="current-password">Password</label>
          <input
            id="current-password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
          ></input>
        </section>
        <button type="submit">Sign in</button>
      </form> */}
    </div>
  );
}
