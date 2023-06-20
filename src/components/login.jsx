import { useState } from "react";
import { BASE_URL } from "../api/utils";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/users/login`, {
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
    }

    setToken(result.token);

    localStorage.setItem("token", result.token);

    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <span>
          <input onClick={showPassword} type="checkbox" />
          Show password
        </span>
        <button>Login</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
