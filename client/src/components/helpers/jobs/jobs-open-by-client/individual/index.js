import React, { Component, Fragment } from 'react';
import axios from "axios";
import "./style.css";


class IndividualFreelancerProfileHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        user: null
    }
}
    componentDidMount() {
        axios.post("/gather/user/by/id", {
            unique_id: this.props.user.unique_id || this.props.id
        }).then((res) => {
            if (res.data.message === "FOUND user!") {
                console.log("Found data ! :", res.data);
                
                this.setState({
                    user: res.data.user
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderContent = () => {
        const { user } = this.state;

        if (user !== null) {
            return (
                <Fragment>
                    <div style={{  
                        backgroundImage: user.coverPhoto ? `url(https://s3.us-west-1.wasabisys.com/software-gateway-platform/${user.coverPhoto.picture})` : null,
                        backgroundColor: user.coverPhoto ? "transparent" : "darkblue",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        minHeight: "450px",
                        borderTop: "3px solid lightgrey"
                    }} className="single-page-header freelancer-header">
                        <div className="container give-background">
                        
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="single-page-header-inner">
                                        <div className="left-side">
                                            <div className="header-image freelancer-avatar"><img src={user.profilePics.length !== 0 ? `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${user.profilePics[user.profilePics.length - 1].picture}` : "/images/user-avatar-big-02.jpg"} alt=""/></div>
                                            <div className="header-details">
                                                <h3 style={{ color: "tan" }}>{user.username} <span style={{ color: "white" }}>{user.freelancerData.main_service_offered}</span></h3>
                                                <ul>
                                                    <li><div className="star-rating" data-rating="5.0"></div></li>
                                                    <li><img className="flag" src="images/flags/de.svg" alt=""/>{user.freelancerData.location.country}</li>
                                                    <li><div className="verified-badge-with-title">Verified</div></li>
                                                    <hr className="my-4" />
                                                    <li><strong style={{ color: "tan" }}>Estimated</strong> Skill Level (BY USER): <strong style={{ color: "tan" }}>{user.freelancerData.expertiseLevel}</strong></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                  
                    <div className="container">
                        <div className="row">
                       
                         
                            <div className="col-xl-8 col-lg-8 content-right-offset">
                            
                           
                                <div className="single-page-section">
                                    <h3 className="margin-bottom-25">About Me</h3>
                                    <p>{user.introduction ? user.introduction : "No introduction/bio provided..."}</p>
                                </div>

                                <div className="boxed-list margin-bottom-60">
                                    <div className="boxed-list-headline">
                                        <h3 className="text-white"><i className="icon-material-outline-thumb-up"></i> Work History and Feedback</h3>
                                    </div>
                                    <ul className="boxed-list-ul">
                                        <li>
                                            <div className="boxed-list-item">
                                            
                                                <div className="item-content">
                                                    <h4>Web, Database and API Developer <span>Rated as Freelancer</span></h4>
                                                    <div className="item-details margin-top-10">
                                                        <div className="star-rating" data-rating="5.0"></div>
                                                        <div className="detail-item"><i className="icon-material-outline-date-range"></i> August 2019</div>
                                                    </div>
                                                    <div className="item-description">
                                                        <p>Excellent programmer - fully carried out my project in a very professional manner. </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="boxed-list-item">
                                             
                                                <div className="item-content">
                                                    <h4>WordPress Theme Installation <span>Rated as Freelancer</span></h4>
                                                    <div className="item-details margin-top-10">
                                                        <div className="star-rating" data-rating="5.0"></div>
                                                        <div className="detail-item"><i className="icon-material-outline-date-range"></i> June 2019</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="boxed-list-item">
                                               
                                                <div className="item-content">
                                                    <h4>Fix Python Selenium Code <span>Rated as Employer</span></h4>
                                                    <div className="item-details margin-top-10">
                                                        <div className="star-rating" data-rating="5.0"></div>
                                                        <div className="detail-item"><i className="icon-material-outline-date-range"></i> May 2019</div>
                                                    </div>
                                                    <div className="item-description">
                                                        <p>I was extremely impressed with the quality of work AND how quickly he got it done. He then offered to help with another side part of the project that we didn't even think about originally.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="boxed-list-item">
                                            
                                                <div className="item-content">
                                                    <h4>PHP Core Website Fixes <span>Rated as Freelancer</span></h4>
                                                    <div className="item-details margin-top-10">
                                                        <div className="star-rating" data-rating="5.0"></div>
                                                        <div className="detail-item"><i className="icon-material-outline-date-range"></i> May 2019</div>
                                                    </div>
                                                    <div className="item-description">
                                                        <p>Awesome work, definitely will rehire. Poject was completed not only with the requirements, but on time, within our small budget.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="clearfix"></div>
                                    <div className="pagination-container margin-top-40 margin-bottom-10">
                                        <nav className="pagination">
                                            <ul>
                                                <li><a href="#" className="ripple-effect current-page">1</a></li>
                                                <li><a href="#" className="ripple-effect">2</a></li>
                                                <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="clearfix"></div>
                                  

                                </div>
                             
                                
                           
                                <div className="boxed-list margin-bottom-60">
                                    <div className="boxed-list-headline">
                                        <h3 style={{ color: "white" }}><i className="icon-material-outline-business"></i> Employment History</h3>
                                    </div>
                                    <ul className="boxed-list-ul">
                                        {typeof user.freelancerData.employment_history !== "undefined" && user.freelancerData.employment_history.length !== 0 ? user.freelancerData.employment_history.map((item, index) => {
                                            console.log("employment job.... :", item);
                                            return (
                                                <li key={index}>
                                                    <div className="boxed-list-item">
                                                    
                                                        <div className="item-image">
                                                            <img src="/images/browse-companies-03.png" alt=""/>
                                                        </div>
                                                        
                                                    
                                                        <div className="item-content">
                                                            <h4>{item.technical_title}</h4>
                                                            <div className="item-details margin-top-7">
                                                                <div className="detail-item"><a href="#"><i className="icon-material-outline-business"></i> {item.company_name}</a></div>
                                                                <div className="detail-item"><i className="icon-material-outline-date-range"></i> {item.employment_start_date} - {item.currently_employed === true ? "PRESENT" : item.employment_end_date}</div>
                                                            </div>
                                                            <div className="item-description">
                                                                <p>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }) : <Fragment><div><h3 style={{ marginTop: "25px", fontWeight: "bold" }} className="text-center">This user has not listed any previous employment yet, they need to update their profile. Consider finding someone with a more complete profile.</h3></div></Fragment>}
                                        {/* <li>
                                            <div className="boxed-list-item">
                                         
                                                <div className="item-image">
                                                    <img src="images/browse-companies-04.png" alt=""/>
                                                </div>
                                           
                                                <div className="item-content">
                                                    <h4><a href="#">Lead UX/UI Designer</a></h4>
                                                    <div className="item-details margin-top-7">
                                                        <div className="detail-item"><a href="#"><i className="icon-material-outline-business"></i> Acorta</a></div>
                                                        <div className="detail-item"><i className="icon-material-outline-date-range"></i> April 2014 - May 2019</div>
                                                    </div>
                                                    <div className="item-description">
                                                        <p>I designed and implemented 10+ custom web-based CRMs, workflow systems, payment solutions and mobile apps.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                               

                            </div>
                            

                      
                            <div className="col-xl-4 col-lg-4">
                                <div className="sidebar-container">
                                    
                                 
                                    <div className="profile-overview">
                                        <div className="overview-item"><strong>{user.hourlyRate} {user.hourlyCurrency}</strong><span>Hourly Rate</span></div>
                                        <div className="overview-item"><strong>53</strong><span>Jobs Done</span></div>
                                        <div className="overview-item"><strong>22</strong><span>Rehired</span></div>
                                    </div>

                               
                                    <a href="#small-dialog" className="apply-now-button popup-with-zoom-anim margin-bottom-50">Make an Offer <i className="icon-material-outline-arrow-right-alt"></i></a>

                               
                                    <div className="sidebar-widget">
                                        <div className="freelancer-indicators">

                                            
                                            <div className="indicator">
                                                <strong>88%</strong>
                                                <div className="indicator-bar" data-indicator-percentage="88"><span></span></div>
                                                <span>Job Success</span>
                                            </div>

                                          
                                            <div className="indicator">
                                                <strong>100%</strong>
                                                <div className="indicator-bar" data-indicator-percentage="100"><span></span></div>
                                                <span>Recommendation</span>
                                            </div>
                                            
                                        
                                            <div className="indicator">
                                                <strong>90%</strong>
                                                <div className="indicator-bar" data-indicator-percentage="90"><span></span></div>
                                                <span>On Time</span>
                                            </div>	
                                           
                                            <div className="indicator">
                                                <strong>80%</strong>
                                                <div className="indicator-bar" data-indicator-percentage="80"><span></span></div>
                                                <span>On Budget</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                   
                                    <div className="sidebar-widget">
                                        <h3>Social Profiles</h3>
                                        <div className="freelancer-socials margin-top-25">
                                            <ul>
                                                <li><a href="#" title="Dribbble" data-tippy-placement="top"><i className="icon-brand-dribbble"></i></a></li>
                                                <li><a href="#" title="Twitter" data-tippy-placement="top"><i className="icon-brand-twitter"></i></a></li>
                                                <li><a href="#" title="Behance" data-tippy-placement="top"><i className="icon-brand-behance"></i></a></li>
                                                <li><a href="#" title="GitHub" data-tippy-placement="top"><i className="icon-brand-github"></i></a></li>
                                            
                                            </ul>
                                        </div>
                                    </div>

                                   
                                    <div className="sidebar-widget">
                                        <h3>Skills</h3>
                                        <div className="task-tags">
                                            {user.freelancerData.skills.length !== 0 ? user.freelancerData.skills.map((skill, index) => {
                                                return <span key={index}>{skill.text}</span>
                                            }) : null}
                                        </div>
                                    </div>

                                   
                                    <div className="sidebar-widget">
                                        <h3>Attachments</h3>
                                        <div className="attachments-container">
                                            <a href="#" className="attachment-box ripple-effect"><span>Cover Letter</span><i>PDF</i></a>
                                            <a href="#" className="attachment-box ripple-effect"><span>Contract</span><i>DOCX</i></a>
                                        </div>
                                    </div>

                                    <div className="sidebar-widget">
                                        <h3>Bookmark or Share</h3>

                                   
                                        <button className="bookmark-button margin-bottom-25">
                                            <span className="bookmark-icon"></span>
                                            <span className="bookmark-text">Bookmark</span>
                                            <span className="bookmarked-text">Bookmarked</span>
                                        </button>

                                      
                                        <div className="copy-url">
                                            <input id="copy-url" type="text" value="" className="with-border"/>
                                            <button className="copy-url-button ripple-effect" data-clipboard-target="#copy-url" title="Copy to Clipboard" data-tippy-placement="top"><i className="icon-material-outline-file-copy"></i></button>
                                        </div>

                                       
                                        <div className="share-buttons margin-top-25">
                                            <div className="share-buttons-trigger"><i className="icon-feather-share-2"></i></div>
                                            <div className="share-buttons-content">
                                                <span>Interesting? <strong>Share It!</strong></span>
                                                <ul className="share-buttons-icons">
                                                    <li><a href="#" data-button-color="#3b5998" title="Share on Facebook" data-tippy-placement="top"><i className="icon-brand-facebook-f"></i></a></li>
                                                    <li><a href="#" data-button-color="#1da1f2" title="Share on Twitter" data-tippy-placement="top"><i className="icon-brand-twitter"></i></a></li>
                                                    <li><a href="#" data-button-color="#dd4b39" title="Share on Google Plus" data-tippy-placement="top"><i className="icon-brand-google-plus-g"></i></a></li>
                                                    <li><a href="#" data-button-color="#0077b5" title="Share on LinkedIn" data-tippy-placement="top"><i className="icon-brand-linkedin-in"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>


             
                    <div className="margin-top-15"></div>
                </Fragment>
            );
        } else {
            return null;
        }
    }
    render() {
        console.log("PROPIES :", this.props);

        const { user } = this.state;
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}
export default IndividualFreelancerProfileHelper;