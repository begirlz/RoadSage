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
        <div id="big-box" className="main-container">
            <div className='inner-container text-light'>
                <h1>My Account</h1>
                <form onSubmit={handleSubmit}>
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
                </form>
            </div>
        </div>
    );
}

export default Account;