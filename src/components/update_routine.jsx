import { useState } from "react";
import { BASE_URL } from "../api/utils";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function UpdateRoutine() {
  const { routineId } = useParams();
  const { user, routines, token, setToken } = useOutletContext();
  const { setRoutines } = useOutletContext();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const Navigate = useNavigate();

  async function handleSubmit(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        name,
        goal,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (!result.id) {
      toast.error("Cannot edit this routine!");
    } else {
      toast.success("Routine has been updated!");
      setRoutines([result]);
      setName("");
      setGoal("");
    }
    Navigate("/my_routines");
  }

  return (
    <div>
      <h2>Update routine</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setRoutines(e.target.value)}
          value={routineId}
          placeholder="Routine ID"
        ></input>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Update routine name"
        ></input>
        <input
          onChange={(e) => setGoal(e.target.value)}
          value={goal}
          placeholder="Update routine goal"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}
