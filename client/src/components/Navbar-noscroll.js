import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";// no reloading page
import '../css/bootstrap.css';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import Auth from '../utils/auth';

import { Nav, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

function Header() {

    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0)

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    const listenToScroll = () => {
        let heightToHideFrom = 150;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    //Toggle hamburger menu
    const [isCollapse, setisCollapse] = useState(false)
    // set modal display state
    const [showModal, setShowModal] = useState(false);
    // set fixed-top navigation
    const [isFixedTop, setisFixedTop] = useState()
    window.onload = () => {
        setisFixedTop(false);
    }
    return (
        <header>
            <Tooltip anchorSelect=".menu-item" />
            <nav className={`${isFixedTop ? '' : 'fixed-top'} 
                navbar navbar-expand-lg mb-2 text-muted
                `}
            >
                {/* <div id="height">
                    <b>height: {height} - {isVisible ? "show" : "hide"}</b>
                </div> */}
                {
                    isVisible
                    &&
                    <div id="hide">
                        <div className="ms-3">
                            <h1 className="h1-header text-light">
                                Road Sage
                            </h1>
                        </div>
                    </div>
                }
                <button className={`navbar-nav navbar-toggler ${isCollapse ? '' : ''}`}
                    type="button"
                    onClick={() => {
                        setisCollapse(!isCollapse)
                    }}
                    data-bs-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>

                <div className={`navbar-collapse ${isCollapse ? '' : 'collapse'} justify-content-end`}
                    id="navbarColor02">

                    {/* Leave Home icon outside of logged in*/}
                    <div className="d-flex collapse-center">
                        <div className="navbar-nav d-inline-flex me-sm-2 buger-menu">
                            <div className="my-2 my-sm-0">
                                <Link
                                    to="Home"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                    onClick={() => {
                                        setisFixedTop(false);
                                    }}
                                >
                                    <img className='card-img menu-item'
                                        alt='Home'
                                        data-tooltip-content="Home"
                                        src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/null/external-home-instagram-flatart-icons-outline-flatarticons.png" />
                                </Link>
                            </div>
                        </div>

                        {/* need to move this under loggedin after all done */}
                        <div className="navbar-nav d-inline-flex me-sm-2 buger-menu">
                            <div className="my-2 my-sm-0">
                                <Link
                                    to="SearchTrips"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                    // onClick={() => {
                                    //     setisFixedTop(true);
                                    // }}
                                >
                                    <img className='card-img menu-item'
                                        alt='searchMaps'
                                        data-tooltip-content="Search Maps"
                                        src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/64/null/external-map-location-summer-smashingstocks-detailed-outline-smashing-stocks.png" />
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-nav d-inline-flex me-sm-2 buger-menu">
                            <div className="my-2 my-sm-0">
                                <Link
                                    to="MyTrips"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                    onClick={() => {
                                        setisFixedTop(true);
                                    }}
                                >
                                    <img className='card-img menu-item'
                                        alt='MyTrips'
                                        data-tooltip-content="My Trips"
                                        src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/null/external-road-trip-travel-kmg-design-detailed-outline-kmg-design.png" />
                                </Link>
                            </div>
                        </div>

                        {/* Features */}
                        {/* <div className="navbar-nav d-inline-flex me-sm-2 buger-menu">
                            <div className="my-2 my-sm-0">
                                <Link
                                    to="Account"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                >
                                    <img className='card-img menu-item'
                                        alt='account'
                                        data-tooltip-content="My Account"
                                        src="https://img.icons8.com/pastel-glyph/64/null/person-male--v2.png" />
                                </Link>
                            </div>
                        </div> */}

                        {/* if user is logged in show saved books and logout */}
                        {Auth.loggedIn() ? (
                            <>
                                <div className="navbar-nav d-inline-flex me-sm-2 buger-menu">
                                    <div className="my-2 my-sm-0">
                                        <Link
                                            to="Logout"
                                            className=""
                                            spy="true"
                                            smooth="true"
                                            onClick={Auth.logout}
                                        >
                                            <img className='card-img menu-item'
                                                alt='logout'
                                                data-tooltip-content="Log Out"
                                                src="https://img.icons8.com/carbon-copy/64/null/logout-rounded.png" />
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="navbar-nav d-inline-flex me-sm-2 buger-menu">
                                <div className="my-2 my-sm-0">
                                    <Link
                                        to="Login"
                                        className=""
                                        spy="true"
                                        smooth="true"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <img className='card-img menu-item'
                                            alt='login'
                                            data-tooltip-content="Log In"
                                            src='https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/null/external-login-call-to-action-bearicons-detailed-outline-bearicons.png' />

                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <Modal
                animation={false}
                centered
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'>
                {/* tab container to do either signup or login component */}
                <Tab.Container defaultActiveKey='login'>
                    <Modal.Header closeButton>
                        <Modal.Title id='signup-modal'>
                            <Nav variant='pills'>
                                <Nav.Item>
                                    <Nav.Link eventKey='login'>Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey='login'>
                                <LoginForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='signup'>
                                <SignUpForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </header>
    );
}

export default Header;