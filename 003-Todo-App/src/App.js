import "./App.css";
import "./components/TaskBox.css";
import React, { useState } from "react";
import NewTask from "./components/NewTask";
import TaskBox from "./components/TaskBox";
import EditTask from "./components/EditTask";
import FilterTask from "./components/FilterTask";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({
    id: "",
    name: "",
    priority: "",
    progress: "",
    startdate: "",
    duedate: "",
    createddate: "",
    modifieddate: "",
  });

  const [newTaskForm, setNewTaskForm] = useState(false);
  const [editTaskForm, setEditTaskForm] = useState(false);
  // const [overlay, setOverlay] = useState(false);

  // Function for showing/hiding Add Task Form
  const showAddTaskForm = () => {
    newTaskForm ? setNewTaskForm(false) : setNewTaskForm(true);
  };

  // Function for showing/hiding Edit Task Form
  const showEditTaskForm = () => {
    editTaskForm ? setEditTaskForm(false) : setEditTaskForm(true);
  };

  // Map for Prioritoes & Icon options
  const typeOfPrioritiesIcons = ["🔻", "🟢", "❗", "🔔"];
  const typeOfPriorities = ["Low", "Medium", "Important", "Urgent"];
  const optionsPriorities = typeOfPriorities.map((priority, index) => {
    return (
      <option key={priority} value={priority}>
        {typeOfPrioritiesIcons[index]}
        {priority}
      </option>
    );
  });

  // Map for Progress & Icon options
  const typeOfProgressIcons = ["⚪", "⏳", "✅"];
  const typeOfProgress = ["Not Started", "In Progress", "Completed"];
  const optionsProgress = typeOfProgress.map((progress, index) => {
    return (
      <option key={progress} value={progress}>
        {typeOfProgressIcons[index]}
        {progress}
      </option>
    );
  });

  // Function for adding new task
  const addNewTask = (addTask) => {
    let exists = false;
    let addTaskCopy = { ...addTask, createddate: new Date() };
    const tasksCopy = [...tasks];
    if (
      addTaskCopy.name === "" ||
      addTaskCopy.priority === "" ||
      addTaskCopy.progress === ""
    ) {
      return alert("Provide sufficient details of the Task");
    }
    tasksCopy.forEach((task) => {
      // console.log(newTask.name.toLowerCase().replace(/[^\w\s]/gi, ""));
      if (
        task.name.toLowerCase().replace(/[^\w\s]/gi, "") ===
        addTaskCopy.name
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .trim()
      ) {
        alert(`Task named\n"${task.name}"\nwas already included in the list.`);
        return (exists = true);
      }
    });

    if (exists === false) {
      const task = {
        id: uuidv4(),
        ...addTaskCopy,
      };
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      setNewTaskForm(false);
    }
  };

  // Function for geting the ID of a selected task to be edited
  const handleEditClick = (id) => {
    const indexOfTask = tasks.findIndex((task) => task.id === id);
    const taskEdit = tasks[indexOfTask];
    setEditTask(taskEdit);
    showEditTaskForm();
  };

  // Function for updating a selected task
  const updateTask = (selectedTask) => {
    let selectedTaskCopy = { ...selectedTask, modifieddate: new Date() };
    if (selectedTaskCopy.id === "") {
      return;
    }
    const indexOfTask = tasks.findIndex(
      (task) => task.id === selectedTaskCopy.id
    );
    const tasksCopy = [...tasks];
    tasksCopy.splice(indexOfTask, 1, selectedTaskCopy);
    setTasks(tasksCopy);
    setEditTaskForm(false);
  };

  // Function for updating the progress of  recently completed task
  const handleCompleteClick = (id, stat) => {
    const indexOfTask = tasks.findIndex((task) => task.id === id);
    let selectedTask = tasks[indexOfTask];
    const taskCopy = [...tasks];
    if (stat) {
      const task = { ...selectedTask, progress: "Completed" };
      taskCopy.splice(indexOfTask, 1, task);
      setTasks(taskCopy);
    } else {
      const task = { ...selectedTask, progress: "Not Started" };
      taskCopy.splice(indexOfTask, 1, task);
      setTasks(taskCopy);
    }
  };

  // Function for cancel updating a task
  const cancelUpdateTask = (modal) => {
    setEditTaskForm(false);
  };

  // Function for deleting a selected task
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  // Map all task
  const listTask =
    tasks.length === 0 ? (
      <p>No task available.</p>
    ) : (
      tasks.map((task, index) => (
        //data transformation
        <TaskBox
          key={index}
          {...task}
          deleteClick={deleteTask}
          editClick={handleEditClick}
          completeClick={handleCompleteClick}
        />
      ))
    );

  // Map for Links / Task Progress
  const links = typeOfProgress.map((progress) => {
    return (
      <li key={progress}>
        <Link to={progress}> {progress}</Link>
      </li>
    );
  });

  return (
    <div className="App">
      <div className="topnav">
        <h3>Task.quo</h3>
        <nav>
          <ul>
            <li>
              <Link to="">All</Link>
            </li>
            {links}
          </ul>
        </nav>
      </div>
      <div className="Task-Container">
        <div className="Task-Heading">
          <h1>My Task</h1>
          <button onClick={showAddTaskForm}>Add New Task</button>
          {newTaskForm ? (
            <NewTask
              submit={addNewTask}
              optionsPriorities={optionsPriorities}
              optionsProgress={optionsProgress}
            />
          ) : (
            ""
          )}
        </div>
        <div className="Task-List">
          <div className="Task-List-Container">
            <Routes>
              <Route path="/" element={listTask} />
              <Route
                path=":status"
                element={
                  <FilterTask
                    tasks={tasks}
                    deleteTask={deleteTask}
                    handleEditClick={handleEditClick}
                    handleCompleteClick={handleCompleteClick}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      {editTaskForm ? (
        <EditTask
          submit={updateTask}
          cancel={cancelUpdateTask}
          {...editTask}
          optionsPriorities={optionsPriorities}
          optionsProgress={optionsProgress}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
