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
import FreelancerProfileIndividualPublic from "./components/pages/businesses/find-freelancers/individual/freelancerProfile.js";
import BusinessIndividualListing from "./components/pages/businesses/business-individual/individual.js";
import PaymentMemebershipPage from "./components/pages/memberships/createMembership.js";
import ThankYouPage from "./components/pages/thankYouPage.js";
import InitialSignupPageBusiness from "./components/pages/signup_pages/business/initial/init.js";
import BusinessSignupPageDescription from "./components/pages/signup_pages/business/description/descriptionPageSignup.js";
import TypeOfProjectPage from "./components/pages/signup_pages/business/type-of-project/type-page.js";
import ExpertisePage from "./components/pages/signup_pages/business/expertise/index.js";
import LocationBusinessSignupPage from "./components/pages/signup_pages/business/location/index.js";
import VisibilitySignupBusinessPage from "./components/pages/signup_pages/business/visibility/visibility.js";
import BillingBusinessPage from "./components/pages/signup_pages/business/billing-rates/billing.js";
import BusinessSignupOverviewFinalReviewPage from "./components/pages/signup_pages/business/overview/final.js";
import VerifyPhoneNumberPage from "./components/pages/auth/verify/index.js";
import PlaceNewBidBusinessPage from "./components/pages/businesses/bids/placeNewBid.js";
import ManageJobsApplicationsPage from "./components/pages/dashboard/manage-jobs/manage.js";
import DashboardManageApplicantsPage from "./components/pages/dashboard/manage-jobs/individual-applicants-details.js";
import ManageBidsFreelancerPageMain from "./components/pages/dashboard/manage-bids/manage.js";

class App extends Component {
constructor(props) {
  super(props)
  
  this.state = {
    pageNumber: null,
    loaded: false,
    un_registered: false,
    user: null,
    businessPageNumber: null
  }
}
  componentDidMount() {
    // this.props.authentication({});
    setTimeout(() => {
      axios.post("/figure/out/page/number", {
        username: this.props.username
      }).then((res) => {
        if (res.data.message === "FOUND user!") {
          console.log("!!! :", res.data);
          
          if (res.data.user.businessSignupPageCompleted) {
            if (res.data.user.completed_signup === true) {
                this.setState({
                  un_registered: true,
                  loaded: true,
                  user: res.data.user
                })
            } else {
              this.setState({
                businessPageNumber: res.data.user.businessSignupPageCompleted,
                loaded: true,
                user: res.data.user
              }, () => {
                if (this.props.username) {
                  this.submit();
                } else {
                  return null;
                }
                // this.props.history.push(`/signup/freelancer/page/${this.state.pageNumber}`);
              });
            }
          } else {
            if (res.data.user.completed_signup === true) {
                this.setState({
                  un_registered: true,
                  loaded: true,
                  user: res.data.user
                })
            } else {
              this.setState({
                pageNumber: res.data.page,
                loaded: true,
                user: res.data.user
              }, () => {
                if (this.props.username) {
                  this.submit();
                } else {
                  return null;
                }
                // this.props.history.push(`/signup/freelancer/page/${this.state.pageNumber}`);
              });
            }
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
            if (this.state.pageNumber || this.state.businessPageNumber) {
              this.props.history.push(this.state.businessPageNumber !== null ? `/signup/business/page/${this.state.businessPageNumber}` : `/signup/freelancer/page/${this.state.pageNumber}`);
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

    console.log("state...... this : ", this.state);

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
              <Route exact path="/freelancer/individual/page/public/:id" component={FreelancerProfileIndividualPublic} />
              <Route exact path="/business/individual/listing/:id" component={BusinessIndividualListing} />
              <Route exact path="/payment/create/membership" component={PaymentMemebershipPage} />
              <Route exact path="/thank/you/for/your/payment" component={ThankYouPage} /> 
              <Route exact path="/verify/phone/number" component={VerifyPhoneNumberPage} /> 
              <Route exact path="/freelancer/place/bid/company/listing" component={PlaceNewBidBusinessPage} />
              <Route exact path="/dashboard/manage/applications" component={ManageJobsApplicationsPage} />
              <Route exact path="/dashboard/manage/applications/individual/:id" component={DashboardManageApplicantsPage} />
              <Route exact path="/dashboard/manage/bidders" component={ManageBidsFreelancerPageMain} />
            </div>
          </Fragment>
        );
      } else if (this.state.user.accountType === "freelancer") {
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
      } else if (this.state.user.accountType === "business") {
        return (
          <Fragment>
            <div className="App">
              <Route exact path="/" component={InitialSignupPageBusiness} />
              <Route exact path="/signup/business/page/1" component={BusinessSignupPageDescription} />
              <Route exact path="/signup/business/page/2" component={TypeOfProjectPage} /> 
              <Route exact path="/signup/business/page/3" component={ExpertisePage} />
              <Route exact path="/signup/business/page/4" component={LocationBusinessSignupPage} />
              <Route exact path="/signup/business/page/5" component={VisibilitySignupBusinessPage} />
              <Route exact path="/signup/business/page/6" component={BillingBusinessPage} />
              <Route exact path="/signup/business/page/7" component={BusinessSignupOverviewFinalReviewPage} />
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
      if (obj.authenticated && (obj.authenticated.hasOwnProperty("email"))) {
          return {
            username: state.auth.authenticated.username,
            force: state.auth.forced
          }
      } 
  }
}
export default withRouter(connect(mapStateToProps, { authentication })(App));
