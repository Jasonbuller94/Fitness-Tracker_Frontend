import { useState } from "react";
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../api/utils";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmation) {
      setError("Password Incorrect");
    }

    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();

    if (result.error) {
      setError(result.message);
      return;
    }

    setToken(result.token);
    localStorage.setItem("token", result.token);
    navigate("/");
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
          type="username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
        />
        <input
          onChange={(e) => setConfirmation(e.target.value)}
          value={confirmation}
          placeholder="Confirm Password"
          type="confirmation"
        />
        <button> Register User! </button>
        <p> {error} </p>
      </form>
    </div>
  );
}
