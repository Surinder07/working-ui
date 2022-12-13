import React from "react";
import Modal from "./Modal";
import { ModalStyles } from "../../styles/elements";
import { DropDown, InputBox } from "../inputComponents";

const NewRoleModal = (props) => {

    return (
        <div>
            <Modal
                size="dashboardModal"
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText={buttonText}
            >
                <div>
                    <h1
                        style={{
                            color: "#2996C3",
                            fontFamily: "Poppins",
                            fontWeight: "500",
                            textAlign: "center"
                        }}
                    >
                        Create New Role
                    </h1>
                    <div className={ModalStyles.inviteUserModalForm}>
                        <div>
                            <label htmlFor="firstname">
                                Role Name
                            </label>
                            <InputBox type="text" />
                        </div>
                        <div>
                            <label htmlFor="lastname">
                                Location
                            </label>
                            <br />
                            <br />
                            <DropDown
                                defaultDisplay={locationname[0]}
                                options={locationname}
                            />
                        </div>
                        <div>
                            <label htmlFor="firstname">
                                Total hours per day (maximum){" "}

                            </label>
                            <InputBox type="text" />
                        </div>
                        <div>
                            <label htmlFor="firstname">
                                Total hours per day (minimum){" "}

                            </label>
                            <InputBox type="text" />
                        </div>
                        <div>
                            <label htmlFor="firstname">
                                Minimum gaps between shifts{" "}

                            </label>
                            <InputBox type="text" />
                        </div>
                        <div>
                            <label htmlFor="firstname">
                                Maximum consequitive work days{" "}

                            </label>
                            <InputBox type="text" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default NewRoleModal;
