import React, { useEffect, useState } from "react";
import "./Apply.css";
import Calendar from "react-calendar";
import moment from "moment";
import Sidebar from "../Sidebar";
import NavBar from "../NavBar";
import axios from "axios";
import emailjs from "emailjs-com";

const Apply = () => {
  const [date, setDate] = useState(new Date())
  const [edited, setEdited] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState();
  const [reason, setReason] = useState();
  const [loading, setLoading] = useState(false);

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }
  const todaysDate = [dd, mm, yyyy].join('-');
  const mindate = [yyyy, mm, dd].join('-');
  console.log(mindate, "mindate");
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);

  const user = JSON.parse(localStorage.getItem("EMSuser"));
  const url = "/leave";

  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
    const dates = [];
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  const range = (array, val) => {
    array.map((eachday) => {

      // set all pending dates in array
      if (val == "pending") {
        eachday.dates.forEach(date => {
          var g1 = new Date(todaysDate.split('-')[2], todaysDate.split('-')[1], todaysDate.split('-')[0]);
          var g2 = new Date(date.date.split('-')[2], date.date.split('-')[1], date.date.split('-')[0]);
          console.log(g2);
          if (g2 > g1) {
            console.log(date.date, todaysDate);
            setPending(arr => [...new Set(arr), date.date])
          }
        })
      }
    })
  }
  // Get leaves
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${url}/${user.id}`);
      const data = await res.json();
      range(data[0].pending, "pending");
      data[0].approved.forEach((date) => {
        setApproved((arr) => [...new Set(arr), date.date]);
      });
    };
    fetchData();
    setEdited(false)
  }, [edited]);

  // submit for leave apply
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const [year, month, day] = startDate.split("-");
    const [Eyear, Emonth, Eday] = endDate.split("-");
    const sd1 = new Date(`${year}-${month}-${day}`);
    const ed1 = new Date(`${Eyear}-${Emonth}-${Eday}`);

    // all the dates of range
    const alldates = getDatesInRange(sd1, ed1);
    let array = [];
    alldates.forEach(function (date) {
      function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
      }
      console.log();
      array.push({ date: convert(date) });
    });
    const val = {
      id: user.id,
      name: user.name,
      empId: user.empId,
      pending: {
        leaveType: leaveType,
        dates: array,
        reason: reason,
        status: "pending",
      },
    };
    console.log(val, "value");
    try {
      //apply for leave
      const res = await fetch(`${url}/apply/${user.id}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      });
      const data = await res.json();
      // alert(data);

      // get this user
      const getUser = await fetch(`/${user.id}`);
      const resu = await getUser.json();
      var newCount = resu.pendingLeaves + array.length;
      const value = {
        pendingLeaves: newCount,
        leaveLastModified: Date.now()
      };
      // update the user
      const updateuser = await fetch(`/${user.id}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      const date = [dd, mm, yyyy].join("-");
      // Generate Notifications
      const notifi = {
        type: "Leave Applied",
        message: `${user.name}(${user.empId}) applied for leave.`,
        date: date,
        role: "admin",
        status: "unseen",
      };

      // update all users notifications
      const generateNotifi = await fetch(
        "/admin/user/addnotifi",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notifi),
        }
      );
      const Notifi = await generateNotifi.json();

      //   const form = new FormData();
      //   form.append('email','ishabam09@gmail.com');
      //   form.append('name','Khushi agrawal');
      //   form.append('message','Welcome, Isha Bam');

      //   emailjs.sendForm('service_io91ds2', 'template_0g1pg9a', form.current, '6qGUvnhs40iNBMVST')
      //     .then((result) => {
      //         console.log(result.text);
      //     }, (error) => {
      //         console.log(error.text);
      //     });
      alert(data);
      setEndDate('');
      setStartDate('');
      setReason('');
      setLeaveType('');
      setLoading(false)
      // window.location.href = "/applyLeaves";
      setEdited(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Sidebar />
      <NavBar />
      <div className="applyBg">
        <div className="apply">
          <h2>APPLY FOR LEAVE</h2>
          <div className="applycal">
            <div className="cal ">
              <Calendar
                onChange={setDate}
                value={date}
                minDetail="year"
                tileClassName={({ date, view }) => {
                  if (
                    pending.find((x) => x === moment(date).format("DD-MM-YYYY"))
                  ) {
                    return "highlight1";
                  } else {
                    if (
                      approved.find(
                        (x) => x === moment(date).format("DD-MM-YYYY")
                      )
                    ) {
                      return "highlight4";
                    }
                  }
                }}
              />
            </div>
            <div className="holidayColor">
              <div className="holidays">
                <div className="hdiv greenDiv"></div>{" "}
                <div className="RLeave">Approved Leave</div>
              </div>

              <div className="holidays">
                <div className="hdiv redDiv"></div>{" "}
                <div className="RLeave">Pending Leave</div>
              </div>
              <div className="holidays">
                <div className="hdiv blueDiv"></div>{" "}
                <div className="RLeave">Today</div>
              </div>
            </div>
          </div>

          <div className="leaveBox">
            <form onSubmit={handleSubmit}>
              <div className="BoxDate">
                <div className="sdate">
                  Start Date :{" "}
                  <input
                    required
                    type="date"
                    name="startDate"
                    value={startDate}
                    min={mindate}
                    onChange={(e) => setStartDate(e.target.value)}
                  ></input>
                </div>

                <div className="edate">
                  End Date :{" "}
                  <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    min={mindate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>

                <div className="select">
                  Leave Type :
                  <select required name="leaveType" onChange={(e) => setLeaveType(e.target.value)}>
                    <option value={leaveType} selected disabled hidden>
                      Select ---
                    </option>
                    <option value="el"> Earned Leave</option>
                    <option value="sl">Sick Leave</option>
                    <option value="cl">Casual Leave</option>
                    <option value="fl">Flexi Leave</option>
                  </select>
                </div>

                <div
                  className="detailReason"
                  name="reason"
                  onChange={(e) => setReason(e.target.value)}
                >
                  Detailed Reason : <textarea value={reason} required></textarea>
                </div>
              </div>

              <div className="leaveDoc">
                Upload Document :
                <input
                  type="file"
                  class="form-control"
                  id="customFile"
                  name="doc"
                />
                <p>
                  Supported file type : pdf, png, jpg, jpeg, docx, doc, ppt,
                  pptx, txt. <br />
                  File size limit : 5MB
                </p>
              </div>

              <div className="leaveButton">
                {/* <button
                  type="submit"
                  class="btn btn-outline-primary"

                >
                  Submit
                </button> */}
                {loading ? (
                  <div
                    class="spinner-border"
                    role="status"
                    style={{ height: "15px", width: "15px", color: "#15074e", marginRight: "25px", marginTop: "15px" }}
                  >
                    <button class="visually-hidden">Loading...</button>
                  </div>
                ) : (
                  <button class="btn btn-outline-primary">Submit</button>
                )
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
