import React from "react";
import { Link } from "react-router-dom";// no reloading page
import '../css/bootstrap.css';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

function Header() {

    const [isCollapse, setisCollapse] = React.useState(false)

    return (
        <header>
            <Tooltip anchorSelect=".menu-item" />
            <nav className="navbar navbar-expand-lg navbar-dark mb-2 fixed-top text-muted">

                <div className="navbar">
                    <div className="ms-3">
                        <h1 className="h1-header text-light">
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
                        <div className="my-2 my-sm-0">
                            <Link
                                to="Home"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <img className='card-img menu-item'
                                    alt='Home'
                                    data-tooltip-content="Home"
                                    src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/null/external-home-instagram-flatart-icons-outline-flatarticons.png" />
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 buger-menu">
                        <div className="my-2 my-sm-0">
                            <Link
                                to="SearchTrips"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <img className='card-img menu-item'
                                    alt='searchMaps'
                                    data-tooltip-content="Search Maps"
                                    src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/64/null/external-map-location-summer-smashingstocks-detailed-outline-smashing-stocks.png" />
                            </Link>
                        </div>
                    </div>
                    
                    <div className="navbar-nav d-flex me-sm-2 buger-menu">
                        <div className="my-2 my-sm-0">
                            <Link
                                to="MyTrips"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <img className='card-img menu-item'
                                    alt='MyTrips'
                                    data-tooltip-content="My Trips"
                                    src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/null/external-road-trip-travel-kmg-design-detailed-outline-kmg-design.png" />
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 buger-menu">
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
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 buger-menu">
                        <div className="my-2 my-sm-0">
                            <Link
                                to="Login"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <img className='card-img menu-item'
                                    alt='login'
                                    data-tooltip-content="Log In"
                                    src='https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/null/external-login-call-to-action-bearicons-detailed-outline-bearicons.png' />

                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 buger-menu">
                        <div className="my-2 my-sm-0">
                            <Link
                                to="Logout"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <img className='card-img menu-item'
                                    alt='logout'
                                    data-tooltip-content="Log Out"
                                    src="https://img.icons8.com/carbon-copy/64/null/logout-rounded.png" />
                            </Link>
                        </div>
                    </div>

                </div>

            </nav>
        </header>
    );
}

export default Header;