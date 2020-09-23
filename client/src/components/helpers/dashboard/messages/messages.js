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
import { Chat, Channel, ChannelHeader, Thread, Window, ChannelList } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import { connect } from "react-redux";
import axios from "axios";

const chatClient = new StreamChat('52zfrbfbqu6r');

const sort = { last_message_at: -1 };

class MessagesHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        isOpen: false,
        user: null,
        loaded: false,
        channel: null,
        filters: null
    }
}
    componentDidMount() {
        setTimeout(() => {

            console.log(this.props);

            this.setState({
                filters: { type: 'messaging', members: { $in: [this.props.username] } }
            }, () => {
                axios.post("/gather/specific/user/username", {
                    username: this.props.username
                }).then((res) => {
                    if (res.data.message === "Found Specific User!") {
                        console.log(res.data);

                        chatClient.setUser(
                            {
                                id: this.props.username,
                                name: this.props.username,
                                image: `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${res.data.user.profilePics[res.data.user.profilePics.length - 1].picture}`
                            },
                            this.props.getStreamToken,
                        );
    
                        this.setState({
                            loaded: true
                        })
        
                    }
                }).catch((err) => {
                    console.log(err);
                })
            })
        }, 500);
    }
    render() {
        console.log("fest state... :", this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
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

                                    {this.state.loaded === true ? <Chat client={chatClient} theme={'messaging light'}>
                                        <ChannelList
                                        filters={this.state.filters}
                                        sort={sort}
                                        />
                                        <Channel>
                                        <Window>
                                            <ChannelHeader />
                                            <MessageList />
                                            <MessageInput />
                                        </Window>
                                        <Thread />
                                        </Channel>
                                    </Chat> : null}

                                       
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
const mapStateToProps = state => {
    for (const key in state.auth) {
        const obj = state.auth;
        if (obj.authenticated.hasOwnProperty("email")) {
            return {
                username: state.auth.authenticated.username,
                getStreamToken: state.getStreamInfo.getStreamToken
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, {  })(MessagesHelper));