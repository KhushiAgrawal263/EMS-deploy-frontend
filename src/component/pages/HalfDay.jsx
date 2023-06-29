import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './WorkHome.css'

const HalfDay = ({props}) => {
    const date = props.date
    const id = props.id;
    const user = JSON.parse(localStorage.getItem("EMSuser"));

    // show or hide additable fields
    const [addTask9, setAddTask9] = useState(false);
    const [addTask11, setAddTask11] = useState(false);
    const [addTask1_30, setAddTask1_30] = useState(false);

    // set input text
    const [task9, setTask9] = useState();
    const [task11, setTask11] = useState();
    const [task1_30, setTask1_30] = useState();

    // set name and value
    const [name, setname] = useState();
    const [value, setValue] = useState();
    const url = '/wfh'
    useEffect(()=>{
        const fetchtask=async ()=>{
            console.log("data");
            const task = await fetch(`${url}/${id}/${date}`);
            const res = await task.json();
            console.log(res,"halfDay");
            setTask9(res[0].halfDay[0].first);
            setTask11(res[0].halfDay[1].second);
            setTask1_30(res[0].halfDay[2].third);
        }
        fetchtask();
    })

    // set value
    const addtaskHandler9=(e)=>{
        setname(e.target.name)
        setValue({
            id:id,
            date:date,name:user.name,
            empId:user.empId,
            val:"halfDay",
            halfDay:{
                [e.target.name]:e.target.value
            }
        })
    }

    const addTaskHandler11 = (e) => {
        setname(e.target.name)
        setValue({
            id:id,
            date:date,
            name:user.name,
            empId:user.empId,
            val:"halfDay",
            halfDay:{
                [e.target.name]:e.target.value
            }
        })
    }

    const addTaskHandler1_30 = (e) => {
        setname(e.target.name)
        setValue({
            id:id,
            date:date,
            val:"halfDay",name:user.name,
            empId:user.empId,
            halfDay:{
                [e.target.name]:e.target.value
            }
        })
    }

    // adding task
    const main=async (value)=>{
        const res = await fetch(`${url}/${id}`,{
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        const data = await res.json();
        console.log(data);
    }

    // task submit handler
    const addTaskHandler=async ()=>{
        if(name=='first'){
            main(value);
            setAddTask9(true);
        }else if(name=='second'){
            main(value);
            setAddTask11(true);
        }else if(name=='third'){
            main(value);
            setAddTask1_30(true);
        }
    }

  return (
    <div className='FullDay'>
        <h3>Half Day Work From Home</h3>
        <div className='timeBlock'>
            {
                addTask9 == true || task9 ?
                <div className='addTask'>
                    <div className='time'>9:00 AM - 11:00 AM</div>
                    <div className='Task'> {task9}</div>
                </div> :
                <div className='addTask'>
                    <div className='time'>9:00 AM - 11:00 AM</div>
                    <input type='text' name='first'  onChange={addtaskHandler9} />
                    <button className = 'btn btn-primary btn-lg' onClick= {addTaskHandler}>Add Your Task</button>
                </div>
            }
        </div>


        <div className='timeBlock'>
            {
                addTask11 == true || task11 ?
                <div className='addTask'>
                    <div className='time'>11:00 AM - 1:00 PM</div>
                    <div className='Task'> {task11}</div>
                </div> :
                <div className='addTask'>
                    <div className='time'>11:00 AM - 1:00 PM</div>
                    <input type='text' name='second'  onChange={addTaskHandler11} />
                    <button className = 'btn btn-primary btn-lg' onClick= {addTaskHandler}>Add Your Task</button>
                </div>
            }
        </div>

            <div className='timeBlock'>
            {
                addTask1_30 == true || task1_30 ?
                <div className='addTask'>
                    <div className='time'>1:00 PM - 2:00 PM</div>
                    <div className='Task'> {task1_30}</div>
                </div> :
                <div className='addTask'>
                    <div className='time'>1:00 PM - 2:00 PM</div>
                    <input type='text' name='third'  onChange={addTaskHandler1_30} />
                    <button className = 'btn btn-primary btn-lg' onClick= {addTaskHandler}>Add Your Task</button>
                </div>
            }
        </div>
    </div>
  )
}

export default HalfDay