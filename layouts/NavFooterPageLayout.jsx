import { Navbar, Footer } from '../components';

const NavFooterPageLayout = (props) => {

    return (
        <>
            <Navbar pageInfo={props.pageInfo} />
            {props.children}
            <Footer />
        </>
    )
}

export default NavFooterPageLayout;