import React, { Component } from 'react';
import "./style.css";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

class PayForMembershipHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        selected: "monthly",
        monthly: 0,
        yearly: 0
    }
}
    renderPrice = () => {
        console.log("rendered...");

        switch (this.state.selected) {
            case "monthly":
                return `$${this.state.monthly.toString()}`;
                break;
            case "yearly":
                return `$${Math.floor((this.state.monthly * 12) * 0.80).toString()}.99`
                break;
            default:
                break;
        }
    }
    renderFinal = () => {
        switch (this.state.selected) {
            case "monthly":
                return `$${(Math.round((this.state.monthly + 4.99) * 100) / 100).toString()}`;
                break;
            case "yearly":
                return `$${Math.floor(((this.state.monthly * 12) * 0.80) + 4.99).toString()}.99`
                break;
            default:
                break;
        }
    }
    componentDidMount() {
        if (this.props.amount) {
            this.setState({
                monthly: this.props.amount.monthly,
                yearly: this.props.amount.yearly
            })
        } else {
            this.setState({
                monthly: 19.99,
                yearly: 199.99
            })
        }
    }
    redirectPaypalProcess = () => {
        console.log("clicked.");

        switch (this.state.selected) {
            case "monthly":
                    axios.post("/paypal/initital", {
                        amount: Math.round((this.state.monthly + 4.99) * 100) / 100,
                        username: this.props.username
                    }).then((res) => {
                        if (true) {
                            console.log(res.data);
                            window.location.href = res.data;
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                break;
            case "yearly": 
                    console.log("calculated... ", Math.floor(((this.state.monthly * 12) * 0.80) + 4.99));
                    
                    axios.post("/paypal/initital", {
                        amount: Math.round((((this.state.monthly * 12) * 0.80) + 4.99) * 100) / 100,
                        username: this.props.username
                    }).then((res) => {
                        if (true) {
                            console.log(res.data);

                            window.location.href = res.data;
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
        console.log("ppppppppp :", this.props, "this.state", this.state);
        return (
            <div>
                <div className="clearfix"></div>
                    <div id="titlebar" className="gradient">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">

                                    <h2>Checkout</h2>

                                    <nav id="breadcrumbs" className="dark">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">Pricing Plans</a></li>
                                            <li>Checkout</li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                        </div>
                    </div>


              
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 content-right-offset">
                                

                                
                                <h3>Billing Cycle</h3>
                                <label>--- default billing cycle is $19.99 monthly ---</label>

                                <div className="billing-cycle margin-top-25">

                                    <div className="radio" id={this.state.selected === "monthly" ? "picked" : null}>
                                        <input onClick={() => {
                                            this.setState({
                                                selected: "monthly"
                                            })
                                        }} id="radio-5" name="radio-payment-type" type="radio" checked={this.state.selected === "monthly" ? true : false} />
                                        <label for="radio-5">
                                            <span className="radio-label"></span>
                                            Billed Monthly
                                            <span className="billing-cycle-details">
                                                <span className="regular-price-tag">${this.state.monthly} / month</span>
                                            </span>
                                        </label>
                                    </div>
                                
                           
                                    <div className="radio" id={this.state.selected === "yearly" ? "picked" : null}>
                                        <input onClick={() => {
                                            this.setState({
                                                selected: "yearly"
                                            })
                                        }} id="radio-6" name="radio-payment-type" type="radio" checked={this.state.selected === "yearly" ? true : false} />
                                        <label for="radio-6"><span className="radio-label"></span>
                                            Billed Yearly
                                            <span className="billing-cycle-details">
                                                <span className="discounted-price-tag">${Math.floor((this.state.monthly * 12) * 0.80) + 0.99} / year</span>
                                                <span className="regular-price-tag line-through">588.00 / year</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                

                             
                                <h3 className="margin-top-50">Payment Method</h3>

                               
                                <label>You can also pay with a debit/credit card via the paypal portal...</label>
                                        
                                <button onClick={this.redirectPaypalProcess} className="button blue-btn big ripple-effect margin-top-40 margin-bottom-65">Proceed With PAYPAL Payment</button>

                                <img className="payment-logo paypal" src="https://i.imgur.com/ApBxkXU.png" alt=""/>
                            </div>


                   
                            <div className="col-xl-4 col-lg-4 margin-top-0 margin-bottom-60">
                                
                                
                                <div className="boxed-widget summary margin-top-0">
                                    <div className="boxed-widget-headline">
                                        <h3>Summary</h3>
                                    </div>
                                    <div className="boxed-widget-inner">
                                        <ul>
                                            <li>Standard Plan <span>{this.renderPrice()}</span></li>
                                            <li>VAT - Inititation Fee <span>$4.99</span></li>
                                            <li className="total-costs">Final Price <span>{this.renderFinal()}</span></li>
                                        </ul>
                                    </div>
                                </div>
           
                                <div className="checkbox margin-top-30">
                                    <input type="checkbox" id="two-step"/>
                                    <label for="two-step"><span className="checkbox-icon"></span>  I agree to the <a href="#">Terms and Conditions</a> and the <a href="#">Automatic Renewal Terms</a></label>
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
export default withRouter(connect(mapStateToProps, {  })(PayForMembershipHelper));
