import React, { useEffect } from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './component/NavBar';
import Sidebar from './component/Sidebar';
import Main from './component/pages/Main';
import Calendars from './component/pages/Calendars';
import Leaves from './component/pages/Leaves';
import Salary from './component/pages/Salary';
import Apply from './component/pages/Apply';
import WorkHome from './component/pages/WorkHome';
import Login from './component/login/Login'
import Document from './component/pages/Document';

//////// Employee imports
import Employee from './component/admin/Employee'
import ReviewLeave from './component/admin/ReviewLeave'
import LeavesDetail from './component/admin/LeavesDetail'
import EmployeeAdd from './component/admin/EmployeeAdd'
import EmployeeDetail from './component/admin/EmployeeDetail'
import Wfh from './component/admin/Wfh'
import WfhDetail from './component/admin/WfhDetail';
import Rules from './component/pages/Rules';
import AdminCal from './component/admin/AdminCal'
import AdminDoc from "./component/admin/AdminDoc";
import DocumentDetails from "./component/admin/DocumentDetails";

import Footer from './component/Footer';
import Error from './component/Error';
import PrevNotifications from './component/PrevNotifications';

function App( { history } ) {
  // useEffect(() => {
  //   history.listen((action) => {
  //     if (action !== "PUSH") {
  //       history.go(1);
  //     }
  //   });
  // }, [history]);

//   function preventBack() {
//     window.history.forward(); 
// }
  
// setTimeout("preventBack()", 0);
  
// window.onunload = function () { null };

// history.pushState(null, null, window.location.href);
//     window.onpopstate = function () {
//         history.go(1);
//     };

  const user = JSON.parse(localStorage.getItem('EMSuser'));
  const role = user && user.role;
  return (
    <div className="App">
      <Router>
        <Routes>
            
            <Route index path='/' element= {<Login />} />
            {
              role=='user' && <>
              <Route path="/home" element= {<Main />} />
              <Route path="/salary" element= {<Salary />} />
              <Route path="/calendar" element= { <Calendars /> } />
              <Route path="/leaves" element= {<Leaves />} />
              <Route path="/applyLeaves" element={<Apply />} />
              <Route path="/workFromHome" element={<WorkHome />} />
              <Route path="/document" element={<Document />} />
              <Route path="/rules" element={<Rules />} />
              </>
            }
            {
              role == 'admin' && <>
              <Route path="/home" element= {<Employee />} />
              <Route path="/reviewLeave" element= {<ReviewLeave />} />
              <Route path="/leaveDetails" element= { <LeavesDetail /> } />
              <Route path="/addEmployee" element= {<EmployeeAdd />} />
              <Route path="/EmployeeDetails" element={<EmployeeDetail />} />
              <Route path="/workFromHome" element={<WorkHome />} />
              <Route path="/reviewWfh" element={<Wfh />} />
              <Route path="/wfhDetails" element={<WfhDetail />} />
              <Route path="/adminCal" element={<AdminCal />} />
              <Route path="/adminDoc" element={<AdminDoc />} />
              <Route path="/documentDetails" element={<DocumentDetails />} />
              </>
            }
              <Route path="*" element={<Error />} />
              <Route path="/prevNotification" element={<PrevNotifications />} />
        </Routes>
      </Router>
      {/* <Footer /> */}

    </div>
  );
}

export default App;
