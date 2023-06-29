import React, { useRef } from "react";
import "./EmployeeAdd.css";
import Sidebar from "../Sidebar";
import NavBar from "../NavBar";
import { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsSpin,
  faEye,
  faEyeSlash,
  faEdit,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
//validation

const EmployeeAdd = () => {
  const [val, setVal] = useState({
    name: "",
    email: "",
    salary: {
      ctc: 0,
      basic: 0,
      hra: 0,
      travel: 0,
      special: 0,
      pf: 0,
      gross: 0,
      cut: 0,
      inHand: 0,
    },
  });
  const [user, setUser] = useState();
  const [btn, setBtn] = useState(false);
  const [btnState, setBtnState] = useState(false);
  const [images, setImages] = useState();
  const [name, setName] = useState();
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState();
  const [passError, setPassError] = useState(false);
  const [dob, setDob] = useState();
  const [dobError, setDobError] = useState(false);
  const [address, setAddress] = useState();
  const [addressError, setAddressError] = useState(false);
  const [contact, setContact] = useState();
  const [contactError, setContactError] = useState(false);
  const [aadhar, setAadhar] = useState();
  const [aadharError, setAadharError] = useState(false);
  const [role, setRole] = useState();
  const [RoleError, setRoleError] = useState(false);
  const [designation, setDesignation] = useState();
  const [DesignationError, setDesignationError] = useState(false);
  const [jDate, setJDate] = useState();
  const [JDateError, setJDateError] = useState(false);
  const [ctc, setCtc] = useState();
  const [CtcError, setCtcError] = useState(false);
  const [bond, setBond] = useState();
  const [BondError, setBondError] = useState(false);
  const [oEmail, setOEmail] = useState();
  const [OEmailError, setOEmailError] = useState(false);
  const [ANum, setANum] = useState();
  const [ANumError, setANumError] = useState(false);
  const [Ifsc, setIfsc] = useState();
  const [IfscError, setIfscError] = useState(false);
  const [Branch, setBranch] = useState();
  const [BranchError, setBranchError] = useState(false);
  const [Pin, setPin] = useState();
  const [PinError, setPinError] = useState(false);
  const [bloodGroup, setBloodGroup] = useState();
  const [bloodGroupError, setBloodGroupError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [eye, setEye] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");

  const form = useRef();

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const cotactRegex = /^\d{10}$/;
  const aadharRegex = /^\d{12}$/;
  const accountRegex = /^[0-9]{9,18}$/;
  const iRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const pinRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  const bloodRegex = /^(A|B|AB|O)[+-]$/;

  const handleABCD = (e) => {
    console.log(e.target.name);
    const eventValue = e.target.value;

    switch (e.target.name) {
      case "name":
        if (eventValue.length < 3) {
          setNameError(true);
        } else {
          setNameError(false);
        }
        setName(eventValue);
        break;
      case "email":
        if (!eventValue.match(emailRegex)) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        setEmail(eventValue);
        break;
      case "password":
        if (!eventValue.match(passwordRegex)) {
          setPassError(true);
        } else {
          setPassError(false);
        }
        setPassword(eventValue);
        break;
      case "dob":
        if (eventValue.length < 10) {
          setDobError(true);
        } else {
          setDobError(false);
        }
        setDob(eventValue);
        break;
      case "contactNo":
        if (!eventValue.match(cotactRegex)) {
          setContactError(true);
        } else {
          setContactError(false);
        }
        setContact(eventValue);
        break;
      case "aadharNo":
        if (!eventValue.match(aadharRegex)) {
          setAadharError(true);
        } else {
          setAadharError(false);
        }
        setAadhar(eventValue);
        break;
      case "address":
        if (eventValue.length < 5) {
          setAddressError(true);
        } else {
          setAddressError(false);
        }
        setAddress(eventValue);
        break;
      case "designation":
        if (eventValue.length < 5) {
          setDesignationError(true);
        } else {
          setDesignationError(false);
        }
        setDesignation(eventValue);
        break;
      case "joiningDate":
        if (eventValue.length < 10) {
          setJDateError(true);
        } else {
          setJDateError(false);
        }
        setJDate(eventValue);
        break;
      case "ctc":
        if (eventValue.length < 5) {
          setCtcError(true);
        } else {
          setCtcError(false);
        }
        setCtc(eventValue);
        break;
      case "bond":
        if (eventValue.length > 2) {
          setBondError(true);
        } else {
          setBondError(false);
        }
        setBond(eventValue);
        break;
      case "oEmail":
        if (!eventValue.match(emailRegex)) {
          setOEmailError(true);
        } else {
          setOEmailError(false);
        }
        setOEmail(eventValue);
        break;
      case "accNo":
        if (!eventValue.match(accountRegex)) {
          setANumError(true);
        } else {
          setANumError(false);
        }
        setANum(eventValue);
        break;
      case "ifscCode":
        if (!eventValue.match(iRegex)) {
          setIfscError(true);
        } else {
          setIfscError(false);
        }
        setIfsc(eventValue);
        break;
      case "branch":
        if (eventValue.length < 3) {
          setBranchError(true);
        } else {
          setBranchError(false);
        }
        setBranch(eventValue);
        break;
      case "pinCode":
        if (!eventValue.match(pinRegex)) {
          setPinError(true);
        } else {
          setPinError(false);
        }
        setPin(eventValue);
        break;
      case "bloodGroup":
        // console.log(eventValue.match(bloodRegex));
        if (!eventValue.match(bloodRegex)) {
          setBloodGroupError(true);
        } else {
          setBloodGroupError(false);
        }
        setBloodGroup(eventValue);
        break;
      default:
        break;
    }
  };

  const handleSalary = (e) => {
    const value = e.target.value;
    const bas = Math.round(value / 24);
    const hra = Math.round(bas / 2);
    const gross = hra + bas + 3000 + 2700 + 1800;
    const cut = Math.round(value / 100);
    const inHand = gross - cut;
    setVal({
      ...val,
      salary: {
        [e.target.name]: value,
        basic: bas,
        hra: hra,
        travel: 3000,
        special: 2700,
        pf: 1800,
        gross: gross,
        cut: cut,
        inHand: inHand,
      },
    });
    handleABCD(e);
  };

  const handleAccount = (e) => {
    setVal({
      ...val,
      bankDetails: {
        ...val.bankDetails,
        [e.target.name]: e.target.value,
      },
    });
    handleABCD(e);
  };

  const handleChanges = (e) => {
    console.log(e.target.name, e.target.value);
    setVal({ ...val, [e.target.name]: e.target.value });
    handleABCD(e);
  };

  const submitHandler = async (e) => {
    console.log(val);
    e.preventDefault();
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });
    const data = await res.json();
    // console.log(data);
    // update employee ID
    const newVal = {
      empId:
        data.unique < 10 ? `2023FB0${data.unique}` : `2023FB${data.unique}`,
    };
    const resp = await fetch(`/${data._id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVal),
    });
    const dataa = await resp.json();

    const formData = new FormData();
    formData.append("image", images);
    axios
      .post(`/upload/${data._id}`, formData)
      .then((res) => {
        alert("User Added Successfully!");
        window.location.href = "/addEmployee";
      })
      .catch((err) => console.log(err));

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

    // // Generate Notifications
    const notifi = {
      type: "New employee",
      message: `Say hey! To the new employee, ${data.name}`,
      date: date,
      role: "user",
      status: "unseen",
    };
    // console.log(notifi);

    // // update all users notifications
    const generateNotifi = await fetch(
      `/user/oneuser/addnotifi/${data._id}`,
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

    // if(Notifi){
    //   let template ={
    //     name:data.name,
    //     email:data.email,
    //   }
    //   emailjs.send('service_io91ds2', 'template_0g1pg9a', template, '6qGUvnhs40iNBMVST')
    //     .then((result) => {
    //         console.log(result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //   });
    // }
  };

  // get image
  const imageHandler = (e) => {
    setImages(e.target.files[0]);
  };

  const generatePassword = () => {
    let c1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let c2 = 'abcdefghijklmnopqrstuvwxyz';
    let c3 = '1234567890';
    let c4 = '@#$%&*';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += c1.charAt(Math.floor(Math.random() * 26));
    }
    for (let i = 0; i < 1; i++) {
      result += c4.charAt(Math.floor(Math.random() * 6));
    }
    for (let i = 0; i < 2; i++) {
      result += c2.charAt(Math.floor(Math.random() * 26));
    }
    for (let i = 0; i < 3; i++) {
      result += c3.charAt(Math.floor(Math.random() * 10));
    }
    setPassword(result);
    setVal({ ...val, password: result });
  }

  return (
    <>
      <NavBar />
      <Sidebar />
      <div className="employeeAddBg">
        <form ref={form} onSubmit={submitHandler} className="employeeAdd">
          {/* <form onSubmit={submitHandler} className='employeeAdd'> */}
          <h4>Hi Admin, Add New Employee!</h4>

          <div className="pDetails">
            <table className="table">
              <th scope="col">Personal Details :</th>
              <tbody>
                <tr>
                  <th scope="row">Name : </th>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="name"
                      onChange={handleChanges}
                      required
                    />
                    {nameError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *name should be more than 3 letters
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email id : </th>
                  <td>
                    {" "}
                    <input
                      type="email"
                      name="email"
                      onChange={handleChanges}
                      required
                      autocomplete="new-password"
                    />
                    {emailError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *enter a valid email address
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Password : </th>
                  <td>
                    {" "}
                    <div className="passwordField">
                      <div>
                        <input
                          type={eye ? "password" : "text"}
                          name="password"
                          value={password}
                          onChange={handleChanges}
                          required
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="eyePassword" onClick={() => setEye(!eye)}>
                        {eye ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </div>
                      <div title="Generate Password" style={{ margin: "10px" }} onClick={generatePassword}>
                        <FontAwesomeIcon icon={faArrowsSpin} />
                      </div>
                    </div>
                    {/* {passError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *6 to 20 characters which contain at least one numeric
                        digit, one uppercase and one lowercase letter{" "}
                      </span>
                    ) : (
                      ""
                    )} */}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Date of birth : </th>
                  <td>
                    {" "}
                    <input
                      type="date"
                      name="dob"
                      onChange={handleChanges}
                      required
                    />
                    {dobError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *enter valid Date of Birth
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Address : </th>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="address"
                      onChange={handleChanges}
                      required
                    />
                    {addressError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *enter proper address
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Contact Number : </th>
                  <td>
                    {" "}
                    <input
                      type="number"
                      name="contactNo"
                      onChange={handleChanges}
                      required
                    />
                    {contactError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *contact number should have 10 digits
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Aadhar Number : </th>
                  <td>
                    {" "}
                    <input
                      type="number"
                      name="aadharNo"
                      onChange={handleChanges}
                      required
                    />
                    {aadharError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *aadhar number should be of 12 digit
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>

                <tr>
                  <th scope="row">Gender : </th>
                  <td>
                    <select name="gender" onChange={handleChanges} required>
                      <option value="none" selected disabled hidden>
                        Select ---
                      </option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <th scope="row">Marital Status : </th>
                  <td>
                    {" "}
                    <select
                      name="maritalStatus"
                      onChange={handleChanges}
                      required
                    >
                      <option value="none" selected disabled hidden>
                        Select ---
                      </option>
                      <option value="married">Married</option>
                      <option value="unMarried">UnMarried</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <th scope="row">Blood Group : </th>
                  <td>
                    {" "}
                    {/* <input
                      type="text"
                      name="bloodGroup"
                      onChange={handleChanges}
                      required
                    /> */}
                    <select name="bloodGroup" onChange={handleChanges} required>
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
                    {bloodGroup ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        {/* *enter valid blood group */}
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pDetails">
            <table className="table">
              <th scope="col">Professional Details :</th>

              <tbody>
                <tr>
                  <th scope="row">Role : </th>
                  {/* <td> <input type="text" name='role' onChange={handleChanges}/> </td> */}
                  <td>
                    <select name="role" onChange={handleChanges} required>
                      <option value="none" selected disabled hidden>
                        Select ---
                      </option>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                    {RoleError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *if you are employee select user field
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Experience : </th>
                  {/* <td> <input type="text" name='role' onChange={handleChanges}/> </td> */}
                  <td>
                    <select name="experience" onChange={handleChanges} required>
                      <option value="none" selected disabled hidden>
                        Select ---
                      </option>
                      <option value="fresher">Fresher</option>
                      <option value="experienced">Experienced</option>
                    </select>
                    {/* {RoleError ? <span style={{color : 'red'}}> *if you are employee select user field</span> : '' } */}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Designation : </th>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="designation"
                      onChange={handleChanges}
                      required
                    />
                    {DesignationError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *Please enter proper designation
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Joining Date : </th>
                  <td>
                    {" "}
                    <input
                      type="date"
                      name="joiningDate"
                      onChange={handleChanges}
                      required
                    />
                    {JDateError ? (
                      <span style={{ color: "red" }}> *enter valid date</span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">CTC : </th>
                  <td>
                    {" "}
                    <input
                      type="number"
                      name="ctc"
                      onChange={handleSalary}
                      required
                    />
                    {CtcError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *should be more than 5 digits
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Bond Duration : </th>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="bond"
                      onChange={handleChanges}
                      required
                    />
                    {BondError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *please enter your correct Bond Duration in months
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Office Email-id : </th>
                  <td>
                    {" "}
                    <input
                      type="oEmail"
                      name="oEmail"
                      onChange={handleChanges}
                      required
                    />
                    {OEmailError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *enetr valid email address
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pDetails">
            <table className="table">
              <th scope="col">Bank Details :</th>

              <tbody>
                <tr>
                  <th scope="row">Account Number : </th>
                  <td>
                    {" "}
                    <input
                      type="number"
                      name="accNo"
                      onChange={handleAccount}
                      required
                    />
                    {ANumError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *should have 10 to 15 digits
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">IFSC code : </th>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="ifscCode"
                      onChange={handleAccount}
                      required
                    />
                    {IfscError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *enter Proper IFSC code
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Branch : </th>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="branch"
                      onChange={handleAccount}
                      required
                    />
                    {BranchError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *branch should be more than 3 letters
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Pin Code : </th>
                  <td>
                    {" "}
                    <input
                      type="number"
                      name="pinCode"
                      onChange={handleAccount}
                      required
                    />
                    {PinError ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        *enter valid PIN CODE{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="employeeAddBtn">
            <div className="set-you-profile-photo">Set Your Profile Photo</div>
            <div className="employeePhotoUploadDiv">
              <label htmlFor="img" className="mainButtonEdit">
                <FontAwesomeIcon icon={faUpload} />
              </label>
              <input
                type="file"
                id="img"
                onChange={imageHandler}
                className="photoInput"
                accept="image/*"
                required
              />
              <label style={{ margin: "10px" }} htmlFor="">
                {images && images.name}
              </label>
            </div>
          </div>
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EmployeeAdd;
