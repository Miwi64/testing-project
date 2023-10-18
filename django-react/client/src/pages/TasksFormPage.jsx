import {useForm} from 'react-hook-form'
import {createTask, deleteTask, updateTask, getTask} from '../api/task.api'
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react'
import {toast} from 'react-hot-toast'

export function TasksFormPage() {
    useEffect(()=>{
      async function loadTask() {
        if(params.id) {
          const { data: {description, title} } = await getTask(params.id)
          setValue('title', title)
          setValue('description', description)
        }
      }
      loadTask()
    }, [])
    const {register, handleSubmit, setValue, formState: {errors}} = useForm()
    const navigate = useNavigate()
    const params = useParams()

    const onSubmit = handleSubmit(async data => {
      if(params.id){
        await updateTask(params.id, data)
        toast.success('Selected task has been updated', 
          {position: 'bottom-right', 
          style: {
            backgroundColor: '#101010',
            color: '#fff'
          }})
      }
      else{
        await createTask(data)
        toast.success('Task created successfully', 
          {position: 'bottom-right', 
          style: {
            backgroundColor: '#101010',
            color: '#fff'
          }})
      }
      navigate('/tasks')
    })

    const handleDelete = async () => {
      const accepted = window.confirm('Are you sure')
      if(accepted){
        await deleteTask(params.id)
        toast.success('Selected task has been deleted', 
          {position: 'bottom-right', 
          style: {
            backgroundColor: '#101010',
            color: '#fff'
          }})
        navigate('/tasks')
      }
    }

    return (
      <div className='max-w-xl mx-auto'>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Title" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          {...register("title", {required: true})}/>
          {errors.title && <span>This field is required</span>}
          <textarea rows="3" placeholder="Description" className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          {...register("description", {required: true})}/>
          {errors.description && <span>This field is required</span>}
          <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3 hover:cursor-pointer'>Save</button>
        </form>
        {params.id &&
          <button
            className='bg-red-500 p-3 rounded-lg w-full mt-3 hover:cursor-pointer'
            onClick={handleDelete}>
              Delete
          </button>
        }
      </div>
    )
  }