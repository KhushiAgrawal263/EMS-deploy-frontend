import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar'
import Sidebar from '../Sidebar'
import axios from 'axios'
import './AdminDoc.css'

const AdminDoc = () => {
    const [user,setUser] = useState();

    const userURL = 'http://localhost:8000'
    useEffect(() => {
        const fetchurl= async ()=>{
            // get all users with docStatus pending or approved
            const res = await fetch(`${userURL}/get/document/users`,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
            setUser(data)
        }
        fetchurl();
      },[]);


  return (
    <>
        <Sidebar />
        <NavBar />
        <div className='adminDoc'>
        <div className='adminDocBg'>
        <table class="table table-striped levaeTable table-hover">
                <thead>
                    <tr>
                    {/* <th scope='col'>S.No.</th> */}
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Document Status</th>
                    <th scope='col'>Document Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user &&
                        user.map((oneuser)=>(
                            <tr key={oneuser._id}>
                                {/* <th scope="row">1</th> */}
                                <th scope="row">{oneuser.empId}</th>
                                <td>{oneuser.name}</td>
                                {
                                    oneuser.docStatus=='pending' && 
                                    <td> <img src="https://img.icons8.com/color/48/null/hourglass.png"/> </td>
                                }
                                {
                                     oneuser.docStatus=='approved' && 
                                     <td> <img src="https://img.icons8.com/color/48/null/approval--v1.png"/> </td>
                                }
                                
                                <td> <Link to='/documentDetails' className='btn btn-success' state={{ user:oneuser }} >Get Details</Link> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </div>
    </>
  )
}

export default AdminDoc