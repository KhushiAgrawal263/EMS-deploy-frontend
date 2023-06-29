import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../NavBar'
import Sidebar from '../Sidebar'
import { Buffer } from 'buffer';
import PSPDFKit from "pspdfkit";
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './AdminDoc.css'
import Modal from "react-bootstrap/Modal";

const DocumentDetails = () => {
    const location = useLocation()
    const user = location.state.user;
    // console.log(user);
    // const documents = user.documents;
    const [documents, setDocuments] = useState()
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [displayRL, setDisplayRL] = useState();
    const [displayAC, setDisplayAC] = useState();
    const [displayPC, setDisplayPC] = useState();
    const [displayGM, setDisplayGM] = useState();
    const [displaySSM, setDisplaySSM] = useState();
    const [displaySM, setDisplaySM] = useState();
    const [displayResume, setDisplayResume] = useState();
    const [btnValue, setBtnValue] = useState('Approve All');
    const [reject, setReject] = useState();
    const [loading, setLoading] = useState(false);
    const [declineValue, setDeclineValue] = useState();
    const [declineName, setDeclineName] = useState();
    const [declineType, setDeclineType] = useState();

    const [rlLoading, setrlLoading] = useState();
    const [acLoading, setacLoading] = useState();
    const [pcLoading, setpcLoading] = useState();
    const [gmLoading, setgmLoading] = useState();
    const [tenthLoading, settenthLoading] = useState();
    const [twelthLoading, settwelthLoading] = useState();
    const [resumeLoading, setresumeLoading] = useState();



    const userURL = 'http://localhost:8000'
    useEffect(() => {
        const fetchurl = async () => {
            const res = await fetch(`${userURL}/documents/${user._id}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await res.json();
            setData(data[0]);
            setDocuments(data[0].documents);
        }
        fetchurl();
    }, [rlLoading, acLoading, pcLoading, gmLoading, tenthLoading, twelthLoading, resumeLoading]);

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    const date = [dd, mm, yyyy].join('-');

    const updateStatus = async (name, type) => {
        console.log(reject, name, type)
        let val, notifi;
        if (type == 'rejected') {
            val = {
                rejectionMessage: reject
            }
            notifi = {
                type: `Doc ${type}`,
                message: `Your ${name} document is ${type} because, ${reject}`,
                date: date,
                role: "user",
                status: "unseen"
            }
        } else {
            val = {
                rejectionMessage: ''
            }
            notifi = {
                type: `Doc ${type}`,
                message: `Your ${name} document is ${type}!`,
                date: date,
                role: "user",
                status: "unseen"
            }
        }
        const res = await fetch(`/approveorreject/document/${user._id}/${name}/${type}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });

        setReject('');
        setrlLoading(false);
        setacLoading(false);
        setpcLoading(false);
        setgmLoading(false);
        settenthLoading(false);
        settwelthLoading(false);
        setresumeLoading(false);

        const generateNotifi = await fetch(`/user/user/addnotifi/${user._id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notifi)
        });
        const Notifi = await generateNotifi.json();
        // window.location.href = '/documentDetails'
    }

    const handleApprove = (e, value, name, type) => {
        setDeclineName(name);
        setDeclineType(type);
        setDeclineValue(value);
        if (type === 'rejected') {
            setShow(true);
        } else {
            if (value == 'verifyRL' || value == 'cancelRL') {
                updateStatus(name, type);
                setrlLoading(true);
            } else if (value == 'verifyAC' || value == 'cancelAC') {
                updateStatus(name, type);
                setacLoading(true)
            } else if (value == 'verifyPC' || value == 'cancelPC') {
                updateStatus(name, type);
                setpcLoading(true);
            } else if (value == 'verifyGM' || value == 'cancelGM') {
                updateStatus(name, type);
                setgmLoading(true)
            } else if (value == 'verifySSM' || value == 'cancelSSM') {
                updateStatus(name, type);
                settwelthLoading(true)
            } else if (value == 'verifySM' || value == 'cancelSM') {
                updateStatus(name, type);
                settenthLoading(true)
            } else if (value == 'verifyResume' || value == 'cancelResume') {
                updateStatus(name, type);
                setresumeLoading(true)
            }
        }
    }

    const handleModalSubmit = () => {
        setReject('');
        setShow(false);
        if (reject && declineName && declineType && declineValue) {
            updateStatus(declineName, declineType);
            if (declineValue == 'verifyRL' || declineValue == 'cancelRL') {
                setrlLoading(true);
            } else if (declineValue == 'verifyAC' || declineValue == 'cancelAC') {
                setacLoading(true);
            } else if (declineValue == 'verifyPC' || declineValue == 'cancelPC') {
                setpcLoading(true)
            } else if (declineValue == 'verifyGM' || declineValue == 'cancelGM') {
                setgmLoading(true)
            } else if (declineValue == 'verifySSM' || declineValue == 'cancelSSM') {
                settwelthLoading(true)
            } else if (declineValue == 'verifySM' || declineValue == 'cancelSM') {
                settenthLoading(true)
            } else if (declineValue == 'verifyResume' || declineValue == 'cancelResume') {
                setresumeLoading(true)
            }
        }
    }

    const approveAllDocument = async () => {
        const val = {
            docStatus: 'approved'
        }
        const res = await fetch(`${userURL}/${user._id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });
        const data = await res.json();
        alert("Documents Approved Successfully...");
        const notifi = {
            type: `Doc approved`,
            message: `Your all documents are verified!`,
            date: date,
            role: "user",
            status: "unseen"
        }
        console.log(notifi);

        const generateNotifi = await fetch(`/user/user/addnotifi/${user._id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notifi)
        });
        const Notifi = await generateNotifi.json();
        console.log(Notifi);
        setBtnValue('Approved')
    }

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const fileHandler = async (name) => {
        const doc = await fetch(`/documents/${user._id}/${name}`);
        const data = await doc.json();
        console.log(data[0].documents.data);

        const blob = b64toBlob(data[0].documents.data, "application/pdf");
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        // let alink = document.createElement('a');
        // alink.href = fileURL;
        // alink.download = data[0].documents.fileName;
        // alink.click();
        window.open(fileURL)
    }

    const handleClose = () => setShow(false);

    return (
        <>
            <Sidebar />
            <NavBar />
            <div className='documentDetails'>
                <div className='documentDetailsBg'>

                    <h3>Document details about <span>{user.name}</span> </h3>
                    <h6>{user.empId}, {user.designation}</h6>
                    {documents && <><div className='overallDocumentCard'>
                        {
                            user.experience == 'experienced' &&
                            <div className='documentCard' >
                                <div className='docVeri'> Relieving Letter</div>
                                <div className='pdf' onClick={() => fileHandler("relievingLetter")}> <img src="Image/pdf.png" alt="" /> Download </div>
                                <div className='docButton'>
                                    {
                                        documents.relievingLetter && !rlLoading && documents.relievingLetter == 'uploaded' &&
                                        <>
                                            <button className={displayRL == 'cancelRL' ? 'cancelButton' : 'rejectState'} onClick={(e) => handleApprove(e, 'verifyRL', 'relievingLetter', 'rejected')} > Decline </button>
                                            <button className={displayRL == 'verifyRL' ? 'cancelButton' : 'approveState'} onClick={(e) => handleApprove(e, 'cancelRL', 'relievingLetter', 'approved')}>Approve </button>
                                        </>
                                    }
                                    {
                                        !documents.relievingLetter && '-'
                                    }
                                    {
                                        documents.relievingLetter ? documents.relievingLetter == 'rejected' &&
                                            <button className={displayRL == 'cancelRL' ? 'cancelButton' : 'rejectState'}   > Declined </button> : '-'
                                    }
                                    {
                                        documents.relievingLetter ? documents.relievingLetter == 'approved' &&
                                            <button className={displayRL == 'verifyRL' ? 'cancelButton' : 'approveState'} > Approved </button> : '-'
                                    }
                                    {
                                        (rlLoading && declineName == 'relievingLetter') &&
                                        <div class="spinner-border" role="status" style={{ 'height': '20px', 'width': '20px' }} >
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        <div className='documentCard'>
                            <div className='docVeri'>Aadhar Card</div>
                            <div className='pdf' onClick={() => fileHandler("aadharCard")}> <img src="Image/pdf.png" alt="" />Download </div>
                            <div className='docButton'>
                                {
                                    documents.aadharCard && !acLoading && documents.aadharCard == 'uploaded' &&
                                    <>
                                        <button className={displayAC == 'cancelAC' ? 'cancelButton ' : 'rejectState'} onClick={(e) => { handleApprove(e, 'verifyAC', 'aadharCard', 'rejected') }}>
                                            Decline
                                        </button>
                                        <button className={displayAC == 'verifyAC' ? 'cancelButton' : 'approveState'} onClick={(e) => handleApprove(e, 'cancelAC', 'aadharCard', 'approved')}> Approve </button>
                                    </>
                                }
                                {
                                    !documents.aadharCard && '-'
                                }
                                {
                                    documents.aadharCard ? documents.aadharCard == 'rejected' &&
                                        <button className={displayAC == 'cancelAC' ? 'cancelButton ' : 'rejectState'}> Declined </button> : '-'
                                }
                                {
                                    documents.aadharCard ? documents.aadharCard == 'approved' &&
                                        <button className={displayAC == 'verifyAC' ? 'cancelButton' : 'approveState'}> Approved </button> : '-'
                                }
                                {
                                    (acLoading && declineName == 'aadharCard') &&
                                    <div class="spinner-border" role="status" style={{ 'height': '20px', 'width': '20px' }} >
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='documentCard'>
                            <div className='docVeri'>Pan Card</div>
                            <div className='pdf' onClick={() => fileHandler("panCard")}> <img src="Image/pdf.png" alt="" /> Download</div>
                            <div className='docButton'>
                                {
                                    documents.panCard && !pcLoading && documents.panCard == 'uploaded' &&
                                    <>
                                        <button className={displayPC == 'cancelPC' ? 'cancelButton' : 'rejectState'} onClick={(e) => handleApprove(e, 'verifyPC', 'panCard', 'rejected')}> Decline </button>
                                        <button className={displayPC == 'verifyPC' ? 'cancelButton' : 'approveState'} onClick={(e) => handleApprove(e, 'cancelPC', 'panCard', 'approved')}> Approve </button>
                                    </>
                                }
                                {
                                    !documents.panCard && '-'
                                }
                                {
                                    documents.panCard ? documents.panCard == 'rejected' &&
                                        <button className={displayPC == 'cancelPC' ? 'cancelButton' : 'rejectState'} > Declined </button> : '-'
                                }
                                {
                                    documents.panCard ? documents.panCard == 'approved' &&
                                        <button className={displayPC == 'verifyPC' ? 'cancelButton' : 'approveState'} > Approved </button> : '-'
                                }
                                {
                                    (pcLoading && declineName == 'panCard') &&
                                    <div class="spinner-border" role="status" style={{ 'height': '20px', 'width': '20px' }} >
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='documentCard'>
                            <div className='docVeri'> Graduation Marksheet</div>
                            <div className='pdf' onClick={() => fileHandler("graduate")} > <img src="Image/pdf.png" alt="" />Download </div>
                            <div className='docButton'>
                                {
                                    documents.graduate && !gmLoading && documents.graduate == 'uploaded' &&
                                    <>
                                        <button className={displayGM == 'cancelGM' ? 'cancelButton' : 'rejectState'} onClick={(e) => handleApprove(e, 'verifyGM', 'graduate', 'rejected')} > Decline </button>
                                        <button className={displayGM == 'verifyGM' ? 'cancelButton' : 'approveState'} onClick={(e) => handleApprove(e, 'cancelGM', 'graduate', 'approved')}> Approve </button>
                                    </>
                                }
                                {
                                    !documents.graduate && '-'
                                }
                                {
                                    documents.graduate ? documents.graduate == 'rejected' &&
                                        <button className={displayGM == 'cancelGM' ? 'cancelButton' : 'rejectState'}  > Declined </button> : '-'
                                }
                                {
                                    documents.graduate ? documents.graduate == 'approved' &&
                                        <button className={displayGM == 'verifyGM' ? 'cancelButton' : 'approveState'} > Approved </button> : '-'
                                }
                                {
                                    (gmLoading && declineName == 'graduate') &&
                                    <div class="spinner-border" role="status" style={{ 'height': '20px', 'width': '20px' }} >
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='documentCard'>
                            <div className='docVeri'>Senior Secondary Marksheet</div>
                            <div className='pdf' onClick={() => fileHandler("twelth")} > <img src="Image/pdf.png" alt="" onClick={() => fileHandler("twelth")} /> Download</div>
                            <div className='docButton'>
                                {
                                    documents.twelth && !twelthLoading && documents.twelth == 'uploaded' &&
                                    <>
                                        <button className={displaySSM == 'cancelSSM' ? 'cancelButton' : 'rejectState'} onClick={(e) => handleApprove(e, 'verifySSM', 'twelth', 'rejected')}> Decline </button>
                                        <button className={displaySSM == 'verifySSM' ? 'cancelButton' : 'approveState'} onClick={(e) => handleApprove(e, 'cancelSSM', 'twelth', 'approved')}> Approve </button>
                                    </>
                                }
                                {
                                    !documents.twelth && '-'
                                }
                                {
                                    documents.twelth ? documents.twelth == 'rejected' &&
                                        <button className={displaySSM == 'cancelSSM' ? 'cancelButton' : 'rejectState'}> Declined </button> : '-'
                                }
                                {
                                    documents.twelth ? documents.twelth == 'approved' &&
                                        <button className={displaySSM == 'verifySSM' ? 'cancelButton' : 'approveState'}> Approved </button> : '-'
                                }
                                {
                                    (twelthLoading && declineName == 'twelth') &&
                                    <div class="spinner-border" role="status" style={{ 'height': '20px', 'width': '20px' }} >
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='documentCard'>
                            <div className='docVeri'>Secondary Marksheet</div>
                            <div className='pdf' onClick={() => fileHandler("tenth")}> <img src="Image/pdf.png" alt="" /> Download</div>
                            <div className='docButton'>
                                {
                                    documents.tenth && !tenthLoading && documents.tenth == 'uploaded' &&
                                    <>
                                        <button className={displaySM == 'cancelSM' ? 'cancelButton' : 'rejectState'} onClick={(e) => handleApprove(e, 'verifySM', 'tenth', 'rejected')}> Decline </button>
                                        <button className={displaySM == 'verifySM' ? 'cancelButton' : 'approveState'} onClick={(e) => handleApprove(e, 'cancelSM', 'tenth', 'approved')} > Approve </button>
                                    </>
                                }
                                {
                                    !documents.tenth && '-'
                                }
                                {
                                    documents.tenth ? documents.tenth == 'rejected' &&
                                        <button className={displaySM == 'cancelSM' ? 'cancelButton' : 'rejectState'}> Declined </button> : '-'

                                }
                                {
                                    documents.tenth ? documents.tenth == 'approved' &&
                                        <button className={displaySM == 'verifySM' ? 'cancelButton' : 'approveState'}>Approved </button> : '-'
                                }
                                {
                                    (tenthLoading && declineName == 'tenth') &&
                                    <div class="spinner-border" role="status" style={{ 'height': '20px', 'width': '20px' }} >
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='documentCard'>
                            <div className='docVeri'>Resume</div>
                            <div className='pdf' onClick={() => fileHandler("resume")}> <img src="Image/pdf.png" alt="" onClick={() => fileHandler("resume")} /> Download</div>
                            <div className='docButton'>
                                {
                                    documents.resume && !resumeLoading && documents.resume == 'uploaded' &&
                                    <>
                                        <button className={displayResume == 'cancelResume' ? 'cancelButton' : 'rejectState'} onClick={(e) => handleApprove(e, 'verifyResume', 'resume', 'rejected')}> Decline </button>
                                        <button className={displayResume == 'verifyResume' ? 'cancelButton' : 'approveState'} onClick={(e) => handleApprove(e, 'cancelResume', 'resume', 'approved')}> Approve </button>
                                    </>
                                }
                                {
                                    !documents.resume && '-'
                                }
                                {
                                    documents.resume ? documents.resume == 'rejected' &&
                                        <button className={displayResume == 'cancelResume' ? 'cancelButton' : 'rejectState'}> Declined</button> : '-'
                                }
                                {
                                    documents.resume ? documents.resume == 'approved' &&
                                        <button className={displayResume == 'verifyResume' ? 'cancelButton' : 'approveState'}> Approved </button> : '-'
                                }
                                {
                                    (resumeLoading && declineName == 'resume') &&
                                    <div class="spinner-border" role="status" style={{ 'height': '20px', 'width': '20px' }} >
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                        <div className='approveAllBtn'>
                            {
                                data && data.docStatus == 'pending' ? (documents.relievingLetter == 'approved' && documents.aadharCard == 'approved' && documents.panCard == 'approved' && documents.graduate == 'approved' && documents.twelth == 'approved' && documents.tenth == 'approved' && documents.resume == 'approved') ?
                                    <button className=' approve-btn' onClick={approveAllDocument}>{btnValue}</button> :
                                    <button className='approve-btn-disabled' disabled>Verify Documents</button>
                                    :
                                    <button className=' approve-btn-disbaled' disabled>Verified</button>
                            }
                        </div>

                    </>}
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    className="profile-section-overall"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Rejection Message!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <input type="text" className="reject-input" placeholder="Enter message" value={reject} onChange={(e) => setReject(e.target.value)} />
                        <button className=' reject-btn' onClick={handleModalSubmit}>Send</button>
                    </Modal.Body>

                </Modal>
            </div>
        </>
    )
}

export default DocumentDetails