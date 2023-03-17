import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";// no reloading page
import '../css/bootstrap.css';
// import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import Auth from '../utils/auth';

import { Nav, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

function Header() {
    const [isFixedTop, setisFixedTop] = useState()
    // Handle homepage
    window.onload = () => {

        const pageName = window.location.pathname.trim();
        if (pageName !== "/" || pageName !== "/Home") {
            // document.body.classList.remove("homepage", "d-flex", "justify-content-center", "align-items-center");
            document.getElementById('root').classList.remove("homepage", "d-flex", "justify-content-center", "align-items-center");
            setisFixedTop(false);
        }
        if (pageName === "/" || pageName === "/Home") {
            // document.body.classList.add("homepage", "d-flex", "justify-content-center", "align-items-center");
            document.getElementById('root').classList.add("homepage", "d-flex", "justify-content-center", "align-items-center");
            setisFixedTop(true);
        }
    }

    const homeButtonClick = () => {
        if (!(document.getElementById('root').classList.value).includes("homepage")) {
            // document.body.classList.add("homepage", "d-flex", "justify-content-center", "align-items-center");
            document.getElementById('root').classList.add("homepage", "d-flex", "justify-content-center", "align-items-center");
            setisFixedTop(true);
        }
    }

    const navButtonClick = () => {
        if ((document.getElementById('root').classList.value).includes("homepage")) {
            // document.body.classList.remove("homepage");
            document.getElementById('root').classList.remove("homepage", "d-flex", "justify-content-center", "align-items-center");
            setisFixedTop(false);
        }
    }


    // On scroll 
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    const listenToScroll = () => {
        let heightToHideFrom = 100;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    // Toggle hamburger menu
    const [isCollapse, setisCollapse] = useState(false)
    // Set modal display state
    const [showModal, setShowModal] = useState(false);


    return (
        <header>

            {/* <nav className="navbar fixed-top navbar-expand-lg navbar-dark mb-2"> */}
            <nav className={`${isFixedTop ? 'fixed-top' : ''} 
                navbar navbar-expand-lg mb-2 text-muted
                `}>
                <div className="navbar-brand ">
                    <h1 className="text-dark h1-header">
                        Road Sage
                    </h1>
                </div>

                <button className={`navbar-toggler ${isCollapse ? '' : ''}`}
                    type="button"
                    onClick={() => {
                        setisCollapse(!isCollapse)
                    }}
                    data-bs-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>

                <div className={`navbar-collapse ${isCollapse ? '' : 'collapse'} justify-content-end navbar-brand`}
                    id="navbarColor02">
                    <div class="d-flex justify-content-end">
                        <div className="btn ">
                            <Link
                                to="Home"
                                className=""
                                spy="true"
                                smooth="true"
                                onClick={() => {
                                    homeButtonClick();
                                    //setisFixedTop(false);
                                }}
                            >
                                <img className='card-img '
                                    alt='Home'
                                    data-tooltip-content="Home"
                                    src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/null/external-home-instagram-flatart-icons-outline-flatarticons.png" />
                            </Link>
                        </div>
                        {Auth.loggedIn() ? (
                            <>
                                <div className="btn ">
                                    <Link
                                        to="SearchTrips"
                                        className=""
                                        spy="true"
                                        smooth="true"
                                        onClick={() => {
                                            navButtonClick();
                                            // setisFixedTop(true);
                                        }}
                                    >
                                        <img className='card-img'
                                            alt='searchMaps'
                                            data-tooltip-content="Search Maps"
                                            src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/64/null/external-map-location-summer-smashingstocks-detailed-outline-smashing-stocks.png" />
                                    </Link>
                                </div>
                                <div className="btn ">
                                    <Link
                                        to="MyTrips"
                                        className=""
                                        spy="true"
                                        smooth="true"
                                        onClick={() => {
                                            navButtonClick();
                                            //setisFixedTop(true);
                                        }}
                                    >
                                        <img className='card-img '
                                            alt='MyTrips'
                                            data-tooltip-content="My Trips"
                                            src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/null/external-road-trip-travel-kmg-design-detailed-outline-kmg-design.png" />
                                    </Link>
                                </div>
                                <div className="btn ">
                                    <Link
                                        to="Logout"
                                        className=""
                                        spy="true"
                                        smooth="true"
                                        onClick={Auth.logout}
                                    // onClick={() => {
                                    //     const loggedout = Auth.logout;
                                    //     navButtonClick();
                                    // }}
                                    >
                                        <img className='card-img '
                                            alt='logout'
                                            data-tooltip-content="Log Out"
                                            src="https://img.icons8.com/carbon-copy/64/null/logout-rounded.png" />
                                    </Link>
                                </div>
                            </>
                        ) : (

                            <div className="btn ">
                                <Link
                                    to="Login"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                    onClick={() => setShowModal(true)}
                                >
                                    <img className='card-img '
                                        alt='login'
                                        data-tooltip-content="Log In"
                                        src='https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/null/external-login-call-to-action-bearicons-detailed-outline-bearicons.png' />

                                </Link>
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
        </header >
    );
}

export default Header;