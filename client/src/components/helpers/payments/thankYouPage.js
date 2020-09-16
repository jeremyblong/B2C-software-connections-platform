import React, { Fragment } from "react";

const ThankYouHelper = (props) => {
    return (
        <Fragment>
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div class="clearfix"></div>

                <div id="titlebar" class="gradient">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">

                                <h2>Thank You!</h2>

                            
                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li>Thank you for your payment!</li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="container">

                    <div class="row">
                        <div class="col-xl-12">

                            <section id="not-found" class="center margin-top-50 margin-bottom-25">
                                <h2 style={{ color: "blue" }}>Thanks!</h2>
                                <p style={{fontWeight: "bold" }}>Your account has now been upgraded to the appropriate purchased plan and your payment was SUCCESSFUL...</p>
                            </section>

                            <div class="row">
                                <div class="col-xl-8 offset-xl-2">
                                        <div class="intro-banner-search-form not-found-search margin-bottom-50">
                                        
                                            <div class="intro-search-field ">
                                                <input id="intro-keywords" type="text" placeholder="What Are You Looking For?"/>
                                            </div>

                                        
                                            <div class="intro-search-button">
                                                <button class="button ripple-effect">Search</button>
                                            </div>
                                        </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="margin-top-70"></div>
            </div>
        </Fragment>
    );
}
export default ThankYouHelper;