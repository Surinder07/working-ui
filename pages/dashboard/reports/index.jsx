import React, { useState } from 'react'
import { GenerateReportModal } from "../../../components"
const Reports = () => {
    const [showModal, setShowModal] = useState(true);
    const requests = [
        {
            requestId: '6476475',
            requestType: 'request',
            initiationDate: '01/01/2023',
            location: 'Canada',
            initiatedBy: 'Rahul',
            assignedTo: 'Rajiv',
            status: 'xyz'
        },
        {
            requestId: '6476476',
            requestType: 'request',
            initiationDate: '01/02/2023',
            location: 'India',
            initiatedBy: 'Arpit',
            assignedTo: 'Sandeep',
            status: 'xyz'
        },
        {
            requestId: '6476477',
            requestType: 'request',
            initiationDate: '03/01/2023',
            location: 'USA',
            initiatedBy: 'Albert',
            assignedTo: 'Edward',
            status: 'xyz'
        }, {
            requestId: '6476478',
            requestType: 'request',
            initiationDate: '02/02/2023',
            location: 'Mexico',
            initiatedBy: 'Ethan',
            assignedTo: 'Ishac',
            status: 'xyz'
        }
    ]

    return (
        <div>
            <GenerateReportModal showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}

export default Reports