import React, { useEffect, useState } from "react";
import "./ReviewLeave.css";
import Sidebar from "../Sidebar";
import Navbar from "../NavBar";
import { useLocation } from "react-router-dom";

const LeavesDetail = () => {
  const [pendings, setPendings] = useState();
  const [approved, setApproved] = useState();
  const [user, setUser] = useState();
  const [did1, setid1] = useState();
  const [did2, setid2] = useState();
  const [did3, setid3] = useState();
  const [did4, setid4] = useState();
  const [decline, setDecline] = useState(false);
  const [approve, setApprove] = useState(false);
  const [reload,setReload] = useState(false);

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const id = location.state.user._id;

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
  const notifidate = [dd, mm, yyyy].join("-");
  console.log(notifidate);

  useEffect(() => {
    // Fetch user
    const fetchUser = async () => {
      const data = await fetch(`/${id}`);
      const res = await data.json();
      setUser(res);
    };
    fetchUser();

    // Fetch leaves
    const fetchLeaves = async () => {
      const data = await fetch(`/leave/${id}`);
      const res = await data.json();
      setPendings(res[0].pending);
      setApproved(res[0].approved);
    };
    fetchLeaves();
    setReload(false);
  }, [reload,approve,decline]);

  const approveLeave = async ({ user: approveleavedata, date, id1, id2 }) => {
    setDecline(true)
    setLoading(true);
    setid3(id1)
    setid4(id2)
    // update user schema for approved leaves
    const newdata = await fetch(`/${id}`);
    const newuser = await newdata.json();
    const delId = approveleavedata._id;
    console.log(user,"user");
    const count = newuser.approvedLeaves + 1;
    const pcount = newuser.pendingLeaves - 1;
    const val = {
      approvedLeaves: count,
      pendingLeaves: pcount,
    };
    console.log(val,"count")
    // // update user database fro pending and approved leaves
    const updateuser = await fetch(`/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });
    const update = await updateuser.json();
    // console.log(update);

    // // move pending leave to the approved leave
    const data = {
      approved: {
        leaveType: approveleavedata.leaveType,
        date: date.date,
        reason: approveleavedata.reason,
        status: "approved",
      },
    };
    console.log(data);
    const res = await fetch(`/leave/approve/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resp = await res.json();
    // console.log(resp);

    // delete pending data from leave database
    const delres = await fetch(
      `/leave/delete/${id}/${date.date}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    // Generate notifications
    const notifi = {
      type: "Leave Approved",
      message: `Your leave for ${date.date} is approved!`,
      date: notifidate,
      role: "user",
      status: "unseen",
    };
    console.log(notifi);

    const generateNotifi = await fetch(
      `/user/user/addnotifi/${id}`,
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
    // console.log(Notifi);
    setLoading(false);
    setDecline(false);
    setid3('')
    setid4('')
    alert("Leave approved Successfully !!!");
    // window.location.href = "/leaveDetails";
  };

  const declineLeave = async ({ user: declineleavedata, date, id1, id2 }) => {
    setApprove(true);
    setLoading(true);
    setid1(id1);
    setid2(id2);
    const newdata = await fetch(`/${id}`);
    const newuser = await newdata.json();
    const pcount = newuser.pendingLeaves - 1;
    const val = {
      pendingLeaves: pcount,
    };

    // // update user database fro pending and approved leaves
    const updateuser = await fetch(`/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });
    const update = await updateuser.json();

    // delete pending data from leave database
    const delres = await fetch(
      `/leave/delete/${id}/${date.date}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    // Generate notifications
    console.log(date.date);
    const notifi = {
      type: "Leave Declined",
      message: `Your leave for ${date.date} is declined!`,
      date: notifidate,
      role: "user",
      status: "unseen",
    };
    console.log(notifi);

    const generateNotifi = await fetch(
      `/user/user/addnotifi/${id}`,
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
    // console.log(Notifi);

    setLoading(false)
    setApprove(false);
    setid1('');
    setid2('');
    alert("Leave declined Successfully !!!");
    // window.location.href = "/leaveDetails";

  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="leaveDetailBg">
        <div className="leaveDetails">
          <h3>
            Leave details about <span>{user && user.name}</span>{" "}
          </h3>
          <h6>
            {user && user.empId}, {user && user.designation}
          </h6>
          <div className="pendingLeaves">
            <p>Pending Leaves</p>
            <div className="pendingLeavesDetail">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Approve Leave</th>
                    <th scope="col">Decline Leave</th>
                  </tr>
                </thead>
                <tbody>
                  {pendings && pendings.length && !(pendings.length==0 && pendings[0].dates.length==0) != 0 ? (
                    pendings.map((pending, i) => (
                      <>
                        {pending.dates.map((date, index) => (
                          <>
                            <tr>
                              <th scope="row">
                                {i + 1}.{index + 1}
                              </th>
                              <td>{date.date}</td>
                              {pending.leaveType == "cl" ? (
                                <td>Casual Leave</td>
                              ) : pending.leaveType == "fl" ? (
                                <td>Flexi leave</td>
                              ) : pending.leaveType == "sl" ? (
                                <td>Sick Leave</td>
                              ) : (
                                <td>Earned Leave</td>
                              )}
                              <td>{pending.reason}</td>
                              <td>
                                <button
                                  className={(approve || decline) ? "disabledState" : "approveState"}
                                  style={{
                                    textAlign: "center",
                                    width: "110px",
                                  }}
                                  onClick={() =>
                                    approveLeave({ user: pending, date: date, id1: i, id2: index })
                                  }
                                  disabled={approve || decline}
                                >
                                  {
                                    (loading && did3 === i && did4 === index) ?
                                      <div class="spinner-border text-success" role="status" style={{ 'height': '15px', 'width': '15px' }} >
                                        <span class="visually-hidden">Loading...</span>
                                      </div> : 'Approve'
                                  }
                                </button>
                              </td>
                              <td>
                                <button
                                  className={(approve || decline) ? "disabledrejectState" : "rejectState"}

                                  style={{
                                    textAlign: "center",
                                    width: "110px",
                                  }}
                                  onClick={() =>
                                    declineLeave({ user: pending, date: date, id1: i, id2: index })
                                  }
                                  key={i}
                                  disabled={decline || approve}
                                >
                                  {
                                    (loading && did1 === i && did2 === index) ?
                                      <div class="spinner-border text-danger" role="status" style={{ 'height': '15px', 'width': '15px' }} >
                                        <span class="visually-hidden">Loading...</span>
                                      </div> : 'Decline'
                                  }
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                      </>
                    ))
                  ) : (
                    <div style={{ fontSize: "1.6rem", marginLeft: "20px" }}>
                      No Pending Leaves...
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* <div className='approvedLeaves'> */}
          <div className="pendingLeaves">
            <p>Approved Leaves</p>
            <div className="pendingLeavesDetail">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Reason</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {approved && approved.length != 0 ? (
                    approved.map((approved, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{approved.date}</td>
                        {approved.leaveType == "cl" ? (
                          <td>Casual Leave</td>
                        ) : approved.leaveType == "fl" ? (
                          <td>Flexi leave</td>
                        ) : approved.leaveType == "sl" ? (
                          <td>Sick Leave</td>
                        ) : (
                          <td>Earned Leave</td>
                        )}
                        <td>{approved.reason}</td>
                        <td></td>
                      </tr>
                    ))
                  ) : (
                    <div style={{ fontSize: "2rem", marginLeft: "20px" }}>
                      No Approved Leaves...
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeavesDetail;
