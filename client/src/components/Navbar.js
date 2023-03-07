import React from "react";
import { Link } from "react-router-dom";// no reloading page
import '../css/bootstrap.css';
import '../App.css';
import banner from '../img/road.gif'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

function Header() {

    const [isCollapse, setisCollapse] = React.useState(false)

    
    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + banner})`,
            // backgroundRepeat: 'no-repeat', backgroundSize: 'cover',  width: '100%', height: '900px'
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            //width: '100%', height: '500px'
            width: '100vw',
            height: '100vh'
        }}>           
            <header >
                <Tooltip anchorSelect=".menu-item" />
                <nav className="navbar navbar-expand-lg navbar-dark mb-2" >

                    <div className="navbar">
                        <div className="ms-3">
                            <h1 className="text-dark h1-header">
                                Road Sage
                            </h1>
                        </div>
                    </div>

                    <button className={`navbar-toggler ${isCollapse ? '' : ''}`}
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

                    <div className={`navbar-collapse ${isCollapse ? '' : 'collapse'} justify-content-end `}
                        id="navbarColor02">
                        <div className="navbar-nav d-flex me-sm-2 buger-menu">
                            {/* <div className="btn btn-warning my-2 my-sm-0"> */}
                            <div className="my-2 my-sm-0">
                                <Link
                                target="_blank"
                                    to="MyTrips"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                >
                                    
                                    <img className='card-img menu-item'
                                        // style={{ width: '100%', height: '100%' }}
                                        alt='MyTrips'
                                        data-tooltip-content="My Trips"
                                        src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/64/null/external-map-location-summer-smashingstocks-detailed-outline-smashing-stocks.png" />
                                    {/* <strong>My Trips</strong> */}
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-nav d-flex me-sm-2 buger-menu">
                            <div className="my-2 my-sm-0">
                                <Link
                                target="_blank"
                                    to="Account"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                >
                                    <img className='card-img menu-item'
                                        // style={{ width: '100%', height: '100%' }}
                                        alt='account'
                                        data-tooltip-content="My Account"
                                        src="https://img.icons8.com/pastel-glyph/64/null/person-male--v2.png" />
                                    {/* <strong>Account</strong> */}
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-nav d-flex me-sm-2 buger-menu">
                            {/* <div className="btn btn-warning my-2 my-sm-0"> */}
                            <div className="my-2 my-sm-0">
                                <Link
                                    target="_blank"
                                    to="Login"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                >
                                    <img className='card-img menu-item'
                                        // style={{ width: '100%', height: '100%' }}
                                        alt='login'
                                        data-tooltip-content="Log In"
                                        src='https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/null/external-login-call-to-action-bearicons-detailed-outline-bearicons.png' />
                                    {/* <strong>LogIn</strong> */}
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-nav d-flex me-sm-2 buger-menu">
                            <div className="my-2 my-sm-0">
                                <Link
                                target="_blank"
                                    to="Logout"
                                    className=""
                                    spy="true"
                                    smooth="true"
                                >
                                    <img className='card-img menu-item'
                                        // style={{ width: '100%', height: '100%' }}
                                        alt='logout'
                                        data-tooltip-content="Log Out"
                                        src="https://img.icons8.com/carbon-copy/64/null/logout-rounded.png" />
                                    {/* <strong>LogOut</strong> */}
                                </Link>
                            </div>
                        </div>

                    </div>

                </nav>
            </header>
          </div>

    );
}

export default Header;