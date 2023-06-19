import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { BASE_URL } from "../api/utils";
import { Toaster } from "react-hot-toast";

export default function Root() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const localToken = localStorage.getItem("token");
      console.log(localToken);
      if (localToken) {
        setToken(localToken);
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        });
        const result = await response.json();
        if (result) {
          setUser(result);
        }
      }
    }
    fetchUser();
  }, [token]);

  useEffect(() => {
    async function getActivities() {
      const response = await fetch(`${BASE_URL}/activities`);
      const activities = await response.json();
      setActivities(activities);
    }
    getActivities();
  }, [token, activities]);

  useEffect(() => {
    async function getRoutines() {
      const response = await fetch(`${BASE_URL}/routines`);
      const routines = await response.json();
      setRoutines(routines);
    }
    getRoutines();
  }, [token]);

  useEffect(() => {
    async function getMyRoutines(user) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(
          `${BASE_URL}/users/${user.username}/routines`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localToken}`,
            },
          }
        );
        const routines = await response.json();
        setMyRoutines(routines);
      }
    }
    getMyRoutines(user);
  }, [token, myRoutines]);

  return (
    <div>
      <Navbar user={user} setUser={setUser} token={token} setToken={setToken} />
      <Toaster position="bottom-center" />
      <Outlet
        context={{
          user,
          token,
          activities,
          routines,
          myRoutines,
          setUser,
          setToken,
          setActivities,
          setRoutines,
        }}
      />
    </div>
  );
}
