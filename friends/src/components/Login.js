import React from "react";
import axios from "axios";

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password:  ""
        }
    };

    handleChanges = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        // make a post request to the login endpoint on the server 
        axios 
            .post("http://localhost:5000/api/login", this.state.credentials)
            // If creds are good, authorization is granted, and token is received,
            .then(res => {
                console.log(res);
                // store the token in localStorage,
                localStorage.setItem("token", res.data.payload);
                // and redirect the use to the main "logged-in" page.
                this.props.history.push("/protected");
            })
            .catch(err => console.log({ err }));
    };
/*
    logout = e => {
        e.preventDefault();
        axios 
        .post("http://localhost:5000/api/login", this.state.credentials)
        // If creds are good, authorization is granted, and token is received,
        .then(res => {
            console.log(res);
            // store the token in localStorage,
            localStorage.deleteItem("token", res.data.payload);
            // and redirect the use to the main "logged-in" page.
            this.props.history.push("/protected");
        })
        .catch(err => console.log({ err }));
    }
*/
    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <input 
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChanges}
                        placeholder="username"
                    />
                    <input 
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChanges}
                        placeholder="password"
                    />
                    <button>Log In</button>
                </form>
            </div>
        )
    }
};

export default Login;