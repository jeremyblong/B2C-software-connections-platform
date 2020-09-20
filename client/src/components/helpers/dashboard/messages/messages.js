import React, { Component, Fragment } from 'react';
import "./style.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";


class MessagesHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        isOpen: false,
        user: null
    }
}

    render() {
        return (
            <div>
                <div class="dashboard-container">

                    <div class="dashboard-sidebar">
                        <div class="dashboard-sidebar-inner" data-simplebar>
                            <div class="dashboard-nav-container">
                                <div className="hide-mobile-please">
                                    <a href="#" class="dashboard-responsive-nav-trigger blue-btn">
                                        <span class="hamburger hamburger--collapse" >
                                            <span class="hamburger-box">
                                                <span class="hamburger-inner"></span>
                                            </span>
                                        </span>
                                        <span class="trigger-title">Dashboard Navigation</span>
                                    </a>
                                    <div class="dashboard-nav">
                                        <div class="dashboard-nav-inner">

                                            <ul data-submenu-title="Start">
                                                <li><Link to="/dashboard"><i class="icon-material-outline-dashboard"></i> Dashboard</Link></li>
                                                <li class="active"><a style={{ color: "white" }} href="dashboard-messages.html"><i class="icon-material-outline-question-answer"></i> Messages <span class="nav-tag">2</span></a></li>
                                                <li><a href="dashboard-bookmarks.html"><i class="icon-material-outline-star-border"></i> Bookmarks</a></li>
                                                <li><a href="dashboard-reviews.html"><i class="icon-material-outline-rate-review"></i> Reviews</a></li>
                                                <li><Link to="/bids/active"><i class="icon-material-outline-dashboard"></i> Active Bids</Link></li>
                                            </ul>
                                            
                                            <ul data-submenu-title="Organize and Manage">
                                                <li><a href="#"><i class="icon-material-outline-business-center"></i> Jobs</a>
                                                    <ul>
                                                        <li><a href="dashboard-manage-jobs.html">Manage Jobs <span class="nav-tag">3</span></a></li>
                                                        <li><a href="dashboard-manage-candidates.html">Manage Candidates</a></li>
                                                        <li><a href="dashboard-post-a-job.html">Post a Job</a></li>
                                                    </ul>	
                                                </li>
                                                <li><a href="#"><i class="icon-material-outline-assignment"></i> Tasks</a>
                                                    <ul>
                                                        <li><a href="dashboard-manage-tasks.html">Manage Tasks <span class="nav-tag">2</span></a></li>
                                                        <li><a href="dashboard-manage-bidders.html">Manage Bidders</a></li>
                                                        <li><a href="dashboard-my-active-bids.html">My Active Bids <span class="nav-tag">4</span></a></li>
                                                        <li><a href="dashboard-post-a-task.html">Post a Task</a></li>
                                                    </ul>	
                                                </li>
                                            </ul>

                                            <ul data-submenu-title="Account">
                                                <li><Link to="/dashboard/settings/main"><i class="icon-material-outline-settings"></i> Settings</Link></li>
                                                <li><a onClick={() => {
                                                    this.props.authentication({});

                                                    localStorage.clear();

                                                    setTimeout(() => {
                                                        this.props.history.push("/");
                                                    }, 500)
                                                }}><i class="icon-material-outline-power-settings-new"></i> Logout</a></li>
                                            </ul>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="dashboard-sidebar reactstrap-navbar">
                                    <div class="dashboard-sidebar-inner" data-simplebar>
                                        <div class="dashboard-nav-container" style={{ width: "100%" }}>
                                            <Navbar color="light" light expand="md">
                                            <NavbarToggler onClick={this.toggle} >
                                                <a href="#" class="dashboard-responsive-nav-trigger blue-btn">
                                                    <span class="hamburger hamburger--collapse" >
                                                        <span class="hamburger-box">
                                                            <span class="hamburger-inner"></span>
                                                        </span>
                                                    </span>
                                                    <span class="trigger-title">Dashboard Navigation</span>
                                                </a>
                                            </NavbarToggler>
                                            <Collapse isOpen={this.state.isOpen} navbar>
                                            <Nav className="mr-auto" navbar>
                                                <NavItem>
                                                <NavLink href="/components/">Components</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                                </NavItem>
                                                <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret>
                                                    Options
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem>
                                                    Option 1
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                    Option 2
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem>
                                                    Reset
                                                    </DropdownItem>
                                                </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Nav>
                                            <NavbarText>Simple Text</NavbarText>
                                            </Collapse>
                                        </Navbar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                        <div class="dashboard-content-container" data-simplebar>
                            <div class="dashboard-content-inner" >
                                
                 
                                <div class="dashboard-headline">
                                    <h3>Messages</h3>

                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">Dashboard</a></li>
                                            <li>Messages</li>
                                        </ul>
                                    </nav>
                                </div>

                                    <div class="messages-container margin-top-0">

                                        <div class="messages-container-inner">

                                   
                                            <div class="messages-inbox">
                                                <div class="messages-headline">
                                                    <div class="input-with-icon">
                                                            <input id="autocomplete-input" type="text" placeholder="Search"/>
                                                        <i class="icon-material-outline-search"></i>
                                                    </div>
                                                </div>

                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <div class="message-avatar"><i class="status-icon status-online"></i><img src="/images/user-avatar-small-03.jpg" alt="" /></div>

                                                            <div class="message-by">
                                                                <div class="message-by-headline">
                                                                    <h5>David Peterson</h5>
                                                                    <span>4 hours ago</span>
                                                                </div>
                                                                <p>Thanks for reaching out. I'm quite busy right now on many</p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li class="active-message">
                                                        <a href="#">
                                                            <div class="message-avatar"><i class="status-icon status-offline"></i><img src="/images/user-avatar-small-02.jpg" alt="" /></div>

                                                            <div class="message-by">
                                                                <div class="message-by-headline">
                                                                    <h5>Sindy Forest</h5>
                                                                    <span>Yesterday</span>
                                                                </div>
                                                                <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    
                                                    <li>
                                                        <a href="#">
                                                            <div class="message-avatar"><i class="status-icon status-offline"></i><img src="/images/user-avatar-placeholder.png" alt="" /></div>

                                                            <div class="message-by">
                                                                <div class="message-by-headline">
                                                                    <h5>Sebastiano Piccio</h5>
                                                                    <span>2 days ago</span>
                                                                </div>
                                                                <p>Hello, I want to talk about my project if you don't mind!</p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="#">
                                                            <div class="message-avatar"><i class="status-icon status-online"></i><img src="/images/user-avatar-placeholder.png" alt="" /></div>

                                                            <div class="message-by">
                                                                <div class="message-by-headline">
                                                                    <h5>Marcin Kowalski</h5>
                                                                    <span>2 days ago</span>
                                                                </div>
                                                                <p>Yes, I received payment. Thanks for cooperation!</p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </div>
                                  
                                            <div class="message-content">

                                                <div class="messages-headline">
                                                    <h4>Sindy Forest</h4>
                                                    <a href="#" class="message-action"><i class="icon-feather-trash-2"></i> Delete Conversation</a>
                                                </div>
                                        
                                                <div class="message-content-inner">
                                                        
                                                      
                                                        <div class="message-time-sign">
                                                            <span>28 June, 2019</span>
                                                        </div>

                                                        <div class="message-bubble me">
                                                            <div class="message-bubble-inner">
                                                                <div class="message-avatar"><img src="/images/user-avatar-small-01.jpg" alt="" /></div>
                                                                <div class="message-text"><p>Thanks for choosing my offer. I will start working on your project tomorrow.</p></div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>

                                                        <div class="message-bubble">
                                                            <div class="message-bubble-inner">
                                                                <div class="message-avatar"><img src="/images/user-avatar-small-02.jpg" alt="" /></div>
                                                                <div class="message-text"><p>Great. If you need any further clarification let me know. 👍</p></div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>

                                                        <div class="message-bubble me">
                                                            <div class="message-bubble-inner">
                                                                <div class="message-avatar"><img src="/images/user-avatar-small-01.jpg" alt="" /></div>
                                                                <div class="message-text"><p>Ok, I will. 😉</p></div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>

                                                    
                                                        <div class="message-time-sign">
                                                            <span>Yesterday</span>
                                                        </div>

                                                        <div class="message-bubble me">
                                                            <div class="message-bubble-inner">
                                                                <div class="message-avatar"><img src="/images/user-avatar-small-01.jpg" alt="" /></div>
                                                                <div class="message-text"><p>Hi Sindy, I just wanted to let you know that project is finished and I'm waiting for your approval.</p></div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>

                                                        <div class="message-bubble">
                                                            <div class="message-bubble-inner">
                                                                <div class="message-avatar"><img src="/images/user-avatar-small-02.jpg" alt="" /></div>
                                                                <div class="message-text"><p>Hi Tom! Hate to break it to you, but I'm actually on vacation 🌴 until Sunday so I can't check it now. 😎</p></div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>

                                                        <div class="message-bubble me">
                                                            <div class="message-bubble-inner">
                                                                <div class="message-avatar"><img src="/images/user-avatar-small-01.jpg" alt="" /></div>
                                                                <div class="message-text"><p>Ok, no problem. But don't forget about last payment. 🙂</p></div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>

                                                        <div class="message-bubble">
                                                            <div class="message-bubble-inner">
                                                                <div class="message-avatar"><img src="/images/user-avatar-small-02.jpg" alt="" /></div>
                                                                <div class="message-text">
                                                                 
                                                                    <div class="typing-indicator">
                                                                        <span></span>
                                                                        <span></span>
                                                                        <span></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                </div>
                                                
                                               
                                                <div class="message-reply">
                                                    <textarea cols="1" rows="1" placeholder="Your Message" data-autoresize></textarea>
                                                    <button class="button ripple-effect">Send</button>
                                                </div>

                                            </div>
                              

                                        </div>
                                </div>
                             


                                
                                
                                <div class="dashboard-footer-spacer"></div>
                                <div class="small-footer margin-top-15">
                                    <div class="small-footer-copyrights">
                                        © 2019 <strong>[Company Name(s)]</strong>. All Rights Reserved.
                                    </div>
                                    <ul class="footer-social-links">
                                        <li>
                                            <a href="#" title="Facebook" data-tippy-placement="top">
                                                <i class="icon-brand-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Twitter" data-tippy-placement="top">
                                                <i class="icon-brand-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Google Plus" data-tippy-placement="top">
                                                <i class="icon-brand-google-plus-g"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="LinkedIn" data-tippy-placement="top">
                                                <i class="icon-brand-linkedin-in"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                           

                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default MessagesHelper;