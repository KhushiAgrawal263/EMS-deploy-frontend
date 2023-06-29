import React, { useEffect } from 'react'
import './WorkHome.css'
import { useState } from 'react'
import FullDay from './FullDay'
import HalfDay from './HalfDay'
import Sidebar from '../Sidebar'

import NavBar from '../NavBar'

const WorkHome = () => {
  const [day, setDay] = useState('fullday');
  const [date, setDate] = useState();
  const [todayDate, setTodayDate] = useState();
  const [dateInfo,setDateInfo] = useState(false);
  const [data,setData] = useState(false);

  const id = JSON.parse(localStorage.getItem("EMSuser")).id;
  const url = '/wfh'

    useEffect(()=>{
        const fetchtask=async ()=>{
            console.log("data");
            console.log(date);
            if(date){
              setDateInfo(true)
              const task = await fetch(`${url}/${id}/${date}`);
              const res = await task.json();
              setData(res);
              console.log(res);
            }else{
            }

        }
        fetchtask();
    },[url,id,date])

    const datehandler =(e)=>{
      const reverse = (date)=>{
        const year = date.split("-")[0];
        const month = date.split("-")[1];
        const day = date.split("-")[2];
        return `${day}-${month}-${year}`
      }
      let newdate = new Date().toJSON().slice(0, 10);
      setDate(reverse(e.target.value));
      setTodayDate(reverse(newdate));
    }
    console.log(todayDate);

  return (
    <>
    <NavBar/>
    <Sidebar />
    <div className='workHomeBg'>
    <div className='workHome'>
        <h1>WORK FROM HOME TASK LIST!!</h1>
        <div className='workDate'>
            <input type="date" onChange={datehandler}  />
        </div>
        {
          dateInfo ?
            <>
              {
                data==null ? parseInt(date.slice(0, 2)) > parseInt(todayDate.slice(0, 2))  ? <p>You are not allowed for this date...</p>
                : parseInt(date.slice(0, 2)) < parseInt(todayDate.slice(0, 2)) ? <p>No work from home for this day...</p>
                :
                <>
                  <div>
                    <button
                      className={day == 'fullday' ? 'DayBtn1' : 'DayBtn'}
                      onClick={()=>setDay("fullday")}
                    >
                      Full Day
                    </button>
                    <button
                      className={day == 'halfday' ? 'DayBtn1' : 'DayBtn'}
                      onClick={()=>setDay("halfday") }
                    >
                      Half Day
                    </button>
                  </div>
                  {
                    day=="halfday" ? <HalfDay props={{date:date,id:id}} /> : <FullDay props={{date:date,id:id}} />
                  }
                </>
                : data && data[0].fullDay.length ==0 ? <HalfDay props={{date:date,id:id}} /> : <FullDay props={{date:date,id:id}} />
              }

          </> : <p className='pos'>Select a date...</p>
        }
    </div>
    </div>
    </>
  )
}

export default WorkHome