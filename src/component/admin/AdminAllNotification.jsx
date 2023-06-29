import React, { useEffect } from 'react'
import { useState } from 'react'
import '../PrevNotifications.css'

const AdminAllNotification = () => {
    const[not, setNot] = useState('All')
    const id = JSON.parse(localStorage.getItem("EMSuser")).id;
    const [notifications,setNotifications]=useState([]);
    const [count,setCount] = useState();
    let uniqueAll=[];

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

    notifications.map((item) => {
        var findItem = uniqueAll.find((x) => x._id === item._id);
        if (!findItem) uniqueAll.push(item);
      });
    let LeaveUnique=[];
    let Birthday=[];
    let documentUnique=[];
    uniqueAll.map((leave)=>{
        if(leave.type=='Leave Applied'){
            LeaveUnique.push(leave);
        }else if(leave.type=='Birthday'){
            Birthday.push(leave);
        }else if(leave.type=='Doc uploaded'){
            documentUnique.push(leave);
        }
    })

  return (
    <div className='adminAllNotificationBg'>
    <div className='adminAllNotification'>
        <div className='adminNotificationHead'>
            <div className={not == 'All' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('All')}>All({count})</div>
            <div className={not == 'Leave' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('Leave')}>Employee Leaves</div>
            <div className={not == 'Birthday' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('Birthday')}>Events</div>
            <div className={not == 'Document' ? "alladmin allAdminNoti" : "alladmin"} onClick={() => setNot('Document')}>Documents</div>
        </div>

        {
            not=='All' &&
            <>
                {
                    uniqueAll.length>0 ? uniqueAll.map((leave)=>(
                        <div className='adminNotifcationContent'>
                            <div className='unseen-adminNotifcationContent'>
                                <div className='notificatoion-text'>{leave.message}</div>
                                <div className='notification-date'>{leave.date}</div>
                            </div>
                        </div>
                    )) : <p className='no-notifi'>No Notifications </p>
                }
            </>
        }

        {
            not=='Leave' &&
            <>
                {
                    // console.log(LeaveUnique)
                    LeaveUnique.length>0 ? LeaveUnique.map((leave)=>(
                        <div className='adminNotifcationContent'>
                            <div className='unseen-adminNotifcationContent'>
                                <div className='notificatoion-text'>{leave.message}</div>
                                <div className='notification-date'>{leave.date}</div>
                            </div>
                        </div>
                    )) : <p className='no-notifi'>No Notifications </p>
                }
            </>
        }

        {
            not=='Birthday' &&
            <>
               {
                    Birthday.length>0 ? Birthday.map((leave)=>(
                        <div className='adminNotifcationContent'>
                            <div className='unseen-adminNotifcationContent'>
                                <div className='notificatoion-text'>{leave.message}</div>
                                <div className='notification-date'>{leave.date}</div>
                            </div>
                        </div>
                    )) : <p className='no-notifi'>No Notifications </p>
                }
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
    </div>
  )
}

export default AdminAllNotification