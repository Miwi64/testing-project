import {Link} from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className='md:flex justify-between py-3'>
        <Link to='/tasks'>
          <h1 className='font-bold text-3xl mb-4'>Tasks</h1>
        </Link>
        <div className='flex gap-4'>
          <button className='bg-indigo-500 px-3 py-2 rounded-lg'>
            <Link to='/task-create'>Create new Task</Link>
          </button>
          <button className='bg-indigo-500 px-3 py-2 rounded-lg'>
            <Link to='/export'>Export Data</Link>
          </button>
        </div>
    </div>
  )
}