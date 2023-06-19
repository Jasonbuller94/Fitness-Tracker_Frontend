import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Add_Activity from "./add_activity";

export default function Activities() {
  const { user, token, activities, setActivities } = useOutletContext();

  return (
    <>
      <aside id="create-form">
        <Add_Activity />
      </aside>
      <h1 className="profile">Activities</h1>
      <div className="page-body">
        <div className="activities">
          {activities.map((activity) => (
            <div className="activity-post" key={activity.id}>
              <h2>{activity.name}</h2>
              <p className="description">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//----REGISTERED

// -My_Routines
// Be shown a form to create a new routine - form should have text fields for name and goal;

// For each routine which is owned by me I should-
// - be able to update the name and goal for the routine
// - be able to delete the entire routine
// - be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
// - be able to update the duration or count of any activity on the routine
// - be able to remove any activity from the routine
