import { useOutletContext } from "react-router-dom";

export default function Welcome() {
  const { user } = useOutletContext();
  return (
    <div>
      <h1> Welcome to Fitness Tracker, {user.username}</h1>
    </div>
  );
}
