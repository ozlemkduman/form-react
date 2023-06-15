import { useEffect, useState } from "react";

import TaskListItem from "./taskListItem";

function TaskList({ taskProp, removeTask, editTask, doneTask}) {
  
  const [isPriority,setIsPriority]=useState(false)
  const [filteredTask,setFilteredTask]=useState(taskProp)

  function handlePriority(){
    
    setIsPriority(prev=>!prev)
    
    console.log(isPriority, taskProp.filter(item=>item.isPriority));

   
  }

  useEffect(()=>{
    setFilteredTask(taskProp)
  },[taskProp])

  useEffect(()=>{
    isPriority===true ?
    setFilteredTask(taskProp.filter(item=>item.priority===true)) : 
    setFilteredTask(taskProp)
  },[isPriority])


  if (taskProp.length === 0) {
    return;
  }

  return (
    <>
      <div className="p-2 m-1 border rounded bg-light">
        <h6 className="mb-4 mt-2">Tasks <button className={`btn ${isPriority===false ? "btn-success" : "btn-secondary"} float-end `} onClick={handlePriority}>{isPriority===true ? "All Tasks" : "Get Priority"}</button></h6>
        <ul className="list-group my-2">
          {filteredTask.map((task) => (
            <TaskListItem task={task} key={task.uuid} removeTask={removeTask} editTask={editTask} doneTask={doneTask}/>
          ))}
        </ul>
      </div>
    </>
  );
}
export default TaskList;
