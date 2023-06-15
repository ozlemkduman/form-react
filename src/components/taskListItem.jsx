import PrioritySvg from "./prioritySvg";
function TaskListItem({ task, editTask, removeTask, doneTask }) {
  return (
    <>
      <li className={`list-group-item my-1 ${task.isDone===true && "bg-success-subtle bg-gradient"}`}>
        {task.priority === true && (
          <span className="badge text-bg-success me-2">
            <PrioritySvg />
          </span>
        )}
        {task.task.charAt(0).toUpperCase()+task.task.slice(1)}
        <div className="btn-group float-end" role="group">
          <button
            className="btn btn-sm  btn-success me-1"
            onClick={() => doneTask(task.uuid)}
          >
            Done
          </button>
          <button
            className="btn btn-sm  btn-secondary me-1"
            onClick={() => editTask(task.uuid)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm  btn-danger"
            onClick={() => removeTask(task.uuid)}
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
}

export default TaskListItem;
