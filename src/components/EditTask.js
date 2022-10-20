import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditTask = ({
  submit,
  cancel,
  id,
  name,
  priority,
  progress,
  startdate,
  duedate,
  createddate,
  modifieddate,
  optionsPriorities,
  optionsProgress,
}) => {
  // Display value of selected items
  const [valueName, setValueName] = useState(name);
  const [valuePriority, setValuePriority] = useState(priority);
  const [valueProgress, setValueProgress] = useState(progress);
  const [valueChecked, setValueChecked] = useState(false);
  const [startDate, setStartDate] = useState(startdate);
  const [dueDate, setDueDate] = useState(duedate);

  // Store data of the item to be edited
  const [task, setTask] = useState({
    id: id,
    name: name,
    priority: priority,
    progress: progress,
    startdate: startdate,
    duedate: duedate,
    createddate: createddate,
    modifieddate: modifieddate,
  });

  // Function to save edited task
  const onEditTask = (e) => {
    submit(task);
  };

  // Function to cancel editing a task
  const onCancelEdit = (e) => {
    e.preventDefault();
    cancel(false);
  };

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
      case "completed":
        if (e.target.checked) {
          setValueProgress("Completed");
          setTask({
            ...task,
            progress: "Completed",
          });
          setValueChecked(!valueChecked);
        } else {
          setValueProgress("Not Started");
          setTask({
            ...task,
            progress: "Not Started",
          });
          setValueChecked(!valueChecked);
        }
        break;
      default:
        break;
    }
  };

  // Function for onChange of Start Date
  const onChangeStartDate = (date) => {
    setStartDate(date);
    setTask({
      ...task,
      startdate: date,
    });
  };

  // Function for onChange of Due Date
  const onChangeDueDate = (date) => {
    setDueDate(date);
    setTask({
      ...task,
      duedate: date,
    });
  };

  return (
    <div>
      <div className="Edit-Task-Form">
        <form>
          <div className="Edit-Task-Form-Header">
            <label className="container">
              <input
                className="Edit-Task-Form-Complete"
                name="completed"
                type="checkbox"
                checked={valueChecked}
                onChange={onChange}
              />
              <div className="checkmark"></div>
            </label>
            <input
              className="Edit-Task-Form-TaskName"
              name="name"
              type="text"
              value={valueName}
              onChange={onChange}
            />
            <span className="Edit-Task-Form-cancel" onClick={onCancelEdit}>
              x
            </span>
          </div>
          <hr />
          <p className="Edit-Task-Form-ModDate">
            {modifieddate === ""
              ? ""
              : `Last modified ${modifieddate.toLocaleString()}`}
          </p>
          <div className="Edit-Task-Form-Body">
            <div className="Edit-Task-Form-Body-item">
              <label>Bucket: </label>
              <select
                name="bucket"
                value={valuePriority}
                onChange={onChange}
              ></select>
            </div>
            <div className="Edit-Task-Form-Body-item">
              <label>Priority: </label>
              <select name="priority" value={valuePriority} onChange={onChange}>
                {optionsPriorities}
              </select>
            </div>
            <div className="Edit-Task-Form-Body-item">
              <label>Progress: </label>
              <select name="progress" value={valueProgress} onChange={onChange}>
                {optionsProgress}
              </select>
            </div>
            <div className="Edit-Task-Form-Body-item">
              <label>Start Date: </label>
              <DatePicker
                className="Date-Picker"
                name="startdate"
                selected={startDate}
                onChange={(date) => onChangeStartDate(date)}
              />
            </div>
            <div className="Edit-Task-Form-Body-item">
              <label>Due Date: </label>
              <DatePicker
                className="Date-Picker"
                name="duedate"
                selected={dueDate}
                placeholderText={duedate === "" ? "Due anytime" : duedate}
                onChange={(date) => onChangeDueDate(date)}
              />
            </div>
          </div>
        </form>
        <br />
        <button className="Edit-Task-Form-submit-btn" onClick={onEditTask}>
          Save
        </button>
        <p className="Edit-Task-Form-Footer-Created-Date">
          Created Date: {createddate.toLocaleString()}
        </p>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default EditTask;
