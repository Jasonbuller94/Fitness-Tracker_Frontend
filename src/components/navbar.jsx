import { Link } from "react-router-dom";

export default function Navbar({ user, setUser, token, setToken }) {
  function handleLogout() {
    console.log("You are logging out!");
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }

  // console.log(user);

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/routines"}>Routines</Link>
      <Link to={"/activities"}>Activities</Link>
      {token ? <Link to={"/my_routines"}>My Routines</Link> : null}
      {user.username && (
        <>
          {<span>{user.username}</span>}
          <Link onClick={handleLogout} to={"/"}>
            Logout
          </Link>
        </>
      )}
      {!user.username && (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
      )}
    </div>
  );
}
