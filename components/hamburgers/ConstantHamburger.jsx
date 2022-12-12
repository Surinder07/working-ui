import { HamburgerStyles } from '../../styles/elements';

const ConstantHamburger = (props) => {
    return (
        <div className={HamburgerStyles.constantHamburger} onClick={() => props.setOpen(!props.open)}>
            <span className={`${HamburgerStyles.line} ${HamburgerStyles.line1}`}></span>
            <span className={`${HamburgerStyles.line} ${HamburgerStyles.line2}`}></span>
            <span className={`${HamburgerStyles.line} ${HamburgerStyles.line3}`}></span>
        </div>
    )
}

export default ConstantHamburger;