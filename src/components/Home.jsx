import React, { useEffect, useState } from 'react'
import plus from '..//assets/plus.png'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import delet from '..//assets/delete.png'
import edit from '..//assets/edit.png'


const Home = ({tasks,setTasks,formattedDate}) => {

  const navigate = useNavigate();
  const [taskState,setTaskState] = useState([]);

  useEffect(() => {
    if(tasks.length > 0){
      setTaskState(tasks.map(t => ({...t})));
    }
  }, [tasks]);

  const handleClick = (index) => {
    const updatedTasks = taskState.map((task,i) => {
      if(i === index && task.compleatcount < task.freq){
        return {...task, compleatcount: task.compleatcount+1}
      }
      return task;
    });
    setTaskState(updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div className='relative flex justify-center items-center py-2'>
        <p className='text-white font-bold px-4 py-1'>{formattedDate}</p>
        <NavLink className='absolute right-4 text-blue-800 font-bold px-4 py-1' to={'/report'}>Report </NavLink>
      </div>
      <div className='grid-container grid grid-cols-2 gap-8  h-[90vh] overflow-auto custom-scrollbar'>
      {taskState.map((task,index) => {
        const percent = Math.min((task.compleatcount / task.freq) * 100,100);
        const degree = percent*3.6;
      
      return (
        <div key={task.title} onClick={() => handleClick(index)}  className='flex flex-col justify-center items-center m-1 gap-2 hover:cursor-pointer'>
            <div style={{background: `conic-gradient(#fff ${degree}deg, black 0deg)`,}} className='flex justify-center items-center rounded-full  h-[23vh] w-[23vh]'>
              <div style={{backgroundImage: "linear-gradient(to top, #f77062 0%, #fe5196 100%)"}} className='style={} flex justify-center gap-[0.1rem] items-center flex-col text-white p-8 pt-0.8 rounded-full h-[93.5%] w-[93.5%]'>    
                <img className='h-20 w-20 mb-1' src={task.img} alt="task-img" />
                <p className='text-[1.05rem] font-bold'>{task.freq}</p> 
                <h3 className='text-[1.1rem] font-bold'>{task.title}</h3>
              </div>
            </div> 
          <p className='text-[1rem] font-bold text-white' >{task.description}</p>
        </div>
      )})}
      <div className='flex flex-col justify-center items-center m-2 gap-2'>
        <div style={{background: `conic-gradient(#10B981 ${0 * 3.6}deg, white 0deg)`,}} className='flex justify-center items-center rounded-full  h-[23vh] w-[23vh]'>
          <div onClick={() => navigate('/addtask')} style={{backgroundImage: "linear-gradient(to top, #f77062 0%, #fe5196 100%)"}} className='hover:cursor-pointer flex justify-center gap-[0.1rem] items-center flex-col text-white p-8 pt-0.8 rounded-full h-[93.5%] w-[93.5%]'>
            <img className='h-15 w-15' src={plus} alt="task-img" />
          </div>
        </div>
        <p className='text-[1.05rem] font-bold text-white'>ADD A TASK</p>
      </div>
      </div>
    </div>
    
  )
}

export default Home
