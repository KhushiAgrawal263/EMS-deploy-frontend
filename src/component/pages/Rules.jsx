import React from 'react'
import './Rules.css'
import Sidebar from '../Sidebar';
import NavBar from '../NavBar';

const Rules = () => {
    const rule = [
        'Attendance and punctuality: Employees must arrive on time and be present during their scheduled work hours, unless they have received prior approval from their supervisor or manager.',
        'Dress code: The company may establish a dress code to ensure that employees present themselves in a professional manner that aligns with the companys values and culture.',
        'Conduct and behavior: The company may set expectations for employee conduct, such as prohibiting discriminatory or harassing behavior, use of drugs or alcohol, or any other behaviors that could negatively impact the workplace environment.',
        'Performance and productivity: Employees are expected to perform their duties to the best of their abilities, meeting established goals and expectations for productivity and quality.',
        'Safety and security: Employees are responsible for their own safety and the safety of their colleagues, and must follow established safety protocols and procedures to prevent workplace accidents or injuries.',
        'Use of company resources: Employees must use company resources, such as equipment, software, and facilities, responsibly and only for the purposes of fulfilling their job responsibilities.',
        'Confidentiality and data protection: Employees may be required to sign non-disclosure agreements or other confidentiality agreements to protect the companys trade secrets, confidential information, and other sensitive data.',
        'Social media and internet use: The company may establish guidelines for employees use of social media and the internet during work hours, as well as expectations for appropriate content and behavior.',
        'Leave policies: The company should clearly outline its policies for vacation, sick leave, personal leave, and other types of absences, including how much notice is required and the process for requesting time off.',
        'Code of ethics: The company may establish a code of ethics or conduct that outlines the companys values and expectations for ethical behavior, including avoiding conflicts of interest, complying with all applicable laws and regulations, and maintaining the highest standards of integrity and professionalism.'
        ];
  return (
    <>
        <NavBar />
        <Sidebar />
        <div className='rulesBg'>
        <div className='rules'>
            <h2>Rules & Regulations</h2>
            <div className='overallRuleCard'>
                {
                    rule.map((rules, index) => 
                        <div className='ruleCard'>
                             {
                                index > 8 ? <p>{index+1}</p> : <p>0{index+1}</p>
                             }
                            {rules}
                        </div>
                    )
                }
                
            </div>
        </div>
        </div>
    </>
  )
}

export default Rules