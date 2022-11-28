import { useEffect } from "react";
import InputBox from "../../components/inputComponents/InputBox";
import WaawHead from "../../components/WaawHead";
import styles from "../../styles/pages/Payment-info.module.css";
import layoutStyles from "../../styles/layouts/LoginRegistration.module.css";
import Link from "next/link";
import LoginRegistrationLayout from "../../layouts/LoginRegistrationLayout";
import Button from "../../components/Button";
import SuccessModal from "../../components/SuccessModal";
import Image from "next/image";

const Payment = (props) => {
  useEffect(() => {
    props.setPageInfo({
        authenticationRequired: false,
        pageView: 'fullPage',
        activeMenu: 'none',
        activeSubMenu: 'none'
    })
  }, []);

  return (
    <>
      <WaawHead title={`WaaW`} />
      <div className={layoutStyles.page}>
        <div className={layoutStyles.pageContainer}>
          <div className="flex bg-cyan-100 p-7 mb-10">
            <Image src="/icons/Payment.svg" width="500" height="300" className="w-full" />
          </div>
          <div className="flex relative" style={{ marginBottom: 15 }}>
            <label htmlFor="firstName" className={`${styles.paymentLabel} ${styles.leftLabel}`}>
              First Name <sup className="text-red-600">*</sup>
            </label>
            <InputBox type="text" name="firstName" style={{ marginTop: 0, marginRight: 30 }} />
            <label htmlFor="lastName" className={`${styles.paymentLabel} ${styles.rightLabel}`}>
              Last Name <sup className="text-red-600">*</sup>
            </label>
            <InputBox type="text" name="lastName" style={{ marginTop: 0, marginRight: 30 }} />
          </div>
          <div className="flex relative" style={{ marginBottom: 15 }}>
            <label htmlFor="creditCardNumber" className={`${styles.paymentLabel} ${styles.leftLabel}`}>
              Credit Card Number <sup className="text-red-600">*</sup>
            </label>
            <InputBox type="text" name="creditCardNumber" style={{ marginTop: 0, marginRight: 30 }} className={`${styles.innerContainer}`} />
            <div className="flex w-2/4 relative">
              <label htmlFor="expDate" className={`${styles.paymentLabel} ${styles.leftLabel}`}>
                Expiration Date <sup className="text-red-600">*</sup>
              </label>
              <InputBox type="text" name="expDate" placeholder="MM/YY" style={{ marginTop: 0, marginRight: 30 }} className={`${styles.innerContainer2}`} />
              <label htmlFor="securityCode" className={`${styles.paymentLabel} ${styles.rightLabel}`}>
                Security Code <sup className="text-red-600">*</sup>
              </label>
              <InputBox type="text" name="securityCode" style={{ marginTop: 0, marginRight: 30 }} className={`${styles.innerContainer2}`} />
            </div>
          </div>
          <div className="flex relative" style={{ marginBottom: 15 }}>
            <label htmlFor="country" className={`${styles.paymentLabel} ${styles.leftLabel}`}>
              Country <sup className="text-red-600">*</sup>
            </label>
            <InputBox type="text" name="country" style={{ marginTop: 0, marginRight: 30 }} />
            <label htmlFor="postalCode" className={`${styles.paymentLabel} ${styles.leftLabel}`}>
              Postal Code <sup className="text-red-600">*</sup>
            </label>
            <InputBox type="text" name="postalCode" style={{ marginTop: 0, marginRight: 30 }} />
          </div>
          <div className="flex relative" style={{ marginBottom: 15 }}>
            <label htmlFor="address" className={`${styles.paymentLabel} ${styles.leftLabel}`}>
              Address <sup className="text-red-600">*</sup>
            </label>
            <InputBox type="text" name="address" style={{ marginTop: 0, marginRight: 30 }} />
          </div>
          <p className={`${styles.reqFields}`}>* Required Fields</p>
          <div className="flex justify-center">
            <Button type="default" style={{ margin: "20px 0", width: 300, fontSize: 18 }} className="">
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
