import React, {useEffect, useState, useRef} from 'react'
import Sidebar from '../Sidebar';
import NavBar from '../NavBar';
import './AdminCal.css'
import Calendar from 'react-calendar';
import moment from 'moment';
import AddNotification from './AddNotification';

const AdminCal = () => {
    const [date, setDate] = useState(new Date())
    const [ddmmyyyy,setddmmyyyy] =useState();
    const [approvedLeavesDates,setApprovedLeavesDates] = useState([]);
    const [approvedLeavesUsers,setApprovedLeaveUsers] = useState([]);

    const [wfhDates,setWfhDates] = useState([]);
    const [wfhUsers,setWfhUsers] = useState([]);

    const [mark, setMark] = useState([])

    const[notificationComp, setNotificationComp] = useState(false);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const url = '/leave'
    const wfhurl = '/wfh'

    useEffect(() => {
        const fetchleaves= async ()=>{
            const res = await fetch(`${url}/leaves/getallLeaves`,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await res.json();
            data.map((eachdata)=>{
                if(eachdata && eachdata.array[0].length>0){
                    setApprovedLeavesDates(arr=>[...new Set(arr),...eachdata.array[0]])
                    eachdata && setMark(mark=>[...new Set(mark),...eachdata.array[0]])
                }
            })
        }
        const fetchwfh= async ()=>{
            const res = await fetch(`${wfhurl}/wfh/getdates/users`,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await res.json();
            data.map((eachdata)=>{
                setWfhDates(arr=>[...new Set(arr),eachdata.date])
                setMark(mark=>[...new Set(mark),eachdata.date])
            })
        }
        fetchwfh();
        fetchleaves();
      },[]);

      const handleChange=(day)=>{
        setDate(day);
        const date = moment(day).format("DD-MM-YYYY");
        setddmmyyyy(date);
        // console.log(date);
        const fetchLeavesUsers= async ()=>{
            const res = await fetch(`${url}/approved/usersbydate/${date}`,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await res.json();
            // console.log(data);
            setApprovedLeaveUsers(data);
        }

        const fetchWfhUsers= async ()=>{
            const res = await fetch(`/wfh/${date}`,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await res.json();
            setWfhUsers(data)
            console.log(data);
            console.log(data.id);

        }

        fetchWfhUsers();
        fetchLeavesUsers();
      }

      function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setNotificationComp(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

  return (
    <>
        <NavBar />
        <Sidebar />
        <div className='calBg'>

    <div className='calOverallDiv'>
        <div className={notificationComp ? 'adminCal1' : 'adminCal'}>
            <div className='admin-cal-head'>
                <h2>Employee's Overview!</h2>
                {/* <div className='addHoliday' ref={wrapperRef}>
                    <a className={notificationComp ? "buttonCal1" : "buttonCal"}
                        onClick={() => setNotificationComp(!notificationComp)}
                    >Add Holiday</a>
                    {
                        notificationComp ? <AddNotification/> : ''
                    }
                </div> */}
            </div>
            <div className="adminCal-container">
                <Calendar onChange={handleChange} value={date}
                // onClickDay={handleClick}
                tileClassName={({ date, view }) => {
                    if(mark.find(x=>x===moment(date).format("DD-MM-YYYY"))){
                     return  'highlightbtn1'
                    }
                  }}
                />
            </div>
            <div className='cal-details'>
                <h3>This Days Leaves and Work from home</h3>
                <div className='CalDate'>
                    {date.toDateString()}
                </div>
                <div className='adminCalCards'>

                    {
                        approvedLeavesUsers && approvedLeavesUsers.map((user)=>(
                            <div className='leaveCalCard'>
                                <div className='sideCalLeave'></div>
                                <div className='calLeaveContent'>
                                    <h4>{user.name}</h4>
                                    <p>{user.empId}</p>
                                    {
                                        user.approved.map((leave)=>(
                                            leave.date==ddmmyyyy ? leave.leaveType =='cl' ? <p>Casual Leave</p> : leave.leaveType=='fl' ? <p>Flexi leave</p> :
                                            leave.leaveType =='sl' ? <p>Sick Leave</p> : <p>Earned Leave</p> :''
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }

                    {
                        wfhUsers && wfhUsers.map((user)=>(
                            <div className='wfhCalCard'>
                                <div className='sideCalWfh'></div>
                                <div className='calLeaveContent'>
                                    <h4>{user.name}</h4>
                                    <p>{user.empId}</p>
                                    {user.fullDay.length==0 ? <p>HalfDay Work From Home</p> : <p>FullDay Work From Home</p>}
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>

        <div className='addHoliday' ref={wrapperRef}>
                    <a className={notificationComp ? "buttonCal1" : "buttonCal"}
                        onClick={() => setNotificationComp(!notificationComp)}
                    >Add Holiday</a>
                    {
                        notificationComp ? <AddNotification/> : ''
                    }
                </div>
        </div>
        </div>
    </>
  )
}

export default AdminCal