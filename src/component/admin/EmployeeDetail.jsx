import React, { useEffect } from 'react'
import Sidebar from '../Sidebar';
import { useState } from 'react';
import './EmployeeDetail.css'
import AddTask from './AddTask';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar';
import { IoLogoLinkedin } from "react-icons/io";
import { AiFillTwitterSquare } from "react-icons/ai";

const EmployeeDetail = () => {
  const location = useLocation()
  const id = location.state.id;
  const userURL = `/${id}`

  const [user, setUser] = useState();
  const [updateButton, setUpdateButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user && user.email);
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [bond, setBond] = useState();
  const [ctc, SetCtc] = useState();
  const [oEmail, setOEmail] = useState();
  const [marital, setMarital] = useState();
  const [reload, setReload] = useState(false);

  // get user
  useEffect(() => {
    setReload(false)
    const fetchurl = async () => {
      const res = await fetch(userURL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
    }
    fetchurl();
  }, [userURL, reload]);


  const editHandler = () => {
    setUpdateButton(true);
  }

  const saveHandler = async () => {
    setReload(true)
    setLoading(true);
    const val = {
      email: email,
      address: address,
      contactNo: contact,
      ctc: ctc,
      bond: bond,
      oEmail: oEmail,
      maritalStatus: marital
    }
    const res = await fetch(userURL, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(val)
    });
    const data = await res.json();
    setUpdateButton(false);
    // window.location.href='/EmployeeDetails'
    setLoading(false);
  }

  return (
    <>
      <NavBar />
      <Sidebar />
      <div className='EdetailsBg'>
        <div className='Edetails'>
          <div className='mainInfo'>
            <div className='photoDiv'>
              <img
                src={`data:image/png;base64,${user && user.image.data}`}
                alt=""
              />
            </div>

            <div className='mainInfoName'>
              <h1>{user && user.name}</h1>
              <h3>{user && user.designation}</h3>
            </div>
          </div>

          <div className='AllDetails'>

            <button type="button" className="all-details-btn" onClick={editHandler}>Edit Information</button>

            {
              updateButton === true ?
                <div>
                  <div className='pDetails'>
                    <table className="table pDetailsTable">
                      <th scope="col">Personal Details :</th>

                      <tbody>
                        <tr>
                          <th scope="row">Email id : </th>
                          <td> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={user.email} /> </td>
                        </tr>
                        <tr>
                          <th scope="row">Date of birth : </th>
                          <td>09-10-2001</td>
                        </tr>
                        <tr>
                          <th scope="row">Address : </th>
                          <td> <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={user.address} /> </td>
                        </tr>
                        <tr>
                          <th scope="row">Gender : </th>
                          <td> {user && user.gender ? user.gender : '---'} </td>
                        </tr>
                        <tr>
                          <th scope="row">Marital Status : </th>
                          <td> <input type="text" value={marital} onChange={(e) => setMarital(e.target.value)} placeholder={user.maritalStatus} /> </td>
                        </tr>
                        <tr>
                          <th scope="row">Blood Group : </th>
                          <td> {user && user.bloodGroup ? user.bloodGroup : '---'} </td>
                        </tr>
                        <tr>
                          <th scope="row">Contact Number : </th>
                          <td> <input type="number" value={contact} onChange={(e) => setContact(e.target.value)} placeholder={user.contactNo} /> </td>
                        </tr>
                        <tr>
                          <th scope="row">Aadhar Number : </th>
                          <td> {user && user.aadharNo} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                  <div className='pDetails'>
                    <table className="table pDetailsTable">
                      <th scope="col">Professional Details :</th>

                      <tbody>
                        <tr>
                          <th scope="row">Joining Date : </th>
                          <td>12-12-2022</td>
                        </tr>
                        <tr>
                          <th scope="row">CTC : </th>
                          <td> <input type="text" value={ctc} onChange={(e) => SetCtc(e.target.value)} placeholder={user.salary.ctc} /></td>
                        </tr>
                        <tr>
                          <th scope="row">Bond Duration : </th>
                          <td> <input type="text" value={bond} onChange={(e) => setBond(e.target.value)} placeholder={user.bond} /></td>
                        </tr>
                        {/* <tr>
                      <th scope="row">Registration  : </th>
                      <td>53365</td>
                    </tr> */}
                        <tr>
                          <th scope="row">Employee ID : </th>
                          <td>2023FB256</td>
                        </tr>
                        <tr>
                          <th scope="row">Office Email-id : </th>
                          <td> <input type="email" value={oEmail} onChange={(e) => setOEmail(e.target.value)} placeholder={user.oEmail} /> </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='pDetails'>
                    <table className="table pDetailsTable">
                      <th scope="col">Bank Details :</th>

                      <tbody>
                        <tr>
                          <th scope="row">Account Number : </th>
                          <td> {user && user.bankDetails.accNo}</td>
                        </tr>
                        <tr>
                          <th scope="row">IFSC code : </th>
                          <td> {user && user.bankDetails.ifscCode} </td>
                        </tr>
                        <tr>
                          <th scope="row">Branch : </th>
                          <td> {user && user.bankDetails.branch} </td>
                        </tr>
                        <tr>
                          <th scope="row">Pin Code : </th>
                          <td>{user && user.bankDetails.pinCode} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='pDetails'>
                    <table className="table pDetailsTable">
                      <th scope="col">Social Profiles :</th>

                      <tbody>
                        <tr>
                          <th scope="row"><div className='scope-gap'><div><img className="insta" src="Image/insta.png" alt="" /></div><div>Instagram :</div></div> </th>
                          <td>  {user && user.instaId ? user.instaId : '---'}</td>
                        </tr>
                        <tr>
                          <th scope="row"><IoLogoLinkedin className="linked" size="35" /> Linked :  </th>
                          <td>  {user && user.linkedinId ? user.linkedinId : '---'}</td>
                        </tr>


                        <tr>
                          <th scope="row"><AiFillTwitterSquare className="twit" size="35" /> Twitter : </th>
                          <td>  {user && user.twitterId ? user.twitterId : '---'} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                  {loading ? (
                    <div
                      class="spinner-border"
                      role="status"
                      style={{ height: "20px", width: "20px", float: "right", marginRight: "150px", marginTop: "-25px" }}
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <button className='save-btn' onClick={saveHandler}>Save</button>
                  )}
                </div >

                :
                <div>
                  <div className='pDetails'>
                    <table className="table pDetailsTable">
                      <th scope="col">Personal Details :</th>

                      <tbody>
                        <tr>
                          <th scope="row">Email id : </th>
                          <td>{user && user.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Date of birth : </th>
                          <td>{user && user.dob}</td>
                        </tr>
                        <tr>
                          <th scope="row">Address : </th>
                          <td> {user && user.address} </td>
                        </tr>
                        <tr>
                          <th scope="row">Gender : </th>
                          <td> {user && user.gender ? user.gender : '---'} </td>
                        </tr><tr>
                          <th scope="row">Marital Status : </th>
                          <td> {user && user.maritalStatus ? user.maritalStatus : '---'} </td>
                        </tr><tr>
                          <th scope="row">Blood Group : </th>
                          <td> {user && user.bloodGroup ? user.bloodGroup : '---'} </td>
                        </tr>
                        <tr>
                          <th scope="row">Contact Number : </th>
                          <td> {user && user.contactNo} </td>
                        </tr>
                        <tr>
                          <th scope="row">Aadhar Number : </th>
                          <td> {user && user.aadharNo} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                  <div className='pDetails'>
                    <table className="table pDetailsTable">
                      <th scope="col">Professional Details :</th>

                      <tbody>
                        <tr>
                          <th scope="row">Joining Date : </th>
                          <td>{user && user.joiningDate}</td>
                        </tr>
                        <tr>
                          <th scope="row">CTC : </th>
                          <td> {user && user.salary.ctc} </td>
                        </tr>
                        <tr>
                          <th scope="row">Bond Duration : </th>
                          <td> {user && user.bond} </td>
                        </tr>
                        {/* <tr>
                      <th scope="row">Registration  : </th>
                      <td>{user && user.registrationNo}</td>
                    </tr> */}
                        <tr>
                          <th scope="row">Employee ID : </th>
                          <td>{user && user.empId}</td>
                        </tr>
                        <tr>
                          <th scope="row">Office Email-id : </th>
                          <td> {user && user.oEmail} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='pDetails'>
                    <table className="table pDetailsTable">
                      <th scope="col">Bank Details :</th>

                      <tbody>
                        <tr>
                          <th scope="row">Account Number : </th>
                          <td> {user && user.bankDetails.accNo}</td>
                        </tr>
                        <tr>
                          <th scope="row">IFSC code : </th>
                          <td> {user && user.bankDetails.ifscCode} </td>
                        </tr>
                        <tr>
                          <th scope="row">Branch : </th>
                          <td> {user && user.bankDetails.branch} </td>
                        </tr>
                        <tr>
                          <th scope="row">Pin Code : </th>
                          <td>{user && user.bankDetails.pinCode}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='pDetails'>
                    <table className="table pDetailsTable">
                      <th scope="col">Social Profile :</th>

                      <tbody>
                        <tr>
                          <th scope="row"><div className='scope-gap'><div><img className="insta" src="Image/insta.png" alt="" /></div><div>Instagram :</div></div></th>
                          <td> {user && user.instaId ? <a href={user && user.instaId} className="cardALink" target="_blank">{user && user.instaId}</a> : '---'}</td>
                        </tr>
                        <tr>
                          <th scope="row"><IoLogoLinkedin className="linked" size="35" /> Linked : </th>
                          <td> {user && user.linkedinId ? <a href={user && user.linkedinId} className="cardALink" target="_blank">{user && user.linkedinId}</a> : '---'} </td>
                        </tr>
                        <tr>
                          <th scope="row"> <AiFillTwitterSquare className="twit" size="35" /> Twitter :</th>
                          <td> {user && user.twitterId ? <a href={user && user.twitterId} className="cardALink" target="_blank">{user && user.twitterId}</a> : '---'} </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                  {/* <div className='pDetails'>
              {user ? <AddTask props={ {task:user.taskCompleted,id:user._id}} /> : <p>Loading...</p>}
              </div> */}
                </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeDetail
