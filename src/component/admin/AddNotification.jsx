import React, { useState } from "react";
import "./AddNotification.css";

const AddNotification = () => {
  const [date, setDate] = useState();
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const reversedate = (date) => {
    const [year, month, day] = date.split("-");
    const result = [day, month, year].join("-");
    return result;
  };

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const notifidate = [dd, mm, yyyy].join("-");
  console.log(notifidate);

  const handleSubmit = async () => {
    console.log(date, type, message);
    if (date && type && message) {
      const notifi = {
        type:type,
        message:`${date}, ${message}`,
        holidayDate:date,
        date: notifidate,
        role: "user",
        status: "unseen",
      };
      console.log(notifi);

      const generateNotifi = await fetch(
        "/user/user/addnotifi",
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
      console.log(Notifi);
      if(Notifi)
      {
        window.location.href = "/adminCal";
      }
    }
  };

  return (
    <form>
      <div className="add-notification">
        <input
          type="date"
          onChange={(e) => setDate(reversedate(e.target.value))}
          required
        />
        <select onChange={(e) => setType(e.target.value)} required>
          <option>Select--</option>
          <option value="Holiday">Holiday</option>
          <option value="Saturday Status">Saturday Status</option>
        </select>
        <label className="message">Message</label>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button onClick={handleSubmit}>SEND</button>
      </div>
    </form>
  );
};

export default AddNotification;
