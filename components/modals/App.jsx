import React from 'react'
import { useState } from 'react'
import { EditableInput } from '../inputComponents'
import { DashboardModal } from './base'

const EmployeeDetailsModal = () => {
    const [showModal, setShowModal] = useState(true)
  return (
    <div>
        <DashboardModal
            showModal={showModal}
            setShowModal={setShowModal}
            buttonText='Submit'
            title=''
            type='twoColNarrow'
        >
              <EditableInput type='text' label='In Date' editOn />
            <EditableInput type='text' label='Out Date' editOn />
            <EditableInput type='time' label='In Time' editOn />
            <EditableInput type='time' label='Out Time' editOn />
            <EditableInput type='text' label='Comment' editOn />
        </DashboardModal>
    </div>
  )
}


const ReportsModal = ()=> {
    const [showModal, setShowModal] = useState(true)
    return (
        <DashboardModal 
        showModal={showModal}
        setShowModal={setShowModal}
        buttonText='Submit'
        title=''
        type='twoColNarrow'
        >
             <EditableInput type='text' label='From' editOn />
             <EditableInput type='text' label='Till' editOn />
             <EditableInput type='dropdown' options={["India","Canada","Germany"]} label='From' editOn />
        </DashboardModal>
    )
}

export {EmployeeDetailsModal,ReportsModal}