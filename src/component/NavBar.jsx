import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './NavBar.css'
import Notifications from './Notifications';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faLongArrowAltUp, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Pusher from 'pusher-js'

function NavBar(props) {
  const user = JSON.parse(localStorage.getItem("EMSuser"));
  const id = user.id;
  const [showNotification, setShowNotification] = useState(false);
  const [msgStatus,setmsgStatus] = useState(true);
  const [event,setEvent] = useState(false);
  const [count,setCount] = useState();
  const [unseenUserNotifi,setUnseenUserNotifi] = useState([]);
  const [userData,setUserData]=useState();

  let newdate = new Date().toJSON().slice(0, 10);
  const [year, month, day] = newdate.split('-');
  const today = [day,month, year].join('-');

  const pusher = new Pusher('e9552c2250d8d44dd8fe', {
        cluster: 'ap2',
    encrypted: true,
    });
    const channel = pusher.subscribe('users');

    // channel.bind('inserted', function(data) {
    //   console.log("event trioggered");
    //   setEvent(true);
    // });

 // fetch unseen notifications of employee
 const fetchunseennotifications =async ()=>{
    const res = await fetch(`/user/get/user/notifi/${id}`);
    const data = await res.json();
    let n =0;
    data.notifications.map((eachnotifi)=>{
      if(eachnotifi.status=="unseen"){
        n++;
        setUnseenUserNotifi(arr=>[eachnotifi,...arr]);
      }
    })
    setCount(n);
  }

    const fetchBirthdayDates=async()=>{
      const resd = await fetch(`/get/birthdaydates/users`);
      const dataa = await resd.json();
      const dates=[];
      dataa.forEach(async bd => {
        const [year, month, day] = bd.array.split('-');
        const result = [day,month, year].join('-');
        if(parseInt(today.slice(3, 5))==parseInt(result.slice(3, 5))){
          if(parseInt(today.slice(0,2))==parseInt(result.slice(0,2))-1){
            const notifi = {
              type:"Birthday",
              message:`Tomorrow is ${bd.name}'s Birthday`,
              date:today,
              role:"admin",
              status:"unseen",
              id:bd._id
            }
                const generateNotifi = await fetch(`/admin/user/addnotifi/${bd._id}`,{
                  method: 'POST',
                  headers: {
                      accept: 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(notifi)
                });
                const Notifi = await generateNotifi.json();
          }
        }
      });
    }

    const fetchUsers = async () => {
      const res = await fetch(`/${user.id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
    };

    useEffect(()=>{
      setEvent(false);
      fetchunseennotifications();
      fetchBirthdayDates();
      fetchUsers();
    },[event]);


  const handleLogout=()=>{
    localStorage.setItem("EMSuser",null);
    window.location.href = '/'
  }

  const handleShowNotification=()=>{
    setShowNotification(true);
  }

  const handleCross = (data) => {
    setShowNotification(false)
    unseenUserNotifi.map(async (notifi)=>{
      const resd = await fetch(`/user/user/updatestatus/${id}/${notifi._id}`,{
        method: 'PUT',
        headers: {
            accept: 'application/json',
        },
    });
      const dataa = await resd.json();
      console.log(dataa);
    })
    setUnseenUserNotifi([])
    setCount(0)
    // window.location.href='/home'
  }
  return (

    <div className='nav'>
      <div className='userNavBar' onClick={()=>window.location.href='/home'}>
        {
          user.role=='user' && props.image ? <img src={`data:image/png;base64,${props.image}`} alt="" />
          : userData && userData.image && <img src={`data:image/png;base64,${userData.image.data}`} alt="" />
        }
        {
          user.role=='admin' && <img src="/Image/girl.jpg" alt="" />
        }
        <div>
          <p>{user.name}</p>
          <span>{user.designation}</span>
        </div>
      </div>
      <div className='navbarButton'>
        <button  onClick={() => setShowNotification(handleShowNotification)}>
            {
                msgStatus &&
                <NotificationBadge
                className="badge"
                count={count}
                effect={Effect.SCALE}
              />
             }
           {/* <img src="Image/notification.png" title='Notifications'/> */}
           <FontAwesomeIcon style={{'paddingRight' : '13px'}} icon={faBell}/>
            Notifications
        </button>
        <div className='navNotification'>
              {
                showNotification ? <Notifications props={{unseen:unseenUserNotifi,handleCross}} /> : " "
              }
        </div>
        <button onClick={handleLogout}>
          {/* <img src="Image/logout.png" title="Logout" /> */}
          <FontAwesomeIcon style={{'paddingRight' : '13px'}} icon={faRightFromBracket} />
          Logout
        </button>

      </div>
    </div>
  );
}


export default NavBar;

































// import { useRef } from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import './NavBar.css'
// import Notifications from './Notifications';



// function NavBar() {
//   const [showNotification, setShowNotification] = useState(false);

//   const wrapperRef = useRef(null);
//   useOutsideAlerter(wrapperRef);

//   const user = localStorage.getItem("EMSuser");
//   const handleLogout=()=>{
//     localStorage.setItem("EMSuser",null);
//     window.location.href = '/'
//   }

//   function useOutsideAlerter(ref) {
//     useEffect(() => {
//       function handleClickOutside(event) {
//         if (ref.current && !ref.current.contains(event.target)) {
//           setShowNotification(false)
//         }
//       }
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, [ref]);
//   }


//   return (
//     <>
//       <div className='nav'>
//         <img src={'Image/logo.png'} alt="" />
//         <h1 className='navText'>staffie!</h1>
//         <div
//            onClick={() => setShowNotification(!showNotification)}
//            className='not'
//            ref={wrapperRef}
//           >

//             <div className='notificationBadge'>
//                <img src="Image/notification.png" title='Notifications'/>
//                <div className='Badge'>10</div>
//             </div>
//             <div className='navNotification'>
//               {
//                 showNotification ? <Notifications notificationState="true"/> : " "
//               }
//             </div>
//         </div>

//           <div className="btn-logout" onClick={handleLogout}>
//             <img src="Image/logout.png" title="Logout" />
//           </div>


//       </div>
//     </>
//   );
// }


// export default NavBar;




