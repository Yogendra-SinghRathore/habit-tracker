import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import back from '..//assets/chevron-left.png';

const Reports = ({tasks,formattedDate}) => {
  
  let dateObj = new Date(formattedDate);
  let day = String(dateObj.getDate()).padStart(2, '0');
  let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth is zero-based
  let year = dateObj.getFullYear();

  const today = `${day}-${month}-${year}`;
  

  const [recentDates,setRecentDates] = useState(() => {
    const saved = localStorage.getItem('recentDates');
    return saved ? JSON.parse(saved) : [] ;
  });
  const [dailytasks,setDailytasks] = useState(() => {
    const saved = localStorage.getItem('dailytasks');
    return saved ? JSON.parse(saved) : {} ; 
  });

  useEffect(() => {
    if (!recentDates.includes(today)) {
    setRecentDates(prev => {
      const updated = [...prev, today];
      const unique = [...new Set(updated)];
      if (unique.length > 7) unique.shift();
      return unique;
    });
  }
    // Calculate today's task scores
    const todayTasks = tasks.map((task) => {
      const score = parseFloat(((10 / task.freq) * task.compleatcount).toFixed(2));
      return { description: task.description, score };
    });
    setDailytasks((prev) => ({...prev,
      [today]: todayTasks,
      }));
    }, [today,tasks]);

  useEffect(() => {
    localStorage.setItem('recentDates',JSON.stringify(recentDates));
  }, [recentDates])
  useEffect(() => {
    localStorage.setItem('dailytasks',JSON.stringify(dailytasks));
  }, [dailytasks])
  
  let totalScore = 0;  
  let maxScore = 0;
 
  recentDates.forEach(date => {
    dailytasks[date]?.forEach(task => {
    totalScore += task.score;
    maxScore += 10;
    });
  });

  let weeklyTaskScores = {};


  recentDates.forEach(date => {
    dailytasks[date].forEach(task => {
      if(!weeklyTaskScores[task.description]){
        weeklyTaskScores[task.description] = 0;
      }
      weeklyTaskScores[task.description] += task.score; 
    });
  });

  const [showFirst,setShowFirst] = useState(true);

  return (
    <div className='flex  text-white flex-col font-bold gap-5  w-[500px]  rounded-2xl border-white border-2 p-5'>
        <NavLink className='h-12 w-12' to={'/'}> <img className=' p-1 rounded-2xl'  src={back} alt="back-img" /> </NavLink>
        <p className='h-7 w-50 m-auto text-white font-bold'>{formattedDate}</p>
        <h1 className='text-[2rem] font-bold text-white'>Weekly Report</h1>
        <p style={{ background: `linear-gradient(to right, white ${(totalScore / maxScore) * 100}%, black 0%)`,}} 
        className="w-full h-10 border-2 border-white rounded-2xl flex items-center justify-center text-green-500 font-bold">Your Score: {((totalScore / maxScore)*100).toFixed(2)} %</p>
        

        <button className='border-1 bg-pink-700 border-white rounded-2xl hover:cursor-pointer w-fit m-auto px-4 py-1' onClick={() => setShowFirst(prev => !prev) }>
          {showFirst ? 'Weekly Report' : 'Daily Report'}
        </button>

        {showFirst ? (<div className='border-2 flex rounded-2xl flex-col gap-2 p-1'>
          <div>
            <h2 className='text-lg font-semibold text-white'> {recentDates[0]} -- {recentDates[recentDates.length-1]} </h2>
            { Object.entries(weeklyTaskScores).map(([description,score]) => (
            <div className='text-white p-2 flex justify-between'>
              <p>{description} </p>
              <p>Score : {score} </p>
            </div>
          ))}
          </div>
        </div>) : (<div className='report-scrollbar border-2 flex rounded-2xl flex-col gap-2 p-2 h-[36vh] overflow-scroll'>
          {recentDates.map(date => (
          <div key={date} className='border-2 rounded-2xl p-1'>
            <h2 className='text-lg font-semibold text-white'>{date}</h2>
            {dailytasks[date]?.map((task, index) => (
              <div key={index} className='text-white p-2 flex justify-between'>
                <p>{task.description}</p>
                <p>Score : {task.score} / 10 </p>
              </div>
          ))}
          </div>
        ))}
        </div>)}
        

        
    </div>
  )
}

export default Reports
