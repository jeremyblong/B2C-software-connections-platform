import React, { Component, Fragment } from 'react';
import "./style.css";
import uuid from "react-uuid";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class ReviewTokenPurchaseHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        passedData: null,
        passedTokenValue: null,
        generatedID: uuid(),
        ready: false,
        user: null
    }
}
    componentDidMount() {

        axios.post("/gather/specific/user/username", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log("Found Specific User!", res.data);

                this.setState({
                    passedTokenValue: Number(this.props.props.match.params.tokens),
                    user: res.data.user,
                    ready: true
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    discountedPrice = () => {
        switch (this.state.passedTokenValue) {
            case 10:
                return 1.50 - (1.5 * 0.10);
                break;
            case 25:
                return 3.75 - (3.75 * 0.10);
                break;
            case 50: 
                return 7.50 - (7.50 * 0.10);
                break;
            case 75: 
                return 11.25 - (11.25 * 0.10);
                break;
            case 100: 
                return 15.00 - (15.00 * 0.10);
                break;
            case 200: 
                return 25.00 - (25.00 * 0.10);
                break;
            default:
                break;
        }
    }
    calculateCost = () => {
        switch (this.state.passedTokenValue) {
            case 10:
                return "$1.50";
                break;
            case 25:
                return "$3.75";
                break;
            case 50: 
                return "$7.50";
                break;
            case 75: 
                return "$11.25";
                break;
            case 100: 
                return "$15.00";
                break;
            case 200: 
                return "$25.00";
                break;
            default:
                break;
        }
    }
    renderContentConditional = () => {
        const { ready, user } = this.state;

        if (ready === true) {
            if (user.accountType === "business") {
                return (
                    <Fragment>
                        <div class="row pb-5 p-5">
                            <div class="col-md-6">
                                <p class="font-weight-bold mb-4 text-left">Client Information</p>
                                <p class="mb-1 text-left"><strong>Username:</strong> {user.username}</p>
                                <p class="mb-1 text-left"><strong>Account Type:</strong> {user.accountType}</p>
                                <p class="mb-1 text-left"><strong>Phone Number:</strong> {user.phoneNumber}</p>
                            </div>
    
                            <div class="col-md-6 text-right">
                                <p class="font-weight-bold mb-4">Payment Details</p>
                                <img src={require("../../../../assets/icons/paypal.png")} id="paypal" />
                            </div>
                        </div>
    
                        <div class="row p-5">
                            <div class="col-md-12">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="border-0 text-uppercase small font-weight-bold">ID</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Item</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Description</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Quantity</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Unit Cost</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.state.generatedID}</td>
                                            <td>Advantage Tokens</td>
                                            <td>You are purchasing tokens to spend on our platform - these give you a strategic advantage</td>
                                            <td>{this.state.passedTokenValue}</td>
                                            <td>$0.15 per token</td>
                                            <td>${this.discountedPrice().toFixed(2)}</td>
                                        </tr>
                                        {/* <tr>
                                            <td>1</td>
                                            <td>Software</td>
                                            <td>Support</td>
                                            <td>234</td>
                                            <td>$6356</td>
                                            <td>$23423</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Software</td>
                                            <td>Sofware Collection</td>
                                            <td>4534</td>
                                            <td>$354</td>
                                            <td>$23434</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.purchaseTokens} className="btn blue-btn" style={{ color: "white", width: "100%", marginBottom: "20px" }}>Continue to PayPal & purchase tokens</button>
                        </div> 
                        <div class="d-flex flex-row-reverse bg-dark text-white p-4">
                            <div class="py-3 px-5 text-right">
                                <div class="mb-2">Grand Total</div>
                                <div class="h2 font-weight-light">${this.discountedPrice().toFixed(2)}</div>
                            </div>
    
                            <div class="py-3 px-5 text-right">
                                <div class="mb-2">Membership Discount</div>
                                <div class="h2 font-weight-light">10%</div>
                            </div>
    
                            <div class="py-3 px-5 text-right">
                                <div class="mb-2">Sub - Total amount</div>
                                <div class="h2 font-weight-light">{this.calculateCost()}</div>
                            </div>
                        </div>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <div class="row pb-5 p-5">
                        
                            <div class="col-md-6">
                                <p class="font-weight-bold mb-4 text-left">Client Information</p>
                                <p class="mb-1 text-left"><strong>Username:</strong> {user.username}</p>
                                <p className="text-left"><strong>Location - City:</strong> {user.freelancerData.location.city}</p>
                                <p class="mb-1 text-left"><strong>Location - Country:</strong> {user.freelancerData.location.country}</p>
                                <p class="mb-1 text-left"><strong>Phone Number:</strong> {user.phoneNumber}</p>
                            </div>
    
                            <div class="col-md-6 text-right">
                                <p class="font-weight-bold mb-4">Payment Details</p>
                                <img src={require("../../../../assets/icons/paypal.png")} id="paypal" />
                            </div>
                        </div>
    
                        <div class="row p-5">
                            <div class="col-md-12">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="border-0 text-uppercase small font-weight-bold">ID</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Item</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Description</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Quantity</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Unit Cost</th>
                                            <th class="border-0 text-uppercase small font-weight-bold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.state.generatedID}</td>
                                            <td>Advantage Tokens</td>
                                            <td>You are purchasing tokens to spend on our platform - these give you a strategic advantage</td>
                                            <td>{this.state.passedTokenValue}</td>
                                            <td>$0.15 per token</td>
                                            <td>${this.discountedPrice().toFixed(2)}</td>
                                        </tr>
                                        {/* <tr>
                                            <td>1</td>
                                            <td>Software</td>
                                            <td>Support</td>
                                            <td>234</td>
                                            <td>$6356</td>
                                            <td>$23423</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>Software</td>
                                            <td>Sofware Collection</td>
                                            <td>4534</td>
                                            <td>$354</td>
                                            <td>$23434</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.purchaseTokens} className="btn blue-btn" style={{ color: "white", width: "100%", marginBottom: "20px" }}>Continue to PayPal & purchase tokens</button>
                        </div>                    
                        <div class="d-flex flex-row-reverse bg-dark text-white p-4">
                            <div class="py-3 px-5 text-right">
                                <div class="mb-2">Grand Total</div>
                                <div class="h2 font-weight-light">${this.discountedPrice().toFixed(2)}</div>
                            </div>
    
                            <div class="py-3 px-5 text-right">
                                <div class="mb-2">Membership Discount</div>
                                <div class="h2 font-weight-light">10%</div>
                            </div>
    
                            <div class="py-3 px-5 text-right">
                                <div class="mb-2">Sub - Total amount</div>
                                <div class="h2 font-weight-light">{this.calculateCost()}</div>
                            </div>
                        </div>
                    </Fragment>
                );
            }
        }
    }
    purchaseTokens = () => {
        const { passedTokenValue } = this.state;

        console.log("purchase tokens clicked.");

        switch (passedTokenValue) {
            case 10:
                axios.post("/purchase/crypto/coins/initial/paypal", {
                    amount: Number(1.50 - (1.5 * 0.10)), 
                    username: this.props.username,
                    crypto_total: 10
                }).then((res) => {
                    if (res.data) {
                        console.log(res.data);

                        window.location = res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
                break;
            case 25:
                axios.post("/purchase/crypto/coins/initial/paypal", {
                    amount: Number(3.75 - (3.75 * 0.10)), 
                    username: this.props.username,
                    crypto_total: 25
                }).then((res) => {
                    if (res.data) {
                        console.log(res.data);

                        window.location = res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
                break;
            case 50: 
                axios.post("/purchase/crypto/coins/initial/paypal", {
                    amount: Number(7.50 - (7.50 * 0.10)), 
                    username: this.props.username,
                    crypto_total: 50
                }).then((res) => {
                    if (res.data) {
                        console.log(res.data);

                        window.location = res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
                break;
            case 75: 
                axios.post("/purchase/crypto/coins/initial/paypal", {
                    amount: Number(11.25 - (11.25 * 0.10)), 
                    username: this.props.username,
                    crypto_total: 75
                }).then((res) => {
                    if (res.data) {
                        console.log(res.data);

                        window.location = res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
                break;
            case 100: 
                axios.post("/purchase/crypto/coins/initial/paypal", {
                    amount: Number(15.00 - (15.00 * 0.10)), 
                    username: this.props.username,
                    crypto_total: 100
                }).then((res) => {
                    if (res.data) {
                        console.log(res.data);

                        window.location = res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
                break;
            case 200: 
                axios.post("/purchase/crypto/coins/initial/paypal", {
                    amount: Number(25.00 - (25.00 * 0.10)), 
                    username: this.props.username,
                    crypto_total: 200
                }).then((res) => {
                    if (res.data) {
                        console.log(res.data);

                        window.location = res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
                break;
            default:
                break;
        }
    }
    render() {
        console.log("this.state", this.state);
        const date = moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a");
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div class="container" style={{ marginTop: "50px" }}>
                    <div class="row">
                        <div class="col-12">
                            <div class="card boxed-boxed">
                                <div class="card-body p-0">
                                <div className="row">
                                    <button onClick={this.purchaseTokens} className="btn blue-btn" style={{ color: "white", width: "100%", margin: "20px 15px" }}>Continue to PayPal & purchase tokens</button>
                                </div>
                                    <div class="row p-5">
                                        <div class="col-md-6">
                                            <img src={require("../../../../assets/images/code.png")} id="logo-logo" />
                                        </div>

                                        <div class="col-md-6 text-right">
                                            <p class="font-weight-bold mb-1">Invoice #{this.state.generatedID}</p>
                                            <p class="text-muted">Purchase Date: {date}</p>
                                        </div>
                                    </div>

                                    <hr class="my-5" />

                                    {this.renderContentConditional()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
        const obj = state.auth;
        if (obj.authenticated.hasOwnProperty("email")) {
            return {
                username: state.auth.authenticated.username
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, { })(ReviewTokenPurchaseHelper));
