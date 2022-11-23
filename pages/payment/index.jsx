import InputBox from "../../components/inputComponents/InputBox";
import styles from "../../styles/pages/LoginRegister.module.css";
import layoutStyles from "../../styles/layouts/LoginRegistration.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { userService } from "../../services/user.service";
import LoginRegistrationLayout from "../../layouts/LoginRegistrationLayout";
import Button from "../../components/Button";
import SuccessModal from "../../components/SuccessModal";
import Image from "next/image";

const Payment = (props) => {
  return (
    <LoginRegistrationLayout pageTitle="Payment" setActiveMenu={props.setActiveMenu}>
      <div className="flex bg-cyan-100 p-7 my-10">
        <Image src="/icons/Payment.svg" width="500" height="300" className="w-full" />
      </div>

      <div className="flex">
        <InputBox type="text" name="firstName" style={{ marginTop: 0, marginRight: 30 }} />
        <InputBox type="text" name="lastName" style={{ marginTop: 0, marginRight: 30 }} />
      </div>
      <div className="flex">
        <InputBox type="text" name="creditCardNumber" style={{ marginTop: 0, marginRight: 30 }} className={`${styles.innerContainer}`} />
        <div className="flex w-2/4">
          <InputBox type="text" name="expDate" style={{ marginTop: 0, marginRight: 30 }} className={`${styles.innerContainer2}`} />
          <InputBox type="text" name="securityCode" style={{ marginTop: 0, marginRight: 30 }} className={`${styles.innerContainer2}`} />
        </div>
      </div>
      <div className="flex">
        <InputBox type="text" name="country" style={{ marginTop: 0, marginRight: 30 }} />
        <InputBox type="text" name="postalCode" style={{ marginTop: 0, marginRight: 30 }} />
      </div>
      <div className="flex">
        <InputBox type="text" name="address" style={{ marginTop: 0, marginRight: 30 }} />
      </div>
      <div className="flex flex-center">
        <p>* Required Fields</p>
        <Button type="default" style={{ margin: "20px 0" }} className="">
          Register
        </Button>
      </div>
    </LoginRegistrationLayout>
  );
};

export default Payment;
