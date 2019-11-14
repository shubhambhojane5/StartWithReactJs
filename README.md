# Start With ReactJs
It's cover what is ReactJs and it's basic understanding which help's you to create/start with ReactJs application

###### ReactJs
ReactJs is a javascript library which is used to build user interface or client side application. Its most powerful and majorly used library in current time.

###### JSX
React use JSX stand for "javascript, XML", JSX is a syntax extension for ReactJS that help you write/add HTML tags in javascript. It creates a very powerful way to express a web application.

If you have questions why should we use JSX refer "https://reactjs.org/docs/introducing-jsx.html"

###### Components
A component is a some set of code of block which take some input and return some element which we can inject in Brower. Components help you to split some set code Block of code into smaller pieces, so that it's easy to manage, maintain, testable and importantly it's independent/ reusable.

In React we can create component in two ways,
1) class component
2) functional component   

###### Class Component:
  This component extends from React. Component, it's have constructed, render method, life cycle methods and state management.

    import React, {Component} from 'react';

    class MyFirstComponent extends Component
    {
    render()
    {
    return(
    <h1>Hey, it's my first component</h1>
    );
    }
    }
  
    export default MyFirstComponent;

By using export it will be available to import in another component.

###### Functional Component:
  Functional component is nothing but a javascript function which is returning a react element.
 
We can write functional component in two ways,

    function myfirstcomponent(){
    return (<h1>Hey, it's my first component</h1>);
    };

OR

    const myfirstcomponent = () =>{
    return (<h1>Hey, it's my first component</h1>);
    };

Previously we can't do any complex thing in functional component and even though we can't use state in it. But In/after React 16.8 version, react introduced 
a new concept called React hooks, using that we do state management in reacting functional component.

for react hooks prefer "https://reactjs.org/docs/hooks-intro.html"

###### Props
Generally, we can say props are global variable. In reacting when we want to pass data to a component so we can use props as well. Pro's stand for "Properties".

    function showLoggingUser(props){
    return (<h1>Hello, {props.name})
    }

    function login(){
    return(
    <div><showLoggingUser name="TestUser"></div>
    );
    }

Here we are using showLoggingUser () functional component in login () component, and we are passing logging user name using "name" property. So in showLoggingUser () Component this name property is available in props, using props. name we can fetch the value.
Same way we can pass any object/information to any component in ReactJS using props.

###### State
State and props are doing the same thing, but they some major difference, props are used to pass data between parent to child component or to it's self and those Are immutable and hence it will not change. While the state is used for mutable object or data that will be changing.

State are like data store in reactJs. Whenever we re creating a class component an empty stage is automatically assigned to it. 
The initial value of this state is null. By using constructor () we can change it.

If we want to update the state, then using setState () method we can do this, but updating state without using setState () is tricky not allowed.

    import React, {Component} from 'react';

    class myfirstcomponent extends Component {
      constructor(props){
          super(props)
          this.state = {
        "showDetails": false
        }

      }
      activeShowDetails=()=>{
          this.setState({"showDetails": true})
      }
      render(){
          return (
              <div>
                  <h1>Hey, welcome {this.props.name}!!</h1>              
                  {this.state.showDetails ?
                      <div>
                          <span> firstName: {this.props.firstname}</span>
                <span> LastName: {this.props.lastname}</span>
                <span> Age: {this.props.age}</span>
                <span> Mobile No: {this.props.mobilenumber}</span>
                      </div>
                      :
                      <button onClick={this.activeShowDetails}>Show User Details</button>
                  }
              </div>
          );
      }
    }

    export default myfirstcomponent;

When setState () is called from parent components, then it re-render it's all child components, but the setState () is an asynchronous, 
When parent and child both trying to update state and call setState () then react will not re-render child two times, instead react flushed the changes 
at the end of the browser. This result in significant performance improvement in large applications.

For more details refer "https://reactjs.org/docs/faq-state.html".

###### Now we are ready to start/create our first ReactJS application,

    1) npx create-react-app myfirstreactapp

    2) cd myfirstreactapp

    3) npm start

We have ready with first our React application.
Now will add/create our own component,

4) Create App folder under src and create another folder name Login within App(We created a folder just for structure, it's not necessary to add component only in some folder)

5) Add logicComponent.js file in Login folder. Here we are creating our first react component

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

6) Create Dashboard folder under App. Add dashboardComponent.js file, it's a Second component

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

7) Add some CSS in App.css file or you can add in separate file, just make sure you will add reference of the same.

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }

        .login-box {
          width: 360px;
          margin: 7% auto;
        }

        .login-box-innerBox{
          border: 1px solid skyblue;
          padding: 20px;
        }

        .cancelForgotDiv{
          background-color:#f1f1f1;
          padding: 5px;
        }

        .Loginform {border: 3px solid #f1f1f1;}

        .logininput[type=text], input[type=password] {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          display: inline-block;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }

        .loginbutton {
          background-color: #4CAF50;
          color: white;
          padding: 14px 20px;
          margin: 8px 0;
          border: none;
          cursor: pointer;
          width: 100%;
        }

        .loginbutton:hover {
          opacity: 0.8;
        }

        .cancelbtn {
          width: auto;
          padding: 10px 18px;
          background-color: #f44336;
        }

        .imgcontainer {
          text-align: center;
          margin: 24px 0 12px 0;
        }

        .loginimg.avatar {
          width: 40%;
          border-radius: 50%;
        }

        .container {
          padding: 25px;
        }

        .loginspan.psw {
          float: right;
          padding-top: 16px;
        }

        .navBtn{
          margin:10px;
        }

        .table-componentCls{
          width: 95%;
          margin: 7% auto;
        }

        .up {
          transform: rotate(-135deg);
          -webkit-transform: rotate(-135deg);
          margin-left: 10px;
        }

        .down {
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          margin-left: 10px;
        }

        .arrowICls {
          border: solid black;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 3px;
        }

        .pointerCls{
          cursor: pointer;
        }


        /* Add emp details css */
        .inputBox{
          width: 25% !important;
        }

        /* Change styles for span and cancel button on extra small screens */
        @media screen and (max-width: 300px) {
          .loginspan.psw {
             display: block;
             float: none;
          }
          .cancelbtn {
             width: 100%;
          }
        }

8) Now it's time to add routing. But before that we need to install a package for routing.
react router:
   React router is a routing library built on top of the react which is used to create the routing in react apps

    npm install --save react-router-dom

Now we have almost done with our react logic application, but we don't have any DB to verify is valid a user is logged-in. 
For that we are creating a JSON file of Employee. For that, create a folder name FakeDB under App, the create "employeeTable.json".

Now save the changes and check the browser, we are done with our first ReactJs application.
