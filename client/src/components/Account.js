import React, { useState } from 'react';

function Account() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(name, email, password);
    }

    return (
        <div id="big-box" className="main-container ">
            <div className='inner-container text-light '>
                <h1>My Account</h1>
                <form className="justify-content-center" id="frm_account" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="txt_name">Name:</label>
                        <input className="form-control" type="text" name="Name" 
                        //defaultValue={name}
                            value={name} onChange={handleNameChange}
                        // onBlur={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txt_email">Email Address:</label>
                        <input className="form-control" type="email" name="Email" 
                        //defaultValue={email}
                            value={email} onChange={handleEmailChange}
                        // onBlur={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txt_password">Password:</label>
                        <input className="form-control" type="password" name="Password" 
                        //defaultValue={password}
                            value={password} onChange={handlePasswordChange}
                        // onBlur={handleChange} 
                        />
                    </div>
                    {/* {errorMessage && (
                    <div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                )} */}

                    <div className="form-group mt-3 float-end col-lg-3" >
                        <button id="btn_submit" className="btn btn-light w-100" type="submit"
                        //onSubmit={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={handleEmailChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <button>Submit</button>
                </form> */}
            </div>
        </div>
    );
}

export default Account;