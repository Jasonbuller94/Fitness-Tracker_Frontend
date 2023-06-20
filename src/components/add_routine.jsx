import { useState } from "react";
import { BASE_URL } from "../api/utils";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AddRoutine() {
  const { setRoutines, token } = useOutletContext();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  async function handleSubmit(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const result = await response.json();

    if (!result.id) {
      toast.error("Cannot add this routine!");
    } else {
      toast.success("Routine has been added!");
      setRoutines([result]);
      setName("");
      setGoal("");
      setIsPublic(false);
    }
  }

  return (
    <div>
      {token && (
        <>
          <h2>Create Routine</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Routine name"
            ></input>
            <input
              onChange={(e) => setGoal(e.target.value)}
              value={goal}
              placeholder="Routine Goal"
            ></input>
            <span>
              <input
                onChange={() => setIsPublic(!isPublic)}
                type="checkbox"
                checked={isPublic}
              />
              Make Public?
            </span>
            <button>Add Routine!</button>
          </form>
        </>
      )}
    </div>
  );
}
