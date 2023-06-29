import React from 'react'
import './Notifications.css'


const Notifications = (props) => {
    var unseenNotification = [];
    console.log(props.props.unseen,"jhgiyfgyf");

    props.props.unseen.map((item) => {
        var findItem = unseenNotification.find((x) => x._id === item._id);
        if (!findItem) unseenNotification.push(item);
      });

    const handleClose=(e)=>{
        e.preventDefault();
        props.props.handleCross(true);
    }
    
  return (
    <div className='notifications' >
        <div className='notificationTriangle'></div>
        
        <div className='overallNotification'>
            <div className='crossNoti' onClick={handleClose}>
                <img src="Image/crossNot.png" alt="" />
            </div>
            {
                unseenNotification.length>0 ?  unseenNotification.map((unseen) => (
                    <div className='UnseenInnerDiv' >
                        <p> {unseen.message} </p>
                    </div>
                )) :<p style={{color:'black', 'fontSize' : '1.2rem'}}>No New Notification</p>
            }
        </div>
    </div>
  )
}

export default Notifications