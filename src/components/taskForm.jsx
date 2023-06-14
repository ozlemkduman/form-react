import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./taskShow";

function TaskForm() {
  const emptyTask = { task: "", priority: false };

  const [formData, setFormData] = useState(emptyTask);
  const [tasks, setTasks] = useState([]);

  function editTask(uuid) {
    const task = tasks.find(item => item.uuid === uuid);

    setFormData({...task, isEdited: true });
    console.log(uuid)
  }

  function removeTask(uuid) {
    console.log(uuid);
    setTasks((prev) => prev.filter((item) => item.uuid !== uuid));
  }

  function handleInputChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      };
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if(formData.isEdited){
      const taskIndex = tasks.findIndex(item=>item.uuid===formData.uuid)
      const newTasks=tasks.slice()
      newTasks[taskIndex] = {...formData}

      setTasks(newTasks)
    }

    else if (formData.task.length > 2) {
      formData.uuid = uuidv4();
      setTasks((prev) => [formData, ...prev]);
    }

    setFormData(emptyTask);
    e.target.reset();
    //useEffect({tasks},[tasks])
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3">
          <label htmlFor="task" className="col-sm-2 col-form-label">
            Task
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="task"
              value={formData.task}
              name="task"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.priority}
                id="priority"
                name="priority"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="priority">
                Priority
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <br />
      <hr />

      <TaskList taskProp={tasks} removeTask={removeTask} editTask={editTask} />
    </>
  );
}

export default TaskForm;
