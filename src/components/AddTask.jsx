import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {  useForm } from "react-hook-form";
import back from '..//assets/chevron-left.png';

const AddTask = ({icons,setTasks,formattedDate}) => {

  const navigate = useNavigate();
  const [selectedIcon,setselectedIcon] = useState("");
  const [iconError,setIconError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    if(!selectedIcon){
      setIconError(true);
      return;
    }
    setIconError(false);

    const icon = icons.find((i) => i.label === selectedIcon)
    const task = {
      title: data.title.toUpperCase(),
      img:icon?.value,
      description: data.description.toUpperCase(),
      freq: data.frequency,
      compleatcount:0,
    }
    setTasks(prev => [...prev,task] );
    navigate('/');
    
  };
  return (
    <div style={{backgroundImage: "linear-gradient(to top, #f77062 0%, #fe5196 100%)"}} className='flex text-left text-white flex-col gap-5  w-[450px]  rounded-2xl border-white border-1 p-10'>
      <p className='h-7 w-50 m-auto text-white font-bold'>{formattedDate}</p>
      <NavLink className='h-12 w-12' to={'/'}> <img className=' p-1 rounded-2xl'  src={back} alt="back-img" /> </NavLink>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 text-white gap-3">
        <div>
          <label className="block mb-1 font-medium text-2xl">Select Icon : </label>
          <div className='flex gap-3 flex-wrap w-full h-16 px-3 py-2 border-2 border-white rounded focus:outline-none focus:ring-2 ring-white overflow-auto'>
            {icons.map((icon) => (
              <div key={icon.label} className={`cursor-pointer p-1 border-2 rounded-lg ${selectedIcon === icon.label ? 'border-white' : 'border-transparent'}`}  onClick={() => setselectedIcon(icon.label)}>
                <img className='h-8 w-8' src={icon.value} alt={icon.label} />
              </div>
            ))}
          </div>        
          {/* Error Message */}
          {iconError && <p className="text-black text-sm mt-1">Icon is required</p>}
        </div>

        {/* Title Field */}
        <div>
          <label className="block mb-1 font-medium text-2xl">Title : </label>
          <input type="text"  placeholder="e.g. Drink Water" {...register("title", {required: "Title is required", maxLength: {value: 15, message: "Max 15 characters allowed",},})} className="w-full px-3 py-2 border-2 border-white rounded focus:outline-none focus:ring-2 ring-white"/>
          {/* Error Message */}
          { errors.title && ( <p className="text-black text-sm mt-1">{errors.title.message}</p>) }
        </div>
        <div>
          <label className='block mb-1 font-medium text-2xl' >Frequency</label>
          <input type="number" max={10} min={1} placeholder='e.g. twice a day' {...register ("frequency", {required: "Frequency is required"})} className='w-full px-3 py-2 border-2 border-white rounded focus:outline-none focus:ring-2 ring-white' />
          { errors.frequency && ( <p className='text-black text-sm mt-1'> {errors.frequency.message} </p> ) }
        </div>
        <div>
          <label className='block mb-1 font-medium text-2xl' >Description</label>
          <input type="text" placeholder='e.g. DRINK 5L WATER' {...register ("description", {required: "description is required", maxLength: {value: 25, message: "Max value is 25 "}})} className='w-full px-3 py-2 border-2 border-white rounded focus:outline-none focus:ring-2 ring-white' />
          { errors.description && ( <p className='text-black text-sm mt-1'> {errors.description.message} </p> ) }
        </div>


        {/* Submit Button */}
        <button type="submit" className="w-full bg-pink-800 text-white py-2 rounded hover:bg-orange-500 transition">Add Task</button>
      </form>

    </div>
  );  
};

export default AddTask
