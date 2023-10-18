import { useEffect, useState } from "react"
import { getAllTasks } from '../api/task.api'
import { TaskCard } from "./TaskCard";

export function TaskList(){
    const [tasks, setTasks] = useState([]);
    useEffect(
        () => {
            async function loadTasks() {
                const res = await getAllTasks()
                setTasks(res.data)
            }
            loadTasks()
        }, []
      )
    return(
    <div className='md:grid grid-cols-3 gap-4'>
        {tasks.map(task => (<TaskCard key={task.id} task={task}/>))}
    </div>)
}