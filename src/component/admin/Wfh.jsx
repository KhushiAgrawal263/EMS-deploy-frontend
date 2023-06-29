import React from 'react'
import './Wfh.css'
import Sidebar from '../Sidebar';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Loading from '../Loading';

const Wfh = () => {
    const [uniqueArr,setUniqueArr] = useState();
    const [userData,setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = '/wfh/wfh/users/allwfhusers';

    useEffect(()=>{
        const getallusers=async ()=>{
            setLoading(true);
            try {
                const users = await fetch(url);
                const res = await users.json();
                console.log(res);
                const unique = [...new Map(res.map(item => [item && item.id, item])).values()]
                setUniqueArr(unique)
            } catch (error) {
                console.log((error));
            }
            setLoading(false);
        }
        getallusers();
    },[])
  return (
    <>
        <NavBar/>
        <Sidebar />
        {
            !loading ?
        <div className='wfh'>
            <div className='wfhBg'>
        <table class="table table-striped levaeTable">
                <thead>
                    <tr>
                    <th scope='col'>S.No.</th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Work From Home Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        uniqueArr &&
                        uniqueArr.map((user,index)=>(
                            <tr>
                                <th scope="row">{index+1}</th>
                                <th scope="row">{user && user.empId}</th>
                                <td>{user && user.name}</td>
                                <td>
                                    <Link to="/wfhDetails" state={{user:user}} class="btn btn-success">
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

export default Wfh