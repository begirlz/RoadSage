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

    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0)

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

    //Toggle hamburger menu
    const [isCollapse, setisCollapse] = useState(false)
    // set modal display state
    const [showModal, setShowModal] = useState(false);
    // set fixed-top navigation
    // const [isFixedTop, setisFixedTop] = useState()
    // window.onload = () => {
    //     setisFixedTop(false);
    // }
    return (
        <header>

            <nav className="navbar fixed-top navbar-expand-lg navbar-dark mb-2">
                <div className="navbar">
                    <div className="ms-3">
                        <h1 className="text-dark">
                            Jane Doe
                        </h1>
                    </div>
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

                <div className={`navbar-collapse ${isCollapse ? '' : 'collapse'} justify-content-end `}
                    id="navbarColor02">
                    <div className="navbar-nav d-flex me-sm-2 ">
                        <div className="btn my-2 my-sm-0">
                            <Link
                                to="About"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <strong>About ME</strong>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 ">
                        <div className="btn my-2 my-sm-0">
                            <Link
                                to="Portfolio"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <strong>Portfolio</strong>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 ">
                        <div className="btn my-2 my-sm-0">
                            <Link
                                to="Contact"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <strong>Contact</strong>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 ">
                        <div className="btn my-2 my-sm-0">
                            <Link
                                to="Resume"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <strong>Resume</strong>
                            </Link>
                        </div>
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