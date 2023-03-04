import React from "react";
import { Link } from "react-router-dom";// no reloading page
import '../css/bootstrap.css';
import '../App.css';
import banner from '../img/road.gif'

function Header() {

    const [isCollapse, setisCollapse] = React.useState(false)

    return (
        <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + banner})`, 
        // backgroundRepeat: 'no-repeat', backgroundSize: 'cover',  width: '100%', height: '900px'
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        //width: '100%', height: '500px'
        width: '100vw',
        height: '100vh'
        }}>
            <header >
            <nav className="navbar navbar-expand-lg navbar-dark mb-2" >

                <div className="navbar">
                    <div className="ms-3">
                        <h1 className="text-dark h1-animated">
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
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>

                <div className={`navbar-collapse ${isCollapse ? '' : 'collapse'} justify-content-end `}
                    id="navbarColor02">
                    <div className="navbar-nav d-flex me-sm-2 ">
                        <div className="btn btn-warning my-2 my-sm-0">
                            <Link
                                to="About"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <strong>My Trips</strong>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 ">
                        <div className="btn btn-warning my-2 my-sm-0">
                            <Link
                                to="Portfolio"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <strong>Account</strong>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 ">
                        <div className="btn btn-warning my-2 my-sm-0">
                            <Link
                                to="Contact"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <strong>LogIn</strong>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-nav d-flex me-sm-2 ">
                        <div className="btn btn-warning my-2 my-sm-0">
                            <Link
                                to="Resume"
                                className=""
                                spy="true"
                                smooth="true"
                            >
                                <strong>LogOut</strong>
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