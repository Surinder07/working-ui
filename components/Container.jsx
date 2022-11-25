import Image from "next/image";
import styles from "../styles/pages/Dashboard.module.css";

const Container = (props) => {
  return (
    <>
      <div className={`flex flex-col w-full m-2 p-2 border border-solid rounded-lg border-[#DFE0EB] ${styles.cardContainer}`}>
        <div className="flex justify-between">
          <div className="flex flex-col justify-start">
            <h1 className={styles.heading}>{props.heading}</h1>
            {props.subHeading ? <h3 className={styles.subHeading}>{props.subHeading}</h3> : <h3 className={styles.subHeading}>sdfdfsd</h3>}
          </div>
          <div className={`${styles.symbol} font-black hover:cursor-pointer`}> ⋮ </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className={styles.banner}>{props.banner}</h1>
          <Image src={props.url} width="150" height="150" className={styles.containerImage} />
        </div>
      </div>
    </>
  );
};

export default Container;
