import React, { Component } from "react";
import AuthenticationService from "../core/auth"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { CenterIt } from "./styled";
import "./login.css";
import logo from "../logo.png";

type LoginState = {
    username: string,
    password: string,
    message: string,
    loading: boolean
}

class LoginForm extends Component {
    state: LoginState = {
        username: "",
        password: "",
        message: "",
        loading: false
    }

    handleUsernameChange(event: any) {
        this.setState({username: event.target.value})
    }

    handlePasswordChange(event: any) {
        this.setState({password: event.target.value})
    }

    handleLogin() {
        if (this.state.loading) {
            return;
        }

        this.setState({message: "", loading: true})
        
        if (!this.state.username || !this.state.password) {
            this.setState({message: "Please enter username and password!", loading: false});
            return;
        }

        AuthenticationService.login(this.state.username, this.state.password).then(data => console.log(data))
    }

    render() {
        return (
            <div id="login-container">
                <CenterIt>
                    <img id="login-logo" src={logo} alt="CrazyWars Staff Panel"/>
                </CenterIt>

                <Form id="login-form">
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" onChange={e => this.handleUsernameChange(e)}/>
                        <Form.Text className="text-muted">This is your Minecraft username</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => this.handlePasswordChange(e)}/>
                    </Form.Group>

                    <CenterIt>
                        <Button variant="primary" className="my-1" disabled={this.state.loading} 
                        onClick={e => this.handleLogin()}>
                            {this.state.loading ? "Logging in..." : "Log In"}
                        </Button>
                    </CenterIt>
                </Form>

                <CenterIt>
                    {this.state.message ? <Alert variant="warning">{this.state.message}</Alert> : null}
                </CenterIt>
            </div>
        )
    }
}

export default LoginForm;