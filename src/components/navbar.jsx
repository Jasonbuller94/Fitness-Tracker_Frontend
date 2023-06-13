import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/routines"}>Routines</Link>
      <Link to={"/my_routines"}>My Routines</Link>
      <Link to={"/activities"}>Activities</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </div>
  );
}
