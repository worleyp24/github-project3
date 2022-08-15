import React from "react";
import "./TaskBox.css";

const TaskBox = ({
  id,
  name,
  priority,
  progress,
  duedate,
  completeClick,
  editClick,
  deleteClick,
}) => {
  // Function for checkbox onChange Complete Task
  const handleCompleteClick = (e) => {
    let stat = e.target.checked;
    completeClick(id, stat);
  };

  // Reference Array for icons of Priorities and Progress
  const typeOfPrioritiesIcons = ["🔻", "🟢", "❗", "🔔"];
  const typeOfPriorities = ["Low", "Medium", "Important", "Urgent"];
  const indexOfPriorities = typeOfPriorities.indexOf(priority);
  const typeOfProgressIcons = ["⚪", "⏳", "✅"];
  const typeOfProgress = ["Not Started", "In Progress", "Completed"];
  const indexOfProgress = typeOfProgress.indexOf(progress);

  return (
    <div className="Task">
      <div className="Task-Display">
        <label className="container">
          <input
            id={id}
            name="completed"
            type="checkbox"
            checked={progress === "Completed" ? true : false}
            onChange={handleCompleteClick}
          />
          <div className="checkmark"></div>
        </label>
        <strong
          className={progress === "Completed" ? "strikeThrough" : null}
          onClick={() => editClick(id)}
        >
          {name}
        </strong>
        <span onClick={() => deleteClick(id)} title="Delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </span>
      </div>

      <div className="Task-Details">
        <div className="Task-Info">
          <small>
            {typeOfPrioritiesIcons[indexOfPriorities]}
            {priority}
          </small>
          <small>
            {typeOfProgressIcons[indexOfProgress]}
            {progress}
          </small>
        </div>

        {/* Display Due date, will notify via red bg if set due date is behind or within date now */}
        <div
          className={
            duedate < new Date() && duedate !== ""
              ? "Task-Due-Date Task-Due-Date-notif"
              : "Task-Due-Date"
          }
        >
          {duedate === ""
            ? ""
            : duedate.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
              })}
        </div>
      </div>
    </div>
  );
};

export default TaskBox;
