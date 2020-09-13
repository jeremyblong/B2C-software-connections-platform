import React, { Component, Fragment } from 'react';
import './App.css';
import { Route, BrowserRouter, Redirect, withRouter,  } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import MainComponentLanding from "./components/pages/homepage/homepage/main.js";
import JobListPage from "./components/pages/jobs/job-list/list.js";
import Registration from "./components/pages/auth/register/register.js";
import SigninPage from "./components/pages/auth/sign-in/sign-in.js";
import PublicProfilePage from "./components/pages/profile-related/public-profile/profile.js";
import ContactPage from "./components/pages/contact/contact.js";
import DashHomepagePage from "./components/pages/dashboard/home/dashHome.js";
import SettingsPageMain from "./components/pages/dashboard/settings/settings.js";
import MessagesPage from "./components/pages/dashboard/messages/messages.js";
import PostNewJobPage from "./components/pages/jobs/business-listings/postJob.js";
import InitialSignupPageFreelancer from "./components/pages/signup_pages/freelancer/initial/initialPage.js";
import SecondPageSignupFreelancer from "./components/pages/signup_pages/freelancer/second/index.js";
import ThirdPageFreelancerSignUp from "./components/pages/signup_pages/freelancer/third/index.js";
import FourthPageSignupFreelancer from "./components/pages/signup_pages/freelancer/fourth/index.js";
import FifthPageSignupFreelancer from "./components/pages/signup_pages/freelancer/fifth/index.js";
import SixthPageFreelancerSignUp from "./components/pages/signup_pages/freelancer/sixth/index.js";
import SeventhFreelancerSignupPage from "./components/pages/signup_pages/freelancer/seventh/index.js";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { authentication } from "./actions/auth/auth.js";
import FreelancersListPage from "./components/pages/businesses/find-freelancers/find.js";

// places api - foursquare api

class App extends Component {
constructor(props) {
  super(props)
  
  this.state = {
    pageNumber: null,
    loaded: false,
    un_registered: false
  }
}
  componentDidMount() {
    setTimeout(() => {
      axios.post("/figure/out/page/number", {
        username: this.props.username
      }).then((res) => {
        if (res.data.message === "FOUND user!") {
          console.log("!!! :", res.data);
          
          if (res.data.user.completed_signup === true) {
              this.setState({
                un_registered: true,
                loaded: true
              })
          } else {
            this.setState({
              pageNumber: res.data.page,
              loaded: true
            }, () => {
              this.submit();
              // this.props.history.push(`/signup/freelancer/page/${this.state.pageNumber}`);
            });
          }
        } else {
          this.setState({
            un_registered: true,
            loaded: true
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    }, 500);
  }
  submit = () => {
    confirmAlert({
      title: 'Would you like to set your profile up now?',
      message: 'This is a requirement once registering as a freelancer if you want to interact with our site...',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (this.state.pageNumber) {
              this.props.history.push(`/signup/freelancer/page/${this.state.pageNumber}`);
            } else {
              this.props.history.push(`/`);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {
            this.setState({
              un_registered: true
            }, () => {
              this.props.authentication({});
              localStorage.clear();
              setTimeout(() => {
                this.props.history.push("/");
              }, 500);
            })
          }
        }
      ]
    });
  };
  renderSignedUpOrNot = () => {

    const { loaded, pageNumber } = this.state;

    if (loaded === true) {
      if (this.props.finishedSignup === true || this.state.un_registered === true || this.props.force === false) {
        return (
          <Fragment>
            <div className="App">
              <Route exact path="/" component={MainComponentLanding} />
              <Route exact path="/display/jobs/main" component={JobListPage} />
              <Route exact path="/register" component={Registration} />
              <Route exact path="/sign-in" component={SigninPage} />
              <Route exact path="/view/personal/profile" component={PublicProfilePage} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/dashboard" component={DashHomepagePage} />
              <Route exact path="/dashboard/settings/main" component={SettingsPageMain} />
              <Route exact path="/dashboard/messages" component={MessagesPage} />
              <Route exact path="/businesses/post/job/listing" component={PostNewJobPage} />
              <Route exact path="/freelancers/list/view" component={FreelancersListPage} />
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <div className="App">
              <Route exact path="/" component={InitialSignupPageFreelancer} />
              <Route exact path={`/signup/freelancer/page/1`} component={SecondPageSignupFreelancer} />
              <Route exact path={`/signup/freelancer/page/2`} component={ThirdPageFreelancerSignUp} />
              <Route exact path={`/signup/freelancer/page/3`} component={FourthPageSignupFreelancer} />
              <Route exact path={`/signup/freelancer/page/4`} component={FifthPageSignupFreelancer} />
              <Route exact path={`/signup/freelancer/page/5`} component={SixthPageFreelancerSignUp} />
              <Route exact path={`/signup/freelancer/page/6`} component={SeventhFreelancerSignupPage} />
            </div>
          </Fragment>
        );
      }
    }
  }
  render () {
    console.log(this.state);
    return (
      <Fragment>
          {this.renderSignedUpOrNot()}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  for (const key in state.auth) {
      const obj = state.auth;
      if (obj.authenticated.hasOwnProperty("email")) {
          return {
            username: state.auth.authenticated.username,
            force: state.auth.forced
          }
      } 
  }
}
export default withRouter(connect(mapStateToProps, { authentication })(App));
