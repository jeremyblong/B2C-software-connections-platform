import React, { Component } from 'react';
import "./style.css";

class CategoriesHelper extends Component {
    render() {
        return (
            <div>
                <div className="section margin-top-65">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">

                                <div style={{ marginTop: "100px"}} className="section-headline centered margin-bottom-15">
                                    <h3 className="text-dark">Popular Job Categories</h3>
                                </div>

                             
                                <div className="categories-container" style={{ margin: "75px 0px" }}>

                             
                                    <a href="jobs-grid-layout-full-page.html" className="category-box">
                                        <div className="category-box-icon">
                                            <i className="icon-line-awesome-file-code-o"></i>
                                        </div>
                                        <div className="category-box-counter">612</div>
                                        <div className="category-box-content">
                                            <h3>Web & Software Dev</h3>
                                            <p>Software Engineer, Web / Mobile Developer & More</p>
                                        </div>
                                    </a>

                                    <a href="jobs-list-layout-full-page-map.html" className="category-box">
                                        <div className="category-box-icon">
                                            <i className="icon-line-awesome-cloud-upload"></i>
                                        </div>
                                        <div className="category-box-counter">113</div>
                                        <div className="category-box-content">
                                            <h3>Data Science & Analitycs</h3>
                                            <p>Data Specialist / Scientist, Data Analyst & More</p>
                                        </div>
                                    </a>

                                    
                                    <a href="jobs-list-layout-full-page-map.html" className="category-box">
                                        <div className="category-box-icon">
                                            <i className="icon-line-awesome-suitcase"></i>
                                        </div>
                                        <div className="category-box-counter">186</div>
                                        <div className="category-box-content">
                                            <h3>Accounting & Consulting</h3>
                                            <p>Auditor, Accountant, Fnancial Analyst & More</p>
                                        </div>
                                    </a>

                        
                                    <a href="jobs-list-layout-1.html" className="category-box">
                                        <div className="category-box-icon">
                                            <i className="icon-line-awesome-pencil"></i>
                                        </div>
                                        <div className="category-box-counter">298</div>
                                        <div className="category-box-content">
                                            <h3>Writing & Translations</h3>
                                            <p>Copywriter, Creative Writer, Translator & More</p>
                                        </div>
                                    </a>

                                
                                    <a href="jobs-list-layout-2.html" className="category-box">
                                        <div className="category-box-icon">
                                            <i className="icon-line-awesome-pie-chart"></i>
                                        </div>
                                        <div className="category-box-counter">549</div>						
                                        <div className="category-box-content">
                                            <h3>Sales & Marketing</h3>
                                            <p>Brand Manager, Marketing Coordinator & More</p>
                                        </div>
                                    </a>

                           
                                    <a href="jobs-list-layout-1.html" className="category-box">
                                        <div className="category-box-icon">
                                            <i className="icon-line-awesome-image"></i>
                                        </div>
                                        <div className="category-box-counter">873</div>
                                        <div className="category-box-content">
                                            <h3>Graphics & Design</h3>
                                            <p>Creative Director, Web Designer & More</p>
                                        </div>
                                    </a>

                               
                                    <a href="jobs-list-layout-2.html" className="category-box">
                                        <div className="category-box-icon">
                                            <i className="icon-line-awesome-bullhorn"></i>
                                        </div>
                                        <div className="category-box-counter">125</div>
                                        <div className="category-box-content">
                                            <h3>Digital Marketing</h3>
                                            <p>Darketing Analyst, Social Profile Admin & More</p>
                                        </div>
                                    </a>

                              
                                    <a href="jobs-grid-layout-full-page.html" className="category-box">
                                        <div className="category-box-icon">
                                            <i className="icon-line-awesome-graduation-cap"></i>
                                        </div>
                                        <div className="category-box-counter">445</div>
                                        <div className="category-box-content">
                                            <h3>Education & Training</h3>
                                            <p>Advisor, Coach, Education Coordinator & More</p>
                                        </div>
                                    </a>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CategoriesHelper;