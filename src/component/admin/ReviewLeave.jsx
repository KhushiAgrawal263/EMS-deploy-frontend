import React, { useEffect } from 'react'
import './ReviewLeave.css'
import Sidebar from '../Sidebar';
import { Link, useLocation } from "react-router-dom"
import { useState } from 'react';
import NavBar from '../NavBar'
import Loading from '../Loading';


const ReviewLeave = () => {
    const [allUsers , setAllUsers] = useState(false);
    const [loading, setLoading] = useState(false);

    const url = '/get/user'

    useEffect(()=>{
        const fetchallusers=async ()=>{
            setLoading(true);
            const data = await fetch(`${url}`);
            const res = await data.json();
            console.log(res);
            setAllUsers(res);
            setLoading(false);
        }
        fetchallusers();
    },[url])


  return (
    <>
        <NavBar/>
        <Sidebar />
        {
            !loading ?
            <div className='reviewLeaveBg'>
        <div className='reviewLeave'>
            <table class="table table-striped levaeTable table-hover">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Granted Leaves</th>
                    <th scope="col">Leave Status</th>
                    <th scope="col">More Leave Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers && allUsers.map((user)=>(
                                <tr>
                                    <th scope="row">{user.empId}</th>
                                    <td>{user.name}</td>
                                    <td>{user.approvedLeaves}</td>
                                    {
                                        user.pendingLeaves>=1 ? <td> <img src="https://img.icons8.com/color/48/null/hourglass.png"/></td> : <td> <img src="https://img.icons8.com/color/48/null/approval--v1.png"/></td>
                                    }
                                    <td>
                                        <Link to="/leaveDetails" state={{ user: user }} class="btn btn-success" >
                                            Get Details
                                        </Link>
                                    </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div> : <Loading />
    }
    </>
  )
}

export default ReviewLeave