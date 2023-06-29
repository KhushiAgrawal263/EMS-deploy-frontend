import React, {useEffect, useRef, useState} from 'react'
import './Sidebar.css'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFile, faPlus, faFilePen, faHouseLaptop, faCalendar, faPaperPlane, faBell, faList, faPager, faListCheck, faLaptop, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
// const user = JSON.parse(localStorage.getItem("EMSuser"));
// const role = user && user.role;


const user = JSON.parse(localStorage.getItem("EMSuser"));
const role = user && user.role;

const Sidebar = () => {
  const [display, setDisplay] = useState();
  // const display = useRef();

  const [employee, setEmployee] = useState();

  const selectedPage = window.location.pathname;

  const navLinks = document.querySelectorAll('div div Link');
  navLinks.forEach(element => {
    if(element.to.includes(`${selectedPage}`)){
      element.classList.add('sideItem1');
    }
  });


  return (
      <div className='sidebar'>
      { 
        role == 'admin' && 
        <div>
          <Link to='/home' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/home' || selectedPage == '/EmployeeDetails'? 'sideItem1 sideItem' : 'sideItem'} >
              <div  className='sideLink'>
                <FontAwesomeIcon icon={faUser} className='fAIcon' />
                <div>Employee</div>
              </div>
            </div>
          </Link>

          <Link to='/adminDoc' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/adminDoc' || selectedPage == '/documentDetails' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faFile} className='fAIcon' />
                <div>Documents</div>
              </div>
            </div>
          </Link>

          <Link to='/addEmployee' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/addEmployee' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faPlus} className='fAIcon' />
                <div>Add</div>
              </div>
            </div>
          </Link>

          <Link to='/reviewLeave' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/reviewLeave' || selectedPage == '/leaveDetails' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faFilePen} className='fAIcon' />
                <div>Leaves</div>
              </div>
            </div>
          </Link>

          {/* <Link to='/reviewWfh' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/reviewWfh' || selectedPage == '/wfhDetails' ? 'sideItem1 sideItem' : 'sideItem'}>
              <div className='sideLink'>
                <FontAwesomeIcon icon={faHouseLaptop} className='fAIcon' />
                <div>WFH</div>
              </div>
            </div>
          </Link> */}

          <Link to='/adminCal' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/adminCal' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faCalendar} className='fAIcon' />
                <div>Calendar</div>
              </div>
            </div>
          </Link>

          <Link to='/prevNotification' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/prevNotification' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faBell} className='fAIcon' />
                <div>Pop-up</div>
              </div>
            </div>
          </Link>
        </div>
      }
      {
        role == 'user' && 
        <div>
          <Link to='/home' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/home' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faUser} className='fAIcon' />
                <div>Dashboard</div>
              </div>
            </div>
          </Link>


          <Link to='/document' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/document' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faFile} className='fAIcon' />
                <div>Documents</div>
              </div>
            </div>
          </Link>

          <Link to='/calendar' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/calendar' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faCalendarDay} className='fAIcon' />
                <div>Calendar</div>
              </div>
            </div>
          </Link>

          <Link to='/applyLeaves' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/applyLeaves' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faUser} className='fAIcon' />
                <div>Leaves</div>
              </div>
            </div>
          </Link>

          {/* <Link to='/workFromHome' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/workFromHome' ? 'sideItem1 sideItem' : 'sideItem'}>
              <div to='/workFromHome' className='sideLink'>
                <FontAwesomeIcon icon={faLaptop} className='fAIcon' />
                <div>WFH</div>
              </div>
            </div>
          </Link> */}

          <Link to='/rules' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/rules' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faListCheck} className='fAIcon' />
                <div>R&R</div>
              </div>
            </div>
          </Link>

          <Link to='/prevNotification' style={{'textDecoration' : 'none'}}>
            <div className= {selectedPage == '/prevNotification' ? 'sideItem1 sideItem' : 'sideItem'} >
              <div className='sideLink'>
                <FontAwesomeIcon icon={faBell} className='fAIcon' />
                <div>Pop-ups</div>
              </div>
            </div>
          </Link>

        </div>
      }
      </div>

  );
}

export default Sidebar