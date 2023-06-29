import React, {useState} from 'react'
import { useEffect } from 'react';
import NavBar from '../NavBar';
import Sidebar from '../Sidebar';
import './Leaves.css'

const Leaves = () => {
    const userId = JSON.parse(localStorage.getItem("EMSuser")).id;
    const [value, setValue] = useState('none');
    const [appLeaves, setAppLeaves] = useState();
    const [leaves,setLeaves] = useState();

    useEffect(()=>{
        const fetchUserLeaves = async()=>{
            const data = await fetch(`/leave/${userId}`);
            const res = await data.json();
            if(res.length==0){
                setAppLeaves([]);
            }else{
                setAppLeaves(res[0].approved);
            }
        }
        fetchUserLeaves();
    },[])

      const handleChange = (e) => {
        setValue(e.target.value);
        function filterfunc(leaves) {
            return leaves.date.split('-')[1]==e.target.value;
          }
          if(appLeaves!=null){
            const result = appLeaves.filter(filterfunc);
            console.log("kjhbvgdrfhj");
            setLeaves(result);
          }else{
            setLeaves([])
          }
      };

  return (
    <>
    <Sidebar/>
    <NavBar/>
    <div className='leaves'>
        <div className='leavesMonth'>
            <select value={value} onChange={handleChange}>
                <option value="none" selected disabled hidden>Select ---</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        </div>
        {
            value=='none' ||  leaves.length==0 ? "" :
            <div className='leavesMain'>
                <div className='leavesM '>
                    Leaves Taken : <span className='leavesTaken'>{leaves && leaves.length}</span>
                </div>
                <div className='leavesM '>
                    Total Leaves : <span className='leavesTotal'>3</span>
                </div>
                <div className='leavesM leavesLeft'>
                    Leaves Left : <span className='leavesLeft'>{3 - parseInt(leaves && leaves.length)}</span>
                </div>
            </div>
        }

        <div className='leavesCard'>
            {
                value=='none' ? <p style={{fontSize:"2rem"}}>Select month to check the Leave Details...</p> :
                leaves && leaves.length!=0 ? leaves.map((leave,index)=>(
                    <div className='leaveCard'>
                        <div className='leaveNum'>Leave : <span className='leaveNumber'>{leaves.length - index}</span> </div>
                        <div className='leavesDiv'>
                            <div className='leaveDat'>Date : <span className='leaveDate'>{leave.startDate}</span></div>
                            <div className='leaveRes'>Reason : <span className='leaveReson'>{leave.reason}</span></div>
                        </div>
                    </div>
                )) : <p  style={{fontSize:"2rem"}}>No leaves this month...</p>
            }


            {/* <div className='leaveCard'>
                <div className='leaveNum'>Leave : <span className='leaveNumber'>2</span> </div>
                <div className='leavesDiv'>
                    <div className='leaveDat'>Date : <span className='leaveDate'>09-01-2023</span></div>
                    <div className='leaveRes'>Reason : <span className='leaveReson'>Family Function</span></div>
                </div>
            </div> */}
        </div>
    </div>
  </>)
}

export default Leaves