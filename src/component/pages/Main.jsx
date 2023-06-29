import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Main.css";
import { useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import NavBar from "../NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { AiFillTwitterSquare } from "react-icons/ai";
import {
  faCircleInfo,
  faEdit,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [socialEdit, setSocialEdit] = useState(false);
  const [edited, setEdited] = useState(false);
  const [email, setEmail] = useState(data && data.email);
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [aadhar, setAadhar] = useState();
  const [gender, setGender] = useState();
  const [marital, setMarital] = useState();
  const [blood, setBlood] = useState();
  const [insta, setInsta] = useState();
  const [linked, setLinked] = useState();
  const [twit, setTwit] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const user = JSON.parse(localStorage.getItem("EMSuser"));
  const userId = user.id;
  const userURL = `https://emsapi.onrender.com/${userId}`;
  const location = useLocation();

  if (user) {
    console.log("mbhgfdydsyr");
    window.history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      window.history.go(1);
    };
  }

  useEffect(() => {
    const fetchurl = async () => {
      const res = await fetch(userURL, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setData(data);
      setEdited(false);
    };
    fetchurl();
  }, [userURL, edit, edited, loading, loading2, loading3]);

  const submitForm = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    setLoading(true);
    axios
      .post(`/upload/${userId}`, formData)
      .then((res) => {
        alert("Image Updated Successfully!");
        setEdited(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const EditHandler = () => {
    setEdit(true);
  };

  const EditSocialHandler = () => {
    setSocialEdit(true);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const dobHandler = (e) => {
    setDob(e.target.value);
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const contactHandler = (e) => {
    setContact(e.target.value);
  };

  const aadharHandler = (e) => {
    setAadhar(e.target.value);
  };

  const genderHandler = (e) => {
    setGender(e.target.value);
  };

  const maritalHandler = (e) => {
    setMarital(e.target.value);
  };

  const bloodHandler = (e) => {
    setBlood(e.target.value);
  };
  const instaHandler = (e) => {
    setInsta(e.target.value);
  };
  const linkedinHandler = (e) => {
    setLinked(e.target.value);
  };
  const twitterHandler = (e) => {
    setTwit(e.target.value);
  };

  const PersonalCancelHandler = async () => {
    setEdit(false);
  };


  // update data
  const PersonalSubmitHandler = async () => {
    setLoading2(true);
    console.log(gender);
    const val = {
      email: email,
      dob: dob,
      aadharNo: aadhar,
      address: address,
      contactNo: contact,
      gender: gender,
      maritalStatus: marital,
      bloodGroup: blood,
    };
    console.log(val);
    const res = await fetch(userURL, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });
    const data = await res.json();
    setLoading2(false);
    setEdit(false);
    setEdited(true);
  };

  const socialSubmitHandler = async () => {
    setLoading3(true);
    const val = {
      instaId: insta,
      linkedinId: linked,
      twitterId: twit,
    };
    const res = await fetch(userURL, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });
    const data = await res.json();
    setEdited(true);
    setLoading3(false);
    setSocialEdit(false);
  };

  return (
    <>
      <Sidebar />
      <NavBar image={data && data.image.data} />
      <div className="mainBg">
        <div className="main">
          <div className="mainInfo">
            <div className="photoDiv">
              <img
                src={`data:image/png;base64,${data && data.image.data}`}
                alt=""
              />
            </div>

            <div className="mainInfoName">
              <h1>{data && data.name}</h1>
              <h3>{data && data.designation}</h3>
              <form className="imageUploadForm">
                <label htmlFor="img" className="mainButtonEdit">
                  {loading ? (
                    <div
                      class="spinner-border"
                      role="status"
                      style={{ height: "20px", width: "20px" }}
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Update Profile Photo"
                  )}
                  {/* <FontAwesomeIcon icon={faEdit} /> */}{" "}
                </label>
                <input
                  type="file"
                  id="img"
                  onChange={submitForm}
                  className="photoInput"
                  accept="image/*"
                />
              </form>
              {data &&
                (data.docStatus == "none" || data.docStatus == "pending") ? (
                <span
                  title="Please submit your all documents to complete onboarding"
                  className="onboarding"
                >
                  Please complete your onboarding*
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="overall-card-div">
            <div className="main-card">
              <div className="card ">
                <div className="cardHeading personal">
                  Personal Details :
                  <button onClick={EditHandler}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>

                <div className="cradElemet">
                  {edit === true ? (
                    <div>
                      <div className="cardDetails">
                        <div className="cardQ">Email id</div>
                        <div className="cardA">
                          <input
                            type="email"
                            value={email}
                            onChange={emailHandler}
                            placeholder={data.email}
                          />{" "}
                        </div>
                      </div>

                      <div className="cardDetails">
                        <div className="cardQ">Date Of Birth</div>
                        <div className="cardA">
                          <input
                            type="date"
                            value={dob}
                            onChange={dobHandler}
                            placeholder={data.dob}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Address</div>
                        <div className="cardA">
                          <input
                            type="text"
                            value={address}
                            onChange={addressHandler}
                            placeholder={data.address}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Contact Number</div>
                        <div className="cardA">
                          <input
                            type="number"
                            // value={contact}
                            onChange={contactHandler}
                            placeholder={data.contactNo}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Aadhar Number</div>
                        <div className="cardA">
                          <input
                            type="number"
                            // value={aadhar}
                            onChange={aadharHandler}
                            placeholder={data.aadharNo}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Gender</div>
                        <div className="cardA">
                          {/* <input
                            type="text"
                            // value={gender}
                            onChange={genderHandler}
                            placeholder={data.gender}
                          /> */}
                          <select name="gender" onChange={genderHandler} required>
                            <option value="none" selected disabled hidden>
                              Select ---
                            </option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Marital Status</div>
                        <div className="cardA">
                          {/* <input
                            type="text"
                            // value={marital}
                            onChange={maritalHandler}
                            placeholder={data.maritalStatus}
                          /> */}
                          <select name="gender" onChange={maritalHandler} required>
                            <option value="none" selected disabled hidden>
                              Select ---
                            </option>
                            <option value="Unmarried">Unmarried</option>
                            <option value="Married">Married</option>
                          </select>
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Blood Group</div>
                        <div className="cardA">
                          {/* <input
                            type="text"
                            value={blood}
                            onChange={bloodHandler}
                            placeholder={data.bloodGroup}
                          /> */}
                          <select name="gender" onChange={bloodHandler} required>
                            <option value="none" selected disabled hidden>
                              Select ---
                            </option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                      </div>
                      <div className="after-edit">
                        {loading2 ? (
                          <div
                            class="spinner-border"
                            role="status"
                            style={{ height: "15px", width: "15px", color: "#15074e", marginRight: "20px", marginTop: "16px" }}
                          >
                            <button class="visually-hidden">Loading...</button>
                          </div>
                        ) : (
                          <button onClick={PersonalSubmitHandler} className="save-button">Save</button>
                        )
                        }

                        <button disabled={loading2} className={loading2? "disable" : "save-button"} onClick={PersonalCancelHandler}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="cardDetails">
                        <div className="cardQ">Email id</div>{" "}
                        <div className="cardA">: {data && data.email}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Date Of Birth</div>{" "}
                        <div className="cardA">: {data && data.dob}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Address</div>{" "}
                        <div className="cardA">: {data && data.address}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Contact Number</div>{" "}
                        <div className="cardA">: {data && data.contactNo}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Aadhar Number</div>{" "}
                        <div className="cardA">: {data && data.aadharNo} </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Gender</div>{" "}
                        <div className="cardA">: {data && data.gender} </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Marital Status</div>
                        <div className="cardA"> : {data && data.maritalStatus}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Blood Group</div>{" "}
                        <div className="cardA">
                          : {data && data.bloodGroup}{" "}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card  ">
                <div className="cardHeading">Professional Details : </div>
                {/* <div className="cardBg"> */}
                <div className="cradElemet">
                  <div className="cardDetails">
                    <div className="cardQ">Designation</div>{" "}
                    <div className="cardA">: {data && data.designation}</div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Joining Date</div>{" "}
                    <div className="cardA">: {data && data.joiningDate}</div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Bond Duration</div>{" "}
                    <div className="cardA">: {data && data.bond}</div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Experience</div>{" "}
                    <div className="cardA">: {data && data.experience}</div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Employee ID</div>{" "}
                    <div className="cardA">: {data && data.empId}</div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Office Email iD</div>{" "}
                    <div className="cardA">: {data && data.oEmail}</div>
                  </div>
                </div>
                {/* </div> */}
              </div>

              <div className="card ">
                <div className="cardHeading">Bank Details : </div>
                <div className="cradElemet">
                  <div className="cardDetails">
                    <div className="cardQ">Account Number</div>{" "}
                    <div className="cardA">
                      : {data && data.bankDetails.accNo}
                    </div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">IFSC Code</div>{" "}
                    <div className="cardA">
                      : {data && data.bankDetails.ifscCode}
                    </div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Branch</div>{" "}
                    <div className="cardA">
                      : {data && data.bankDetails.branch}{" "}
                    </div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Pin Code</div>{" "}
                    <div className="cardA">
                      : {data && data.bankDetails.pinCode}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card ">
                <div className="cardHeading personal">
                  Social Profiles :
                  <button onClick={EditSocialHandler}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>

                <div className="cradElemet">
                  {socialEdit === true ? (
                    <div>
                      <div className="cardDetails">
                        <div className="cardQA">
                          <img className="insta" src="Image/insta.png" alt="" />
                        </div>
                        <div className="cardA">
                          <input
                            type="text"
                            value={insta}
                            onChange={instaHandler}
                            placeholder={data.instaId}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQA">
                          <IoLogoLinkedin className="linked" size="35" />
                        </div>
                        <div className="cardA">
                          <input
                            type="text"
                            value={linked}
                            onChange={linkedinHandler}
                            placeholder={data.linkedinId}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQA">
                          <AiFillTwitterSquare className="twit" size="35" />
                        </div>
                        <div className="cardA">
                          <input
                            type="text"
                            value={twit}
                            onChange={twitterHandler}
                            placeholder={data.twitterId}
                          />
                        </div>
                      </div>

                      <div className="after-edit">
                        {loading3 ? (
                          <div
                            class="spinner-border"
                            role="status"
                            style={{ height: "15px", width: "15px", color: "#15074e", marginRight: "25px", marginTop: "15px" }}
                          >
                            <button class="visually-hidden">Loading...</button>
                          </div>
                        ) : (
                          <button  className="save-button" onClick={socialSubmitHandler}>Save</button>
                        )
                        }

                        <button onClick={() => setSocialEdit(false)}  disabled={loading3} className={loading3? "disable" : "save-button"}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="cardDetails">
                        <div className="cardQA">
                          <img className="insta" src="Image/insta.png" alt="" />
                          {/* <FaInstagram className="insta" size="25" /> */}
                        </div>{" "}
                        <div className="cardA">:<a href={data && data.instaId} className="cardALink" target="_blank">{data && data.instaId}</a></div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQA">
                          <IoLogoLinkedin className="linked" size="35" />
                        </div>{" "}
                        <div className="cardA">: <a href={data && data.linkedinId} className="cardALink" target="_blank" >  {data && data.linkedinId}</a></div>

                      </div>
                      <div className="cardDetails">
                        <div className="cardQA">
                          <AiFillTwitterSquare className="twit" size="35" />
                        </div>{" "}
                        <div className="cardA">:<a href={data && data.twitterId} className="cardALink" target="_blank">{data && data.twitterId}</a></div>
                        {/* <div className="cardA">: {data && data.twitterId} */}
                        {/* {loading ? (
                            <div
                              class="spinner-border"
                              role="status"
                              style={{ height: "15px", width: "15px",color:"#15074e",marginTop:"7px" }}
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <div>{data && data.twitterId}</div>
                          )}  */}
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="cradElemet">
                  {data &&
                    data.taskCompleted.map((task) => (
                      <div className="cardDetails" key={task._id}>
                        <div className="cardQ">{task.task}</div>
                      </div>
                    ))}
                </div> */}
              </div>
            </div>
          </div>

          {/* <div className="mainCard">
            <div className="card1">
              <div className="card ">
                <div className="cardHeading personal">
                  {" "}
                  Personal Details :
                  <button onClick={EditHandler}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>

                <div className="cradElemet">
                  {edit === true ? (
                    <div>
                      <div className="cardDetails">
                        <div className="cardQ">Email id</div>
                        <div className="cardA">
                          <input
                            type="email"
                            value={email}
                            onChange={emailHandler}
                            placeholder={data.email}
                          />{" "}
                        </div>
                      </div>

                      <div className="cardDetails">
                        <div className="cardQ">Date Of Birth</div>
                        <div className="cardA">
                          <input
                            type="date"
                            value={dob}
                            onChange={dobHandler}
                            placeholder={data.dob}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Address</div>
                        <div className="cardA">
                          <input
                            type="text"
                            value={address}
                            onChange={addressHandler}
                            placeholder={data.address}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Contact Number</div>
                        <div className="cardA">
                          <input
                            type="number"
                            value={contact}
                            onChange={contactHandler}
                            placeholder={data.contactNo}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Aadhar Number</div>
                        <div className="cardA">
                          <input
                            type="number"
                            value={aadhar}
                            onChange={aadharHandler}
                            placeholder={data.aadharNo}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Gender</div>
                        <div className="cardA">
                          <input
                            type="number"
                            value={aadhar}
                            onChange={aadharHandler}
                            placeholder={data.aadharNo}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Marital Status</div>
                        <div className="cardA">
                          <input
                            type="text"
                            value={aadhar}
                            onChange={aadharHandler}
                            placeholder={data.aadharNo}
                          />
                        </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Blood Group</div>
                        <div className="cardA">
                          <input
                            type="text"
                            value={aadhar}
                            onChange={aadharHandler}
                            placeholder={data.aadharNo}
                          />
                        </div>
                      </div>
                      <button onClick={PersonalSubmitHandler}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <div className="cardDetails">
                        <div className="cardQ">Email id</div>{" "}
                        <div className="cardA">: {data && data.email}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Date Of Birth</div>{" "}
                        <div className="cardA">: {data && data.dob}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Address</div>{" "}
                        <div className="cardA">: {data && data.address}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Contact Number</div>{" "}
                        <div className="cardA">: {data && data.contactNo}</div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Aadhar Number</div>{" "}
                        <div className="cardA">: {data && data.aadharNo} </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Gender</div>{" "}
                        <div className="cardA">: {data && data.aadharNo} </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Marital Status</div>{" "}
                        <div className="cardA">: {data && data.aadharNo} </div>
                      </div>
                      <div className="cardDetails">
                        <div className="cardQ">Blood Group</div>{" "}
                        <div className="cardA">: {data && data.aadharNo} </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card card-professional ">
                <div className="cardHeading">Professional Details : </div>
                <div className="cardBg">
                  <div className="cradElemet">
                    <div className="cardDetails">
                      <div className="cardQ">Designation</div>{" "}
                      <div className="cardA">: {data && data.designation}</div>
                    </div>
                    <div className="cardDetails">
                      <div className="cardQ">Joining Date</div>{" "}
                      <div className="cardA">: {data && data.joiningDate}</div>
                    </div>
                    <div className="cardDetails">
                      <div className="cardQ">Bond Duration</div>{" "}
                      <div className="cardA">: {data && data.bond}</div>
                    </div>
                    <div className="cardDetails">
                      <div className="cardQ">Experience</div>{" "}
                      <div className="cardA">: {data && data.experience}</div>
                    </div>
                    <div className="cardDetails">
                      <div className="cardQ">Employee ID</div>{" "}
                      <div className="cardA">: {data && data.empId}</div>
                    </div>
                    <div className="cardDetails">
                      <div className="cardQ">Office Email iD</div>{" "}
                      <div className="cardA">: {data && data.oEmail}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card1">
              <div className="card ">
                <div className="cardHeading">Bank Details : </div>
                <div className="cradElemet">
                  <div className="cardDetails">
                    <div className="cardQ">Account Number</div>{" "}
                    <div className="cardA">
                      : {data && data.bankDetails.accNo}
                    </div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">IFSC Code</div>{" "}
                    <div className="cardA">
                      : {data && data.bankDetails.ifscCode}
                    </div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Branch</div>{" "}
                    <div className="cardA">
                      : {data && data.bankDetails.branch}{" "}
                    </div>
                  </div>
                  <div className="cardDetails">
                    <div className="cardQ">Pin Code</div>{" "}
                    <div className="cardA">
                      : {data && data.bankDetails.pinCode}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card ">
                <div className="cardHeading">Projects : </div>
                <div className="cradElemet">
                  {data &&
                    data.taskCompleted.map((task) => (
                      <div className="cardDetails" key={task._id}>
                        <div className="cardQ">{task.task}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Main;
