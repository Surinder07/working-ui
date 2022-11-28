import React, { useState } from 'react';
import Navbar from '../components/homeComponents/Navbar';
import Footer from '../components/homeComponents/Footer';

const NavFooterPageLayout = (props) => {

    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <Navbar
                pageInfo={props.pageInfo}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                screenType={props.screenType}
            />
            {props.children}
            <Footer screenType={props.screenType} />
        </>
    )
}

export default NavFooterPageLayout;