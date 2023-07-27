import { useEffect, useState } from "react";
import TaskForm from "./compenents/TaskForm";
import Tasks from "./compenents/Tasks";

import "./css/App.css";
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name) => {
    setTasks([...tasks, { name: name, done: false }]);
  };

  const updateTaskDone = (taskIndex, newDone) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  };

  const numberComplete = tasks.filter((task) => task.done).length;
  const numberTotal = tasks.length;

  const getMessage = () => {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) return "Try to do at least one! 🙏🏼";
    if (percentage === 100) return "Nice Job for today! 👏🏼";

    return "Keep it going 💪🏼";
  };

function removeTask(indexToRemove){
setTasks(prev =>{
  return prev.filter((index)=> index !== indexToRemove)
})
}

const renameTask = (index,newName) => {
  setTasks(prev =>{
    const newTask = [...prev]
    newTask[index].name = newName
    return newTask;
  })
}


  return (
    <main>
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Tasks
          key={index}
          {...task}
          onRename={newName =>renameTask(index,newName)}
          onTrash={()=>removeTask(index)}
          onToggle={(done) => updateTaskDone(index, done)}
        />
      ))}
    </main>
  );
}

export default App;
