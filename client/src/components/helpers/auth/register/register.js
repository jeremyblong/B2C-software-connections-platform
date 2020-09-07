import React, { Component } from 'react';
import "./style.css";
import { Link } from "react-router-dom";

class RegisterHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        data: [],
        date: null,
        focused: null,
        accountType: "",
        email: "",
        password: "",
        reEnterPassword: "",
        username: "",
        experience: "",
        phoneNumber: ""
    }
}
    onChange = (date) => {
        this.setState({ date })
    }
    handleSubmission = (e) => {
        e.preventDefault();
        
        console.log("clicked - submitted...");

        const { email, accountType, password, reEnterPassword, username, experience, phoneNumber } = this.state;

        // axios.post("/register", {
            
        // }).then((res) => {
        //     console.log(res.data);
        // }).catch((err) => {
        //     console.log(err);
        // })
    }
    render() {
        console.log(this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div id="titlebar" class="gradient">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">

                                <h2 className="text-left">Register</h2>

                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li>Register</li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="container">
                    <div class="row">
                        <div class="col-xl-5 offset-xl-3">

                            <div class="login-register-page">
                                
                                <div class="welcome-text">
                                    <h3 style={{ fontSize: "26px" }}>Let's create your account!</h3>
                                    <span>Already have an account? <Link to="/sign-in">Log In!</Link></span>
                                </div>

                                <label>Select your account type</label>
                                <div class="account-type">
                                
                                    <div>
                                        
                                        <input onClick={(e) => {
                                            this.setState({
                                                accountType: "freelancer"   
                                            })
                                        }} type="radio" name="account-type-radio" id="freelancer-radio" class="account-type-radio" />
                                        <label for="freelancer-radio" class={this.state.accountType === "freelancer" ? "ripple-effect-dark active-primary" : "ripple-effect-dark"}><i class="icon-material-outline-account-circle"></i> Freelancer</label>
                                    </div>

                                    <div>
                                        <input onClick={(e) => {
                                            this.setState({
                                                accountType: "business"   
                                            })
                                        }} type="radio" name="account-type-radio" id="employer-radio" class="account-type-radio"/>
                                        <label for="employer-radio" class={this.state.accountType === "business" ? "ripple-effect-dark active-primary" : "ripple-effect-dark"}><i class="icon-material-outline-business-center"></i>Looking To Hire</label>
                                    </div>
                                </div>
                                    
                            
                                <form onSubmit={this.handleSubmission} id="register-account-form">
                                    <div class="input-with-icon-left">
                                        <i class="icon-material-baseline-mail-outline"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                email: e.target.value 
                                            })
                                        }} type="text" class="input-text with-border" name="emailaddress-register" id="emailaddress-register" placeholder="Email Address" required/>
                                    </div>

                                    <div class="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                                        <i class="icon-material-outline-lock"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                password: e.target.value 
                                            })
                                        }} type="password" class="input-text with-border" name="password-register" id="password-register" placeholder="Password" required/>
                                    </div>
                                    <div class="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                                        <i class="icon-material-outline-lock"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                reEnterPassword: e.target.value 
                                            })
                                        }} type="password" class="input-text with-border" name="password-register" id="password-register" placeholder="Re-Enter Password" required/>
                                    </div>
                                    <div class="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                                        <i class="icon-material-outline-lock"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                username: e.target.value 
                                            })
                                        }} type="text" class="input-text with-border" name="username" id="password-register" placeholder="Username" required/>
                                    </div>
                                   
                                    <div class="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                                    <label>How many years of coding experience do you have?</label>
                                        <select onChange={(e) => {
                                            this.setState({
                                                experience: e.target.value
                                            })
                                        }} placeholder={"Amount of years programming..."} className="form-control">
                                            <option value={"1"}>1 Year of Experience</option>
                                            <option value={"2"}>2 Years Experience</option>
                                            <option value={"3"}>3 Years Experience</option>
                                            <option value={"4"}>4 Years Experience</option>
                                            <option value={"5"}>5 Years Experience</option>
                                            <option value={"6"}>6 Years Experience</option>
                                            <option value={"7"}>7 Years Experience</option>
                                            <option value={"8"}>8 Years Experience</option>
                                            <option value={"9"}>9 Years Experience</option>
                                            <option value={"10+"}>10+ Years Experience</option>
                                            <option value={"15+"}>15+ Years Experience</option>
                                            <option value={"20+"}>20+ Years Experience</option>
                                        </select>
                                    </div>

                                    <div class="input-with-icon-left">
                                        <i class="icon-material-outline-lock"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                phoneNumber: e.target.value
                                            })
                                        }} type="text" class="input-text with-border" name="phone-number" id="password-repeat-register" placeholder="Phone Number" required/>
                                    </div>
                                    
                                </form>
                                
                                
                                <button class="button full-width button-sliding-icon ripple-effect margin-top-10 blue-btn" type="submit" form="login-form">Register <i class="icon-material-outline-arrow-right-alt"></i></button>
                                
                          
                                <div class="social-login-separator"><span>or</span></div>
                                <div class="social-login-buttons">
                                    <button class="facebook-login ripple-effect"><i class="icon-brand-facebook-f"></i> Register via Facebook</button>
                                    <button class="google-login ripple-effect"><i class="icon-brand-google-plus-g"></i> Register via Google+</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="margin-top-70"></div>
            </div>
        )
    }
}
export default RegisterHelper;