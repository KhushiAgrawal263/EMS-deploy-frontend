import React from 'react'
import './Wfh.css'
import Sidebar from '../Sidebar';
import { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import {useLocation} from 'react-router-dom'

const WfhDetail = () => {
    const location = useLocation();
    const user = location.state.user;

    // data for url
    const id = user.id;
    const url = '/wfh'
    const [date,setDate] = useState();
    const [data,setData] = useState(false);
    const [dateInfo,setDateInfo] =useState(false);
    const [todayDate, setTodayDate] = useState();
    const [halfDayData,setHalfDayData] = useState();
    const [fullDayData,setFullDayData] = useState();

    useEffect(()=>{
        const fetchtask=async ()=>{
            if(date){
              setDateInfo(true)
              const task = await fetch(`${url}/${id}/${date}`);
              const res = await task.json();
              console.log(res,"response");
              console.log(res);
              setData(res);
              setHalfDayData(res[0].halfDay)
              setFullDayData(res[0].fullDay)
              console.log(res[0].fullDay);
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

  return (
    <>
        <NavBar/>
        <Sidebar />
        <div className='wfhDetails'>
            <div className='wfhDetailsBg'>
             <h3>Work From Home details about <span>{user && user.name}</span> </h3>
             <h6>{user && user.empId}, {user && user.designation}</h6>

             <div className='wfhInput'>
                <input type="date" onChange={datehandler} />
                {
                    dateInfo ?
                    <>
                      {
                        data==null ? (parseInt(date.slice(6,10)) > parseInt(todayDate.slice(6,10)) && parseInt(date.slice(3,5)) > parseInt(todayDate.slice(3,5))) ?<p className='pos'>Work From Home doesn't exists for future dates...</p> : (parseInt(date.slice(0,2)) > parseInt(todayDate.slice(0,2)))  ? <p>Work From Home doesn't exists for future dates...</p>
                        : <p className='pos'>No work from home for this day...</p>
                        :data && data[0].fullDay.length ==0 ?
                        <div className='wfhDiv'>
                            <h3>Half Day Work</h3>
                            <div className='workDiv'>
                                <div className='wfhTime'>9:00 AM - 11:00 AM</div>
                                <div className='wfhText'>{halfDayData && halfDayData[0].first}</div>
                            </div>

                            <div className='workDiv'>
                                <div className='wfhTime'>11:00 AM - 1:00 PM</div>
                                <div className='wfhText'>{halfDayData && halfDayData[1] && halfDayData[1].second}</div>
                            </div>

                            <div className='workDiv'>
                                <div className='wfhTime'>1:00 PM - 2:00 PM</div>
                                <div className='wfhText'>{halfDayData && halfDayData[2] && halfDayData[2].third}</div>
                            </div>
                        </div>
                        :
                        <div className='wfhDiv'>
                            <h3>Full Day Work</h3>
                            <div className='workDiv'>
                                <div className='wfhTime'>9:00 AM - 11:00 AM</div>
                                <div className='wfhText'>{fullDayData && fullDayData[0] && fullDayData[0].first}</div>
                            </div>

                            <div className='workDiv'>
                                <div className='wfhTime'>11:00 AM - 1:00 PM</div>
                                <div className='wfhText'>{fullDayData && fullDayData[1] && fullDayData[1].second}</div>
                            </div>

                            <div className='workDiv'>
                                <div className='wfhTime'>1:30 PM - 3:30 PM</div>
                                <div className='wfhText'>{fullDayData && fullDayData[2] && fullDayData[2].third}</div>
                            </div>

                            <div className='workDiv'>
                                <div className='wfhTime'>3:30 PM - 5:30 PM</div>
                                <div className='wfhText'>{fullDayData && fullDayData[3] && fullDayData[3].fourth}</div>
                            </div>
                        </div>
                      }

                  </> : <p className='pos'>Select a date...</p>
                }
             </div>
        </div>
        </div>
    </>
  )
}

export default WfhDetail