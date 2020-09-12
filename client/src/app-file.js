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



class App extends Component {
constructor(props) {
  super(props)
  
  this.state = {
    pageNumber: null,
    loaded: false
  }
}
  componentDidMount() {
    setTimeout(() => {
      axios.post("/figure/out/page/number", {
        username: this.props.username
      }).then((res) => {
        if (res.data.message === "FOUND user!") {
          console.log("!!! :", res.data);
          this.setState({
            pageNumber: res.data.page
          }, () => {
            this.props.history.push(`/signup/freelancer/page/${this.state.pageNumber}`);
          });
        }
      }).catch((err) => {
        console.log(err);
      })
    }, 500);
  }
  renderSignedUpOrNot = () => {

    const { loaded, pageNumber } = this.state;

    if (loaded === true) {
      if (this.props.finishedSignup === true) {
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
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <div className="App">
              <Route exact path="/" component={InitialSignupPageFreelancer} />
              <Route exact path={`/signup/freelancer/page/1`} component={SecondPageSignupFreelancer} />
            </div>
          </Fragment>
        );
      }
    }
  }
  render () {
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
            username: state.auth.authenticated.username
          }
      } 
  }
}
export default withRouter(connect(mapStateToProps, { })(App));