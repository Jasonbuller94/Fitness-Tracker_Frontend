import { toast } from "react-hot-toast";

export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export const deleteRoutine = async (routineId) => {
  const localToken = localStorage.getItem("token");

  console.log(routineId);
  const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localToken}`,
    },
  });
  const result = await response.json();

  if (!result.id) {
    toast.error("Cannot delete this routine!");
  } else {
    toast.success("Routine has been deleted!");
    console.log(result);
  }
};

// export const deleteRoutineActivity = async (
//   postID,
//   { setToken },
//   { token }
// ) => {
//   const localToken = localStorage.getItem("token");

//   console.log(postID);
//   const response = await fetch(`${BASE_URL}/posts/${postID}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localToken}`,
//     },
//   });
//   const result = await response.json();
//   console.log(result);
//   setToken(token);
// };
