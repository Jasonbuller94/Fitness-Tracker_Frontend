import { useOutletContext } from "react-router-dom";
import AddRoutine from "./add_routine";
import { deleteRoutine } from "../api/utils";
import { Link } from "react-router-dom";

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

  return (
    <div className="body">
      <main>
        <AddRoutine routine={setRoutines} />
        <ul className="act-list">
          {myRoutines.map((routine) => {
            const routineId = routine.id;
            if (routine.creatorId === user.id) {
              return (
                <li key={routine.id}>
                  <span className="user">
                    Created by: {routine.creatorName}
                    <u>
                      <br />
                      <strong>Name: </strong> {routine.name}
                    </u>
                    <br />
                    <strong>Goal:</strong> {routine.goal}
                    <br />
                    <strong>
                      {routine.isPublic ? <>Public</> : <>Private</>}
                    </strong>
                    <br />
                    <div className="post-buttons">
                      <button
                        className="manage"
                        onClick={() => deleteRoutine(routineId)}
                      >
                        Delete this routine?
                      </button>
                      <Link to={`/${routine.id}`}>
                        <button className="manage">Edit this routine?</button>
                      </Link>
                      <button>Edit activities?</button>
                      <button
                        className="manage"
                        onClick={() =>
                          deleteRoutineActivity(postID, token, setToken)
                        }
                      >
                        Remove activites?
                      </button>
                    </div>
                    {routine.activities.length > 0 ? (
                      <>
                        <h3>Activities:</h3>
                        {routine.activities.map((activity) => {
                          return (
                            <ul className="act-list" key={activity.id}>
                              <li>
                                <u>
                                  <strong>
                                    <span className="activity-name">
                                      {activity.name}
                                    </span>
                                  </strong>
                                </u>
                                <br />
                                <strong>Description:</strong>{" "}
                                {activity.description}
                                <br />
                                <strong>Count:</strong> {activity.count}
                                <br />
                                <strong>Duration:</strong> {activity.duration}
                              </li>
                            </ul>
                          );
                        })}
                      </>
                    ) : null}
                  </span>
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
