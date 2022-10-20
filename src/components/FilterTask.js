import React from "react";
import { useParams } from "react-router";
import TaskBox from "./TaskBox";

const FilterTask = ({
  tasks,
  deleteTask,
  handleEditClick,
  handleCompleteClick,
}) => {
  const { status } = useParams();
  const Task =
    tasks.filter((task) => task.progress === status).length === 0 ? (
      <p>
        No <strong>{status}</strong> task available.
      </p>
    ) : (
      tasks
        .filter((task) => task.progress === status)
        .map((task, index) => (
          <TaskBox
            key={index}
            index={index}
            {...task}
            deleteClick={deleteTask}
            editClick={handleEditClick}
            completeClick={handleCompleteClick}
          />
        ))
    );

  return (
    <div className="Filter-Task-Container">
      <h3>{status} Task</h3>
      <div className="Task-List-Container-Routes">{Task}</div>
    </div>
  );
};

export default FilterTask;
