import React, { Component } from 'react';
import "./style.css";
import { Link, withRouter } from "react-router-dom";

class PurchaseCoinsSelectionHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        promo_code: "",
        token_selected: null
    }
}
    handleRedirect = () => {
        console.log("redirect clicked.");

        this.props.history.push(`/purchase/tokens/review/${this.state.token_selected}`, { state: this.state });
    }
    render() {
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div className="box">
                    <div className="container">
                        <div className="mx-auto">
                            <h2 className="lead" style={{ color: "blue", fontWeight: "bold" }}>Puchase "Code Coins" to interact with our software & other users on our platform</h2> <hr className="my-4" />
                            <label>Coins can be used for a variety of things such as applying for more jobs than typically allowed, re-applying (adding your application BACK into the pending applicants pool when denied for a position), upgrading your account visibility, boosting your profile and much more...</label>
                            <hr className="my-4" />
                            <div className="mx-auto">
                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <label id="promo-label">Promo code (if you have one)</label>
                                    <input style={{ width: "100%", minWidth: "100%" }} className="form-control" placeholder={"Ex. AYJ456JSM32"} onChange={(e) => {
                                        this.setState({
                                            promo_code: e.target.value
                                        })
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            
                                    <div className="box-part text-center">
                                        
                                        <img className="token-coin" src={require("../../../../assets/icons/coin.png")} style={{ width: "65px", height: "65px" }} />
                                        
                                        <div className="title">
                                            <h4>Purchase <strong style={{ fontWeight: "bold", fontSize: "25px", textDecoration: "underline" }}>10</strong> Tokens</h4>
                                            <hr className="my-4" />
                                            <p className="lead cash-amount">$1.50</p>
                                        </div>
                                        
                                        <div className="text">
                                            <span>Tokens are used to apply for jobs and are also used for other special tasks such as promoting job listings, re-applying to jobs denied jobs and much more...</span>
                                        </div>
                                        
                                        <button className="btn blue-btn" onClick={() => {
                                            this.setState({
                                                token_selected: 10
                                            }, () => {
                                                this.handleRedirect();
                                            })
                                        }}>Select & Purchase Tokens</button>
                                        
                                    </div>
                                </div>	 
                                
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            
                                    <div className="box-part text-center">
                                        
                                        <img className="token-coin" src={require("../../../../assets/icons/coin.png")} style={{ width: "65px", height: "65px" }} />
                                    
                                        <div className="title">
                                            <h4>Purchase <strong style={{ fontWeight: "bold", fontSize: "25px", textDecoration: "underline" }}>25</strong> Tokens</h4>
                                            <hr className="my-4" />
                                            <p className="lead cash-amount">$3.75</p>
                                        </div>
                                        
                                        <div className="text">
                                            <span>Tokens are used to apply for jobs and are also used for other special tasks such as promoting job listings, re-applying to jobs denied jobs and much more...</span>
                                        </div>
                                        
                                        <button className="btn blue-btn" onClick={() => {
                                            this.setState({
                                                token_selected: 25
                                            }, () => {
                                                this.handleRedirect();
                                            })
                                        }}>Select & Purchase Tokens</button>
                                        
                                    </div>
                                </div>	 
                                
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            
                                    <div className="box-part text-center">
                                        
                                        <img className="token-coin" src={require("../../../../assets/icons/coin.png")} style={{ width: "65px", height: "65px" }} />
                                        
                                        <div className="title">
                                            <h4>Purchase <strong style={{ fontWeight: "bold", fontSize: "25px", textDecoration: "underline" }}>50</strong> Tokens</h4>
                                            <hr className="my-4" />
                                            <p className="lead cash-amount">$7.50</p>
                                        </div>
                                        
                                        <div className="text">
                                            <span>Tokens are used to apply for jobs and are also used for other special tasks such as promoting job listings, re-applying to jobs denied jobs and much more...</span>
                                        </div>
                                        
                                        <button className="btn blue-btn" onClick={() => {
                                            this.setState({
                                                token_selected: 50
                                            }, () => {
                                                this.handleRedirect();
                                            })
                                        }}>Select & Purchase Tokens</button>
                                        
                                    </div>
                                </div>	 
                                
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            
                                    <div className="box-part text-center">
                                        
                                        <img className="token-coin" src={require("../../../../assets/icons/coin.png")} style={{ width: "65px", height: "65px" }} />
                                        
                                        <div className="title">
                                            <h4>Purchase <strong style={{ fontWeight: "bold", fontSize: "25px", textDecoration: "underline" }}>75</strong> Tokens</h4>
                                            <hr className="my-4" />
                                            <p className="lead cash-amount">$11.25</p>
                                        </div>
                                        
                                        <div className="text">
                                            <span>Tokens are used to apply for jobs and are also used for other special tasks such as promoting job listings, re-applying to jobs denied jobs and much more...</span>
                                        </div>
                                        
                                        <button className="btn blue-btn" onClick={() => {
                                            this.setState({
                                                token_selected: 75
                                            }, () => {
                                                this.handleRedirect();
                                            })
                                        }}>Select & Purchase Tokens</button>
                                        
                                    </div>
                                </div>	 
                                
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            
                                    <div className="box-part text-center">
                                        
                                        <img className="token-coin" src={require("../../../../assets/icons/coin.png")} style={{ width: "65px", height: "65px" }} />
                                    
                                        <div className="title">
                                            <h4>Purchase <strong style={{ fontWeight: "bold", fontSize: "25px", textDecoration: "underline" }}>100</strong> Tokens</h4>
                                            <hr className="my-4" />
                                            <p className="lead cash-amount">$15.00</p>
                                        </div>
                                        
                                        <div className="text">
                                            <span>Tokens are used to apply for jobs and are also used for other special tasks such as promoting job listings, re-applying to jobs denied jobs and much more...</span>
                                        </div>
                                        
                                        <button className="btn blue-btn" onClick={() => {
                                            this.setState({
                                                token_selected: 100
                                            }, () => {
                                                this.handleRedirect();
                                            })
                                        }}>Select & Purchase Tokens</button>
                                        
                                    </div>
                                </div>	 
                                
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            
                                    <div className="box-part text-center">
                                        
                                        <img className="token-coin" src={require("../../../../assets/icons/coin.png")} style={{ width: "65px", height: "65px" }} />
                                        
                                        <div className="title">
                                            <h4>Purchase <strong style={{ fontWeight: "bold", fontSize: "25px", textDecoration: "underline" }}>200</strong> Tokens</h4>
                                            <hr className="my-4" />
                                            <p className="lead cash-amount">$25.00</p>
                                        </div>
                                        
                                        <div className="text">
                                            <span>Tokens are used to apply for jobs and are also used for other special tasks such as promoting job listings, re-applying to jobs denied jobs and much more...</span>
                                        </div>
                                        
                                        <button className="btn blue-btn" onClick={() => {
                                            this.setState({
                                                token_selected: 200
                                            }, () => {
                                                this.handleRedirect();
                                            })
                                        }}>Select & Purchase Tokens</button>
                                        
                                    </div>
                                </div>

                        </div>	
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(PurchaseCoinsSelectionHelper);