import { useEffect, useState } from 'react'
import './App.css'
import { Routes,createBrowserRouter,RouterProvider } from "react-router"

import Home from './components/Home'
import AddTask from './components/AddTask'


import dog from '..//src/assets/dog.png'
import fruit from '..//src/assets/fruit.png'
import meditation from '..//src/assets/meditation.png'
import run from '..//src/assets/run.png'
import noSmoke from '..//src/assets/no-smoking.png'
import study from '..//src/assets/study.png'
import sleep from '..//src/assets/sleep.png'
import wakeup from '..//src/assets/wakeup.png'
import workout from '..//src/assets/workout.png'
import drink from '..//src/assets/drink.png'
import Reports from './components/Reports'


function App() {

  const [tasks,setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [] ;
  });

  const icons = [{label:'run',value:run},{label:'dog',value:dog},{label:'fruit',value:fruit},{label:'meditation',value:meditation},{label:'noSmoke',value:noSmoke},
                {label:'study',value:study},{label:'sleep',value:sleep},{label:'wakeup',value:wakeup},{label:'workout',value:workout},{label:'drink',value:drink}
  ];
  const date = new Date();
    const options = {weekday: 'long',day: 'numeric',month: 'long',year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

  useEffect(() => {
    if(tasks.length === 0){
      const task1 = {
        title: 'RUN',
        img : run,
        description: 'RUN 5 KM',
        freq: 1,
        compleatcount:0
    }
    const task2 = {
        title: 'STUDY',
        img : study,
        description: 'STUDY 90 MINUTS (3)',
        freq: 3,
        compleatcount:0
    }
    const task3 = {
        title: "WATER",
        img : drink,
        description: "DRINK 5 LITER WATER",
        freq: 5,
        compleatcount:0
    }
    const task4 = {
        title: 'EAT HEALTHY',
        img : fruit,
        description: 'EAT A HEALTHY MEAL',
        freq: 3,
        compleatcount:0
    }
    const task5 = {
        title: 'DOG',
        img : dog,
        description: 'WALK THE DOG',
        freq: 1,
        compleatcount:0
    }
    setTasks([task1,task2,task3,task4,task5]);
    }
    }, [])

  useEffect(() => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {

    const lastResetDate = localStorage.getItem('lastResetDate');
    if(lastResetDate !== formattedDate){
      const reset = tasks.map((task) => ({...task, compleatcount: 0}) );
      setTasks(reset);
      localStorage.setItem('lastResetDate',formattedDate);
    }
  }, [formattedDate]);
  
    const router = createBrowserRouter([
      {path:'/', element: <Home tasks={tasks} setTasks={setTasks} formattedDate={formattedDate} /> },
      {path:'/addtask', element: <AddTask icons={icons} setTasks={setTasks} formattedDate={formattedDate} /> },
      {path:'/report', element: <Reports tasks={tasks} formattedDate={formattedDate} /> }
    ]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
