import React from "react";
import ContactPage from "../../pages/contact/contact";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import "./style.css";

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiamVyZW15YWJsb25nIiwiYSI6ImNrNzIzemZ6cDA3Mm8zbWxncW5pZDkzeDkifQ.jeLgR1gLLJsaeyfjBUqrdw'
});
const ContactHelper = props => {
    return (
        <div style={{ borderTop: "3px solid lightgrey" }}>
            <div className="container">
                <div className="row" style={{ marginTop: "50px" }}>

                    <div className="col-xl-12">
                        <div className="contact-location-info margin-bottom-50">
                            <div className="contact-address">
                                <ul>
                                    <li className="contact-address-headline">Our Office</li>
                                    <li>425 Berry Street, CA 93584</li>
                                    <li>Phone (123) 123-456</li>
                                    <li><a href="#">mail@example.com</a></li>
                                    <li>
                                        <div className="freelancer-socials">
                                            <ul>
                                                <li><a href="#" title="Dribbble" data-tippy-placement="top"><i className="icon-brand-dribbble"></i></a></li>
                                                <li><a href="#" title="Twitter" data-tippy-placement="top"><i className="icon-brand-twitter"></i></a></li>
                                                <li><a href="#" title="Behance" data-tippy-placement="top"><i className="icon-brand-behance"></i></a></li>
                                                <li><a href="#" title="GitHub" data-tippy-placement="top"><i className="icon-brand-github"></i></a></li>
                                            
                                            </ul>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                            <div id="single-job-map-container">
                            <Map
                                style="mapbox://styles/mapbox/streets-v9"
                                containerStyle={{
                                    height: '100%',
                                    width: '100%'
                                }}
                                >
                                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                                </Layer>
                            </Map>
                                <a href="#" id="streetView">Street View</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2">

                        <section id="contact" className="margin-bottom-60">
                            <h3 className="headline margin-top-15 margin-bottom-35">Any questions? Feel free to contact us!</h3>

                            <form name="contactform" id="contactform" autocomplete="on">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-with-icon-left">
                                            <input className="with-border" name="name" type="text" id="name" placeholder="Your Name" required="required" />
                                            <i className="icon-material-outline-account-circle"></i>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-with-icon-left">
                                            <input className="with-border" name="email" type="email" id="email" placeholder="Email Address" pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$" required="required" />
                                            <i className="icon-material-outline-email"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-with-icon-left">
                                    <input className="with-border" name="subject" type="text" id="subject" placeholder="Subject" required="required" />
                                    <i className="icon-material-outline-assignment"></i>
                                </div>

                                <div>
                                    <textarea className="with-border" name="comments" cols="40" rows="5" id="comments" placeholder="Message" spellcheck="true" required="required"></textarea>
                                </div>

                                <input type="submit" className="submit button blue-btn margin-top-15" id="submit" value="Submit Message" />

                            </form>
                        </section>

                    </div>

                </div>
            </div>
        </div>
    );
}
export default ContactHelper;