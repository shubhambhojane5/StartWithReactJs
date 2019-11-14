import React, { Component } from 'react';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginUserDetails: {}
        }

        var obj = JSON.parse(localStorage.getItem("userDetails"));
        if (obj == null && obj == "") {
            this.props.history.push('/');
        }
    }

    componentWillMount() {
        var obj = JSON.parse(localStorage.getItem("userDetails"));
        this.setState({
            loginUserDetails: obj
        });
    }

    render() {
        return (
            <div>
                <h2>Login user</h2><br />
                <h4>Hey, {this.state.loginUserDetails.Name}</h4><br />
                User Details,
                <p>
                    <span>Email: {this.state.Email}</span>
                    <span>Mobile No: {this.state.MobileNo}</span>
                    <span>Role: {this.state.Role}</span>
                    <span>Designation: {this.state.Designation}</span>
                </p>
            </div>
        )
    }
}

export default DashboardComponent;