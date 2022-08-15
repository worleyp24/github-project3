import React, { useState } from "react";

const NewTask = ({ submit, optionsPriorities, optionsProgress }) => {
  const [task, setTask] = useState({
    name: "",
    priority: "",
    progress: "",
    startdate: new Date(),
    duedate: "",
    createddate: "",
    modifieddate: "",
  });

  const [valueName, setValueName] = useState("");
  const [valuePriority, setValuePriority] = useState("");
  const [valueProgress, setValueProgress] = useState("");

  // Function for onChange of input & select box
  const onChange = (e) => {
    const inputName = e.target.name;
    switch (inputName) {
      case "name":
        setValueName(e.target.value);
        setTask({
          ...task,
          name: e.target.value,
        });
        break;
      case "priority":
        setValuePriority(e.target.value);
        setTask({
          ...task,
          priority: e.target.value,
        });
        break;
      case "progress":
        setValueProgress(e.target.value);
        setTask({
          ...task,
          progress: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  // Function for onClick Add Task
  const onSubmitTask = (e) => {
    e.preventDefault();
    submit(task);
    setTimeout(() => {
      setValueName("");
      setValuePriority("");
      setValueProgress("");
    }, 10);
  };

  return (
    <div className="New-Task-Form">
      <form>
        <input
          name="name"
          type="text"
          value={valueName}
          onChange={onChange}
          placeholder="Enter a task name"
          required
        />
        <br />
        <label>Priority: </label>
        <select name="priority" value={valuePriority} onChange={onChange}>
          <option value="" disabled selected hidden>
            Please Choose...
          </option>
          {optionsPriorities}
        </select>
        <br />
        <label>Progress: </label>
        <select name="progress" value={valueProgress} onChange={onChange}>
          <option value="" disabled selected hidden>
            Please Choose...
          </option>
          {optionsProgress}
        </select>
      </form>
      <button className="submit-btn" onClick={onSubmitTask}>
        + Add Task
      </button>
    </div>
  );
};

export default NewTask;
