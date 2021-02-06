import React, { Component } from "react";
import LoginForm from "./login";
import './startpage.css'

class StartPage extends Component {
    render() {
        return (
            <div id="background">
                <LoginForm />
            </div>
        )
    }
}

export default StartPage;