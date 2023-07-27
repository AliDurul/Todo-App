import { useState } from "react"

const TaskForm = ({ onAdd }) => {

  const [taskName, setTaskName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(taskName)
    setTaskName("")
  }


  return (
    <form onSubmit={handleSubmit}>
      <button>+</button>
      <input type="text"
        placeholder="Your Next task.."
        onChange={e => setTaskName(e.target.value)}
        value={taskName} 
        required/>
    </form>
  )
}

export default TaskForm