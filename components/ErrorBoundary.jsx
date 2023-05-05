import React from "react";
import Link from "next/link";
import { WaawNoIndexHead } from "../components";
import { NotFoundStyles } from '../styles/pages';
import { NavFooterPageLayout } from "../layouts";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <>
                    <WaawNoIndexHead title='500 - Page is broken' />
                    <NavFooterPageLayout pageInfo={{ activeMenu: '' }}>
                        <div className={NotFoundStyles.notFoundPage}>
                            <div className={NotFoundStyles.notFound}>
                                <div className={NotFoundStyles.notFound404}>
                                    <h3>Oops! Page seems to be broken</h3>
                                    <h1>
                                        <span>5</span>
                                        <span>0</span>
                                        <span>0</span>
                                    </h1>
                                </div>
                                <h2>we are sorry, but the page you requested seems to be broken for some reason</h2>
                                <Link href={'/'}>
                                    <p><span style={{ fontWeight: 700 }}>←</span> Go back to home</p>
                                </Link>
                            </div>
                        </div>
                    </NavFooterPageLayout>
                </>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;