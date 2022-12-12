import React, { useState } from 'react';
import { Navbar, Footer } from '../components';

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