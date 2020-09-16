import React, { Component } from 'react';
import "./style.css";
import { Link } from "react-router-dom";

class MembershipPlans extends Component {
    render() {
        return (
            <div>
                <div className="section padding-top-60 padding-bottom-75">
                    <div className="container">
                        <div className="row">

                            <div className="col-xl-12">
                                <div className="section-headline centered margin-top-0 margin-bottom-35">
                                    <h3>Membership Plans</h3>
                                </div>
                            </div>


                            <div className="col-xl-12">
                                <div className="billing-cycle-radios margin-bottom-70">
                                    <div className="radio billed-monthly-radio">
                                        <input id="radio-5" name="radio-payment-type" type="radio" checked />
                                        <label for="radio-5"><span className="radio-label"></span> Billed Monthly</label>
                                    </div>

                                    <div className="radio billed-yearly-radio">
                                        <input id="radio-6" name="radio-payment-type" type="radio"/>
                                        <label for="radio-6"><span className="radio-label"></span> Billed Yearly <span className="small-label">Save 10%</span></label>
                                    </div>
                                </div>
                                <div className="pricing-plans-container">
                                    <div className="pricing-plan">
                                        <h3>Basic Plan</h3>
                                        <p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
                                        <div className="pricing-plan-label billed-monthly-label"><strong>$19</strong>/ monthly</div>
                                        <div className="pricing-plan-label billed-yearly-label"><strong>$199.99</strong>/ yearly</div>
                                        <div className="pricing-plan-features">
                                            <strong>Features of Basic Plan</strong>
                                            <ul>
                                                <li>1 Listing</li>
                                                <li>30 Days Visibility</li>
                                                <li>Highlighted in Search Results</li>
                                            </ul>
                                        </div>
                                        <Link  to={{ pathname: "/payment/create/membership", query: { monthly: 19.99, yearly: 199.99 }}} className="button full-width margin-top-20">Buy Now</Link>
                                    </div>
                                    <div className="pricing-plan recommended">
                                        <div className="recommended-badge">Recommended</div>
                                        <h3>Standard Plan</h3>
                                        <p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
                                        <div className="pricing-plan-label billed-monthly-label"><strong>$29.99</strong>/ monthly</div>
                                        <div className="pricing-plan-label billed-yearly-label"><strong>$309.99</strong>/ yearly</div>
                                        <div className="pricing-plan-features">
                                            <strong>Features of Standard Plan</strong>
                                            <ul>
                                                <li>5 Listings</li>
                                                <li>60 Days Visibility</li>
                                                <li>Highlighted in Search Results</li>
                                            </ul>
                                        </div>
                                        <Link to={{ pathname: "/payment/create/membership", query: { monthly: 29.99, yearly: 309.99 }}} className="button full-width special-btn margin-top-20">Buy Now</Link>
                                    </div>
                                    <div className="pricing-plan">
                                        <h3>Extended Plan</h3>
                                        <p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
                                        <div className="pricing-plan-label billed-monthly-label"><strong>$49.99</strong>/ monthly</div>
                                        <div className="pricing-plan-label billed-yearly-label"><strong>$524.99</strong>/ yearly</div>
                                        <div className="pricing-plan-features">
                                            <strong>Features of Extended Plan</strong>
                                            <ul>
                                                <li>Unlimited Listings Listing</li>
                                                <li>90 Days Visibility</li>
                                                <li>Highlighted in Search Results</li>
                                            </ul>
                                        </div>
                                        <Link to={{ pathname: "/payment/create/membership", query: { monthly: 49.99, yearly: 524.99 }}} className="button full-width margin-top-20">Buy Now</Link>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MembershipPlans;