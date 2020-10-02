import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import "./style.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { connect } from "react-redux";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
const OT = require('@opentok/client');

class VideoCallingHomeDashHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        open: false,
        meeting_name: "",
        active_jobs: [],
        selected_user: null,
        user: null,
        sessionID: null,
        other_selected_user: null,
        session: null,
        authenticated_token: null,
        show: false,
        stream: null
    }
    this.publisherProperties = {
        audioFallbackEnabled: false,
        showControls: false
    };
    this.publisherEventHandlers = {
        streamCreated: event => {
          console.log('Publisher stream created!', event);

          this.setState({
                stream: event.stream
          }, () => {
                this.state.session.subscribe(event.stream);
                
                // axios.post("/send/stream/recieving/user", {
                //     stream: event.stream,
                //     username: this.state.other_selected_user.username
                // }).then((res) => {
                //     console.log(res.data);
                // }).catch((err) => {
                //     console.log(err);
                // })
          })
        },
        streamDestroyed: event => {
          console.log('Publisher stream destroyed!', event);
        }
    };
}

    componentDidMount() {
        
        axios.post("/gather/active/jobs", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Successfully located user and found active jobs!") {
                console.log("Successfully located user and found active jobs!", res.data);

                this.setState({
                    active_jobs: res.data.active_jobs,
                    user: res.data.user,
                    authenticated_token: res.data.user.opentok_data.token,
                    sessionID: res.data.user.opentok_data.sessionId,
                    session: OT.initSession("46936994", res.data.user.opentok_data.sessionId)
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
 
    onCloseModal = () => {
        this.setState({ open: false });
    };
    handleVideoStart = () => {
        console.log("start video...");

        const { meeting_name } = this.state;

        axios.post("/create/video/room", {
            meeting_name,
            username: this.props.username
        }).then((response) => {
            console.log(response.data);

            if (response.data) {
                console.log(response.data);
            };
        }).catch((err) => {
            console.log(err);
        })
    }
    handleSelection = (active) => {

        for (let index = 0; index < active.contract_between.length; index++) {
            const user = active.contract_between[index];
            if (user !== this.props.username) {
                console.log(user);

                axios.post("/gather/specific/user/username", {
                    username: user
                }).then((resolution) => {
                    if (resolution.data.message === "Found Specific User!") {
                        console.log(resolution.data);

                        this.setState({
                            other_selected_user: resolution.data.user,
                            selected_user: active,
                            show: true
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }
    joinStream = () => {
        console.log("join stream...");

        // this.state.session.disconnect();

        this.setState({
            session: OT.initSession("46936994", this.state.other_selected_user.opentok_data.sessionId)
        }, () => {
            this.state.session.connect(this.state.other_selected_user.opentok_data.token, (error) => {
                if (error) {
                  console.log("Error connecting: ", error.name, error.message);
                } else {
                  console.log("Connected to the session !!!");

                    let publisher;
                    let targetElement = 'publisherContainer';

                    publisher = OT.initPublisher(targetElement, null, (error) => {
                        if (error) {
                            console.log("Errrrrrrr :", error);
                            // The client cannot publish.
                            // You may want to notify the user.
                        } else {
                            console.log('Publisher initialized.');
                        }
                    });

                    this.state.session.publish(publisher, function(error) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Publishing a stream.');
                        }
                    });
                }
            });
        })
    }
    renderVideoStreams = () => {
        if (this.state.user !== null && this.state.show === true) {
            return (
                <Fragment>
                    {/* <div className="row">
                        <button onClick={this.joinStream} className="btn red-btn" style={{ width: "100%", color: "white", margin: "30px 20px" }}>JOIN STREAM/VIDEO</button>
                    </div> */}
                        <OTSession apiKey="46936994" sessionId={this.state.sessionID} token={this.state.user.opentok_data.token}>
                            <OTPublisher properties={this.publisherProperties} eventHandlers={this.publisherEventHandlers} />
                            <OTStreams>
                                <OTSubscriber />
                            </OTStreams>
                        </OTSession>       
                </Fragment>
            );
        }
    }
    joinStreamFromDatabase = () => {
        console.log("clicked joinStreamFromDatabase");

        this.state.session.subscribe(this.state.user.active_streams_invited);
    }
    render() {
        const { open, active_jobs } = this.state;

        console.log("home-dash state ---- :", this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div className="dashboard-content-container" data-simplebar>
                    <div className="dashboard-content-inner" >
                        
                      
                        <div className="dashboard-headline">
                            <h3>Video Communication Dashboard</h3>
                            <p style={{ marginTop: "100px" }} className="lead">This page is <strong>strictly</strong> for video calling (both auditory and video) - If you need to message one of these users please go to the messaging page of your dashboard...</p>
                           
                            <nav style={{ marginTop: "-60px" }} id="breadcrumbs" className="dark">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Dashboard</a></li>
                                    <li>Video Communication</li>
                                </ul>
                            </nav>
                            <div className="row">
                                <button onClick={this.joinStreamFromDatabase} className="btn red-btn" style={{ width: "100%", color: "white", margin: "30px 20px" }}>ACTIVATE</button>
                            </div>
                            
                        </div>
                
                            <div className="messages-container margin-top-0">

                                <div className="messages-container-inner">

                         
                                    <div className="messages-inbox">
                                        <div className="messages-headline">
                                            <div className="input-with-icon">
                                                    <input id="autocomplete-input" type="text" placeholder="Search"/>
                                                <i className="icon-material-outline-search"></i>
                                            </div>
                                        </div>

                                        <ul>
                                            {active_jobs ? active_jobs.map((active, index) => {
                                                return (
                                                    <li onClick={() => {
                                                        this.handleSelection(active);
                                                    }}>
                                                        <a>
                                                            <div className="message-avatar"><i className="status-icon status-online"></i><img src="/images/user-avatar-small-03.jpg" alt="" /></div>

                                                            <div className="message-by">
                                                                <div className="message-by-headline">
                                                                    {active.contract_between.map((user, indexxx) => {
                                                                        if (user !== this.props.username) {
                                                                            return <h5>{user}</h5>;
                                                                        }
                                                                    })}
                                                                    
                                                                </div>
                                                                <p>{active.start_date}</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                );
                                            }) : null}
                                        </ul>
                                    </div>
                                   
                                    <div className="message-content">

                                        <div className="messages-headline">
                                            <h4>{this.state.other_selected_user !== null ? this.state.other_selected_user.username : "No User Selected Yet..."}</h4>
                                            <a href="#" className="message-action"><i className="icon-feather-trash-2"></i> Delete Conversation</a>
                                        </div>
                                        
                                        {this.renderVideoStreams()}
                                        {/* <div className="message-content-inner">
                                            {this.state.other_selected_user !== null ? <div className="row btn-row-mobile">
                                                <button onClick={this.onOpenModal} className="btn blue-btn" style={{ width: "100%", color: "white" }}>Start a new live stream / video call</button>
                                            </div> : null}
                                            {this.renderVideoStreams()}
                                        </div> */}
                                     
                                        {/* <div className="message-reply">
                                            <textarea cols="1" rows="1" placeholder="Your Message" data-autoresize></textarea>
                                            <button className="button ripple-effect">Send</button>
                                        </div> */}

                            </div>
                            

                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div id="subscribeModal">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="top-strip"></div>
                                    <a class="h2">The "REAL" Coders</a>
                                    <h3 class="pt-5 mb-0 text-secondary">Video Call Initiation</h3>
                                    <p class="pb-1 lead"><small>Enter your meeting name below...</small></p>
                                    <form>
                                        <div class="input-group mb-3 w-75 mx-auto">
                                        <input onChange={(e) => {
                                            this.setState({
                                                meeting_name: e.target.value
                                            })
                                        }} type="text" id="special-input" class="form-control" placeholder={"Enter your meeting name here..."} required />
                                        <div class="input-group-append">
                                            <button onClick={() => {
                                                this.joinStream();
                                                // if (this.state.meeting_name.length > 0) {
                                                //     this.handleVideoStart();
                                                // } else {
                                                //     NotificationManager.error('You must enter a "meeting" name before proceeding...', 'ERROR', 7000);
                                                // }
                                            }} class="btn btn-primary" type="button" id="button-addon2"><i class="fa fa-paper-plane"></i></button>
                                        </div>
                                        </div>
                                    </form>
                                    <p class="pb-1 text-muted"><small>Your video call is encrypted and safe with us.</small></p>
                                    <div class="bottom-strip"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
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
export default withRouter(connect(mapStateToProps, {  })(VideoCallingHomeDashHelper));
