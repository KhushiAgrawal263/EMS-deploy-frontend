import React, { useEffect } from "react";
import "./Calendars.css";
import { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import Sidebar from "../Sidebar";
import NavBar from "../NavBar";

const Calendars = () => {
  const [date, setDate] = useState(new Date());
  const [saturday, setSaturday] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [saturdayUser,setSaturdayuser] = useState([]);
  const [holidayUser,setHolidayuser] = useState([]);
  const id = JSON.parse(localStorage.getItem("EMSuser")).id;

  useEffect(() => {
    const fetchnotifications = async () => {
      const data = await fetch(
        `/user/get/user/all/notifi/${id}`
      );
      const notifications = await data.json();
      notifications[0].notifications.map((notification) => {
        if (notification.type == "Saturday Status") {
          notification.holidayDate &&
            setSaturday((arr) => [notification, ...arr]);
        } else if (notification.type == "Holiday") {
          notification.holidayDate &&
            setHoliday((arr) => [...arr, notification]);
        }
      });
    };
    fetchnotifications();
  }, []);

  const changeHandler=(day)=>{
    console.log(day);
    const date = moment(day).format("DD-MM-YYYY");
    console.log(date);
    const unique=[];
    setHolidayuser([]);
    setSaturdayuser([]);
    holiday.map((item) => {
      var findItem = unique.find((x) => x._id === item._id);
      if (!findItem) unique.push(item);
    });
    saturday.map((item) => {
      var findItem = unique.find((x) => x._id === item._id);
      if (!findItem) unique.push(item);
    });
    unique.map((eachnotifi)=>{
      if(eachnotifi.holidayDate===date)
      {
        if(eachnotifi.type=='Holiday')
        {
          setHolidayuser(arr=>[...arr,eachnotifi])
        }else if(eachnotifi.type=='Saturday Status')
        {
          setSaturdayuser(arr=>[...arr,eachnotifi])
        }
      }
    })
  }


  return (
    <>
      <Sidebar />
      <NavBar />
      <div className="calendarBg">
        <div className="calendar">
          <div className="cal-con">
            <div className="calendar-container">
              <Calendar
                onChange={changeHandler}
                value={date}
                tileClassName={({ date, view }) => {
                  if (
                    holiday &&
                    holiday.find((x) => x.holidayDate === moment(date).format("DD-MM-YYYY"))
                  ) {
                    return "highlightbtns1";
                  } else {
                    if (
                      saturday &&
                      saturday.find(
                        (x) => x.holidayDate === moment(date).format("DD-MM-YYYY")
                      )
                    ) {
                      return "highlightbtn2";
                    }
                  }
                }}
              />
            </div>
            <div className="holidayColor">
              <div className="holidays">
                <div className="hdiv greenDiv"></div>{" "}
                <div className="RLeave">Holiday</div>
              </div>
              <div className="holidays">
                <div className="hdiv blueDiv"></div>{" "}
                <div className="RLeave">Saturday Status</div>
              </div>
            </div>
          </div>

          <div className='cal-details cal-emp-details'>
                <h3>This Day Leaves</h3>
                <div className='CalDate'>
                    {date.toDateString()}
                </div>
                <div className='adminCalCards'>
                  {
                    holidayUser && holidayUser.map((user)=>(
                      <div className='leaveCalCard'>
                            <div className='sideCalLeave'></div>
                            <div className='calLeaveContent'>
                                <h4>{user.type}</h4>
                                <p>{user.message}</p>
                            </div>
                        </div>
                    ))
                  }

                  {
                    saturdayUser && saturdayUser.map((user)=>(
                      <div className='wfhCalCard'>
                          <div className='sideCalWfh'></div>
                          <div className='calLeaveContent'>
                              <h4>{user.type}</h4>
                              <p>{user.message}</p>
                          </div>
                      </div>
                    ))
                  }
                </div>
            </div>

          {/* <div>
            <div className="leaveCalCard">
              <div className="sideCalLeave"></div>
              <div className="calLeaveContent">
                <h4>Saturday Status</h4>
                <p>Work From Home</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Calendars;
