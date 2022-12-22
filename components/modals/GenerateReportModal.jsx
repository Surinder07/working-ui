import React from "react";
import {useState} from "react";
import {EditableInput} from "../inputComponents";
import {DashboardModal} from "./base";
import {DashboardModalStyles} from "../../styles/elements";
import { dropdownService } from "../../services";


const GenerateReportsModal = (props) => {
    const [locations,setLocations] = useState([])
    const [fromValue,setFromValue] = useState("");
    const [tillValue,setTillValue]= useState("")
    const [location,setLocation] = useState("")

    const [initialFromValue,setInitialFromValue] = useState("")
    const [initialTillValue,setInitialTillValue] = useState("")
    const [initialLocation,setInitialLocation] = useState("")
 
    const [locationError,setLocationError] = useState({
        message:"",
        show: false
    })
    const [loading, setLoading] = useState(false);
    const onCancel = () =>{
        setFromValue("")
        setTillValue("")
        setLocation("")
        setLocationError({
            message:"",
            show: false
        })
    }

    useEffect(() => {
        if (props.role === 'ADMIN') {
            dropdownService.getLocations()
                .then(res => {
                    if (!res.error) {
                        setLocations(res);
                    }
                })
        }
    }, [])

    const validateForm = async () => {
        let error = false;
       
        return error
    }

    const saveData = () => {
        validateForm()
        .then(error => {
            if(!error) {

                setLoading(true)
                if(error == true){
                    props.setToasterInfo({
                        error: true,
                        title: 'Error!',
                        message: res.message
                    })
                }
                else{
                    props.setToasterInfo({
                        error: false,
                        title: 'Success!',
                        message: 'User invited successfully'
                    });
                    props.setReloadData(true)
                    onCancel()
                }
                setLoading(false)
            }
        })
    }

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Generate Reports"
            type="twoColNarrow"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <EditableInput type="date"  value={fromValue} setValue={setFromValue} initialValue={initialFromValue} label="From"  editOn />
            <EditableInput type="date"  value={tillValue} setValue={setTillValue} initialValue={initialTillValue} label="Till"  editOn />
         {props.role=== 'ADMIN' &&  
            <EditableInput
                type="dropdown"
                options={["India", "Canada", "Germany"]}
                label="Location"
                className={DashboardModalStyles.singleColumn}
                value={location}
                setValue={setLocation}
                initialValue={initialLocation}
                error={locationError}
                setError={setLocationError}
                editOn
            />
          }
        </DashboardModal>
    );
};

export default GenerateReportsModal;