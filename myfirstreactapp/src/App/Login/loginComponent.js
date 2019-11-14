import React, { Component } from 'react';
var employeeDetails = require('../FakeDB/employeeTable.json');

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            isSubmitted: false,
            isUserValid: true
        }

        this.handleChangeState = this.handleChangeState.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        var obj = JSON.parse(localStorage.getItem("userDetails"));
        if (obj != null && obj != "") {
            this.props.history.push('/dashboard');
        }
    }

    loginSubmit(e) {
        e.preventDefault();
        this.setState({ isSubmitted: true });
        const { email, password } = this.state;
        if (email !== "" && password !== "") {
            var res = employeeDetails.filter(function (item, index) {
                return (item.Email.toLocaleLowerCase() === email.toLocaleLowerCase() &&
                    item.Password === password);
            })
            if (res.length > 0) {
                localStorage.setItem('userDetails', JSON.stringify(res[0]));

                this.props.history.push('/dashboard');
            } else {
                this.setState({
                    isUserValid: false
                });
            }
        }
    }

    handleChangeState(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleCancel(e) {
        e.preventDefault();
    }

    handleForgotPassword(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="login-box">
                <div className="login-box-innerBox">
                    <form className="Loginform">
                        <div className="container">
                            {
                                this.state.isUserValid === false ?
                                    <div className="help-block">UserName/Password is not valid.</div> : ""
                            }
                            <label labelfor="uname"><b>Email</b></label>
                            <input type="text" className="logininput" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChangeState} required />
                            {
                                this.state.isSubmitted && !this.state.email ?
                                    <div className="help-block">Email is required</div> : ''
                            }

                            <label labelfor="psw"><b>Password</b></label>
                            <input type="password" className="logininput" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChangeState} required />
                            {
                                this.state.isSubmitted && !this.state.password ?
                                    <div className="help-block">Password is required</div> : ''
                            }

                            <button type="submit" className="loginbutton" onClick={this.loginSubmit}>Login</button>
                            <label>
                                <input type="checkbox" className="logininput" name="rememberMe" value={this.state.rememberMe} onChange={this.handleChangeState} required /> Remember me
                            </label>
                            {
                                this.state.isSubmitted && !this.state.rememberMe ?
                                    <div className="help-block">Please check Remember Me before processed</div> : ''
                            }
                        </div>

                        <div className="container" className="cancelForgotDiv">
                            <button type="button" className="loginbutton cancelbtn">Cancel</button>
                            <span className="loginspan psw">Forgot <a href="#">password?</a></span>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

export default LoginComponent;