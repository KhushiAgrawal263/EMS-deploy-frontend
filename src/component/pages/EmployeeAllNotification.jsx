import React, { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../Loading';
import '../PrevNotifications.css'

const EmployeeAllNotification = () => {
    const[not, setNot] = useState('All')
    const [notifications,setNotifications]=useState([]);
    const [count,setCount] = useState();
    const [loading, setLoading] = useState(false);
    const id = JSON.parse(localStorage.getItem("EMSuser")).id;

    useEffect(()=>{
        const fetchSeennotifications =async ()=>{
          const res = await fetch(`/user/get/user/seen/notifi/${id}`);
          const data = await res.json();
          console.log(data[0].notifications,"hiiiiiiii");
          let n =0;
          data[0].notifications.map((eachnotifi)=>{
            if(eachnotifi.status == 'seen'){
                n++;
                setNotifications(arr=>[eachnotifi,...arr]);
            }
          })
          setCount(n);
        }
        fetchSeennotifications();
      },[])

    let uniqueAll=[];
    notifications && notifications.map((item) => {
        var findItem = uniqueAll.find((x) => x._id === item._id);
        if (!findItem) uniqueAll.push(item);
      });
    let LeaveUnique=[];
    let weekend=[];
    let NewUserUnique=[];
    let documentUnique=[];
    uniqueAll && uniqueAll.map((leave)=>{
        if(leave.type=='Leave Declined' || leave.type=='Leave Approved'){
            LeaveUnique.push(leave);
        }else if(leave.type=='Holiday' || leave.type=='Saturday Status'){
            weekend.push(leave);
        }else if(leave.type=='New employee'){
            NewUserUnique.push(leave);
        }else if(leave.type=='Doc Approved' || leave.type=='Doc approved' || leave.type=='Doc rejected'){
            documentUnique.push(leave);
        }
    })


    return (
      <div className='adminAllNotification'>
          <div className='adminNotificationHead'>
              <div className={not == 'All' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('All')}>All({count && count})</div>
              <div className={not == 'Leave' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('Leave')}> Leaves</div>
              <div className={not == 'Event' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('Event')}>Events</div>
              <div className={not == 'welcome' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('welcome')}>New Employee</div>
              <div className={not == 'Document' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('Document')}>Documents</div>
          </div>

        {
            not == 'All' &&
            <>
                <div className='adminNotifcationContent'>
                    {
                        !loading ?   uniqueAll.length>0 ? uniqueAll.map((eachnotifi)=>(
                            <div className='unseen-adminNotifcationContent'>
                                <div className='notificatoion-text'>{eachnotifi.message}</div>
                                <div className='notification-date'>{eachnotifi.date}</div>
                            </div>
                        )) : <p className='no-notifi'>No Notifications </p> : <Loading />
                    }
                </div>
            </>
        }

        {
            not == 'Leave' &&
            <>
                <div className='adminNotifcationContent'>
                    {
                        LeaveUnique.length>0 ? LeaveUnique.map((eachnotifi)=>(
                            <div className='unseen-adminNotifcationContent'>
                                <div className='notificatoion-text'>{eachnotifi.message}</div>
                                <div className='notification-date'>{eachnotifi.date}</div>
                            </div>
                        )): <p className='no-notifi'>No Notifications </p>
                    }
                </div>
            </>
        }

        {
            not == 'Event' &&
            <>
                <div className='adminNotifcationContent'>
                    {
                        weekend.length>0 ? weekend.map((eachnotifi)=>(
                            <div className='unseen-adminNotifcationContent'>
                                <div className='notificatoion-text'>{eachnotifi.message}</div>
                                <div className='notification-date'>{eachnotifi.date}</div>
                            </div>
                        )): <p className='no-notifi'>No Notifications </p>
                    }
                </div>
            </>
        }

        {
            not == 'welcome' &&
            <>
                <div className='adminNotifcationContent'>
                    {
                        NewUserUnique.length>0 ? NewUserUnique.map((eachnotifi)=>(
                            <div className='unseen-adminNotifcationContent'>
                                <div className='notificatoion-text'>{eachnotifi.message}</div>
                                <div className='notification-date'>{eachnotifi.date}</div>
                            </div>
                        )): <p className='no-notifi'>No Notifications </p>
                    }
                </div>
            </>
        }

    {
            not == 'Document' &&
            <>
                <div className='adminNotifcationContent'>
                    {
                        documentUnique.length>0 ? documentUnique.map((eachnotifi)=>(
                            <div className='unseen-adminNotifcationContent'>
                                <div className='notificatoion-text'>{eachnotifi.message}</div>
                                <div className='notification-date'>{eachnotifi.date}</div>
                            </div>
                        )): <p className='no-notifi'>No Notifications </p>
                    }
                </div>
            </>
        }
      </div>
    )
}

export default EmployeeAllNotification