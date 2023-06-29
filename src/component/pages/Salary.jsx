import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import Sidebar from '../Sidebar'
import './Salary.css'

const Salary = () => {
    const [salary,setSalary] = useState();
    const [onePer,setOnePer] = useState();

    const user = JSON.parse(localStorage.getItem("EMSuser"));
    const userURL = `/salary/${user.id}`

    useEffect(() => {
        const fetchurl= async ()=>{
            const res = await fetch(userURL,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await res.json();
            console.log(data);
            console.log(parseInt(data.ctc));
            setOnePer(parseInt(data.ctc)/100);
            setSalary(data);
        }
        fetchurl();
      },[userURL]);



  return (
    <>
        <Sidebar/>
        <NavBar/>
        <div className='salary'>
            <div className='ctc'> CTC : <span>{salary && salary.ctc}</span> </div>
            <div className='salaryTabel'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Salary Components</th>
                        <th scope="col">Calculation</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Deductions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                        <th scope="row">Basic</th>
                        <td>50% of CTC</td>
                        <td>{salary && salary.basic}</td>
                        <td>PF Employee Contribution</td>
                        </tr>

                        <tr>
                        <th scope="row">HRA</th>
                        <td>50% of HRA</td>
                        <td>{salary && salary.hra}</td>
                        <td>PF Employer Contribution</td>
                        </tr>

                        <tr>
                        <th scope="row">Leave Travel Allowance</th>
                        <td>Fixed Amount</td>
                        <td>{salary && salary.travel}</td>
                        <td></td>
                        </tr>

                        <tr>
                        <th scope="row">Special Allowance</th>
                        <td>Balance Figure</td>
                        <td>{salary && salary.special}</td>
                        <td></td>
                        </tr>

                        <tr>
                        <th scope="row">PF Employer Contribution</th>
                        <td>GROSS-HRA * 12% LIMIT To 1800</td>
                        <td>{salary && salary.pf}</td>
                        <td></td>
                        </tr>

                        <tr>
                        <th scope="row">Gross Salary</th>
                        <td>Basic + Allowances</td>
                        <td>{salary && salary.gross}</td>
                        <td>Total Deductions</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className='netSalary'>
                Net Pay or in-hand salary = {salary && salary.gross} - {onePer} = <span>Rs. {salary && salary.inHand}</span>
            </div>
        </div>
    </>)
}

export default Salary