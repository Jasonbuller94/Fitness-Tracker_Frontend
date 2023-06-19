import { useState } from "react";
import { BASE_URL } from "../api/utils";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useOutletContext();

  const navigate = useNavigate();

  function showPassword() {
    var p = document.getElementById("showInput");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmation) {
      setError("Passwords do not match!");
      return;
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
    console.log(result);
    if (result.error) {
      setError(result.message);
    }

    setToken(result.token);
    console.log(result);

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
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
          id="showInput"
        />
        <input
          onChange={(e) => setConfirmation(e.target.value)}
          value={confirmation}
          placeholder="Repeat your password"
          type="confirmation"
        />
        <span>
          <input onClick={showPassword} type="checkbox" />
          Show password
        </span>
        <button>Register</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
