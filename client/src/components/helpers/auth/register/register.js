import React, { Component, Fragment } from 'react';
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import axios from "axios";
import { connect } from "react-redux";
import { authentication, forceSignup } from "../../../../actions/auth/auth.js";
import LoadingOverlay from 'react-loading-overlay';
import { NotificationManager} from 'react-notifications';

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
        experience: "1",
        phoneNumber: "",
        picture: null,
        isActive: false,
        emailTaken: null
    }
}
    onChange = (date) => {
        this.setState({ date })
    }
    onDrop = (picture) => {
        this.setState({
            picture
        });
    }
    makeCall = (data) => {
        const { email, accountType, password, reEnterPassword, username, experience, phoneNumber, picture, emailTaken } = this.state;

        console.log("callback RAN.", data);

        const NUMBER = phoneNumber.replace(/[- )(]/g,'');

        console.log("NUMBER :", NUMBER);

        if (email.length > 0 && accountType.length > 0 && password.length > 0 && username.length > 0 && experience.length > 0 && NUMBER && picture !== null && emailTaken === null) {
            
            let trimmed;

            if (data.includes("data:image/jpeg;base64,")) {
                trimmed = data.split("data:image/jpeg;base64,")[1];    
            } else if (data.includes("data:image/png;base64,")) {
                trimmed = data.split("data:image/png;base64,")[1];
            } else if (data.includes("data:image/jpg;base64,")) {
                trimmed = data.split("data:image/jpg;base64,")[1];
            }
            axios.post("/register", {
                email,  
                accountType,  
                password, 
                username, 
                experience, 
                phoneNumber: NUMBER,
                avatar: trimmed
            }).then((res) => {
                if (res.data.message === "Successfully registered!") {
                    console.log(res.data);

                    this.setState({
                        isActive: false
                    }, () => {
                        // this.props.authentication(res.data.data);

                        // this.props.forceSignup(true);

                        setTimeout(() => {
                            this.props.history.push("/verify/phone/number", { passed: res.data.data, sid: res.data.sid });

                        //     window.location.reload();

                        }, 750);
                    })
                }
            }).catch((err) => {
                console.log(err);
                this.setState({
                    isActive: false
                })
            })
        } else {
            this.setState({
                isActive: false
            }, () => {
                NotificationManager.error("Please complete the entire registration form including selecting a profile image & account type & make sure you're using an unregistered email...", 'Error message', 7000);
            })
        }
    }
    handleSubmission = (e) => {
        e.preventDefault();

        this.setState({
            isActive: true
        }, () => {
            const getBase64 = (file, cb) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    cb(reader.result);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            }
    
            if (this.state.picture !== null) {
                getBase64(this.state.picture[0], this.makeCall)
            } else {
                this.setState({
                    isActive: false
                }, () => {
                    NotificationManager.error("Please complete the entire registration form including selecting a profile image & account type & make sure you're using an unregistered email...", 'Error message', 7000);
                })
            }
        })
        
        console.log("clicked - submitted...");
    }
    renderConditionalContent = () => {
        if (this.state.accountType === "freelancer") {
            return (
                <Fragment>
                    <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                        <label>How many years of coding experience do you have?</label>
                        <select onChange={(e) => {
                            this.setState({
                                experience: e.target.value
                            })
                        }} placeholder={"Amount of years programming..."} className="form-control">
                            <option value={"-----"}>---- Select a value -----</option>
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
                </Fragment>
            );
        } else if (this.state.accountType === "business") {
            return null;
        }
    }
    checkEmail = () => {
        console.log("exited email input...");

        axios.post("/check/email/taken", {
            email: this.state.email
        }).then((res) => {
            console.log(res.data);
            if (res.data.message === "Email is already taken!") {
                console.log(res.data);
                this.setState({
                    emailTaken: res.data.message
                })
            } else {
                this.setState({
                    emailTaken: null
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log(this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div id="titlebar" className="gradient">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">

                                <h2 className="text-left">Register</h2>

                                <nav id="breadcrumbs" className="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li>Register</li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        <div className={this.state.isActive ? "col-xl-5 offset-xl-3 collll" : "col-xl-5 offset-xl-3"}>

                            <div className="login-register-page">
                                
                                <div className="welcome-text">
                                    <h3 style={{ fontSize: "26px" }}>Let's create your account!</h3>
                                    <span>Already have an account? <Link to="/sign-in">Log In!</Link></span>
                                </div>

                             {/* <form onSubmit={this.handleSubmission} id="register-account-form"> */}
                                <label>Select your account type</label>
                                <div className="account-type">
                                
                                    <div>
                                        
                                        <input onClick={(e) => {
                                            this.setState({
                                                accountType: "freelancer"   
                                            })
                                        }} type="radio" name="account-type-radio" id="freelancer-radio" className="account-type-radio" />
                                        <label for="freelancer-radio" className={this.state.accountType === "freelancer" ? "ripple-effect-dark active-primary" : "ripple-effect-dark"}><i className="icon-material-outline-account-circle"></i> Freelancer</label>
                                    </div>

                                    <div>
                                        <input onClick={(e) => {
                                            this.setState({
                                                accountType: "business"   
                                            })
                                        }} type="radio" name="account-type-radio" id="employer-radio" className="account-type-radio"/>
                                        <label for="employer-radio" className={this.state.accountType === "business" ? "ripple-effect-dark active-primary" : "ripple-effect-dark"}><i className="icon-material-outline-business-center"></i>Looking To Hire</label>
                                    </div>
                                </div>
                                    
                            
                                {this.state.emailTaken !== null ? <p className="lead text-center red-text" style={{ fontSize: "18px" }}>{this.state.emailTaken}</p> : null}
                                    <div className="input-with-icon-left">
                                        <i className="icon-material-baseline-mail-outline"></i>
                                        
                                        <input onBlur={this.checkEmail} onChange={(e) => {
                                            this.setState({
                                                email: e.target.value 
                                            })
                                        }} type="text" className="input-text with-border" name="emailaddress-register" id="emailaddress-register" placeholder="Email Address" required/>
                                    </div>

                                    <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                                        <i className="icon-material-outline-lock"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                password: e.target.value 
                                            })
                                        }} type="password" className="input-text with-border" name="password-register" id="password-register" placeholder="Password" required/>
                                    </div>
                                    <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                                        <i className="icon-material-outline-lock"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                reEnterPassword: e.target.value 
                                            })
                                        }} type="password" className="input-text with-border" name="password-register" id="password-register" placeholder="Re-Enter Password" required/>
                                    </div>
                                    {this.state.password !== this.state.reEnterPassword ? <label style={{ color: "red" }}>Passwords do NOT match!</label> : null}
                                    <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                                        <i className="icon-material-outline-lock"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                username: e.target.value 
                                            })
                                        }} type="text" className="input-text with-border" name="username" id="password-register" placeholder="Username" required/>
                                    </div>
                                   
                                    {this.renderConditionalContent()}

                                    <div className="input-with-icon-left">
                                        <i className="icon-material-outline-lock"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                phoneNumber: e.target.value
                                            })
                                        }} value={this.state.phoneNumber} type="text" className="input-text with-border" name="phone-number" id="password-repeat-register" placeholder="Phone Number" required/>
                                    </div>

                                    <ImageUploader
                                        withPreview={true}
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                    
                                
                                
                                
                                     <button onClick={this.handleSubmission} className="button full-width button-sliding-icon ripple-effect margin-top-10 blue-btn" type="submit" form="login-form">Register <i className="icon-material-outline-arrow-right-alt"></i></button>
                                
                                    {/* </form> */}
                                <div className="social-login-separator"><span>or</span></div>
                                <div className="social-login-buttons">
                                    <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f"></i> Register via Facebook</button>
                                    <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g"></i> Register via Google+</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <LoadingOverlay
                    active={this.state.isActive}
                    spinner
                    text='Communicating with server, please wait while we authenticate your account...'
                    >
                    
                </LoadingOverlay>

                <div className="margin-top-70"></div>
            </div>
        )
    }
}
export default withRouter(connect(null, { authentication, forceSignup })(RegisterHelper));