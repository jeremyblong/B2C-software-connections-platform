import React from 'react';
import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import MainComponentLanding from "./components/pages/homepage/homepage/main.js";
import JobListPage from "./components/pages/jobs/job-list/list.js";
import Registration from "./components/pages/auth/register/register.js";
import SigninPage from "./components/pages/auth/sign-in/sign-in.js";
import PublicProfilePage from "./components/pages/profile-related/public-profile/profile.js";
import ContactPage from "./components/pages/contact/contact.js";
import DashHomepagePage from "./components/pages/dashboard/home/dashHome.js";
import SettingsPageMain from "./components/pages/dashboard/settings/settings.js";
import MessagesPage from "./components/pages/dashboard/messages/messages.js";

function App() {
  return (
    <BrowserRouter>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
