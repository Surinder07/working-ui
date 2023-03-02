import {HamburgerStyles} from "../../styles/elements";
import {joinClasses} from "../../helpers";

const Hamburger = (props) => {
    return (
        <div className={joinClasses(HamburgerStyles.hamburgerContainer, props.className)}>
            <input
                type="checkbox"
                name="hamburger"
                id="hamburger"
                checked={props.openMenu}
                onChange={(e) => {
                    props.setOpenMenu(e.target.checked);
                    if (e.target.checked === true) {
                        props.blockScroll();
                    } else {
                        props.allowScroll();
                    }
                }}
            />
            <div className={HamburgerStyles.hamburgerLines}>
                <span className={joinClasses(HamburgerStyles.line, HamburgerStyles.line1)}></span>
                <span className={joinClasses(HamburgerStyles.line, HamburgerStyles.line2)}></span>
                <span className={joinClasses(HamburgerStyles.line, HamburgerStyles.line3)}></span>
            </div>
        </div>
    );
};

export default Hamburger;
