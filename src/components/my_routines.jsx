// import { useState } from "react";
// import { BASE_URL } from "../api/utils";
// import { toast } from "react-hot-toast";
// import Routines from "./routines";
import { useOutletContext } from "react-router-dom";
import AddRoutine from "./add_routine";

export default function My_Routines() {
  const {
    setRoutines,
    myRoutines,
    user,
    routines,
    token,
    setToken,
    setRoutine,
  } = useOutletContext();
  // const [isPublic, setIsPublic] = useState(false);

  return (
    <div className="body">
      <main>
        <AddRoutine routine={setRoutines} />
        {/* <h1 className="heading">Welcome {user.username}</h1> */}
        <ul className="act-list">
          {myRoutines.map((routine) => {
            if (routine.creatorId === user.id) {
              return (
                <li key={routine.id}>
                  <u>
                    <span className="activity-name">{routine.name}</span>
                  </u>
                  <br />
                  <strong>goal:</strong> {routine.goal}
                  <br />
                  <strong>
                    {routine.isPublic ? <>Public</> : <>Private</>}
                  </strong>
                  <br />
                  <strong>creator:</strong> {routine.creatorName}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </main>
      <aside id="create-form"></aside>
    </div>
  );
}
