import React from 'react';
import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import MainComponentLanding from "./components/pages/homepage/homepage/main.js";
import JobListPage from "./components/pages/jobs/job-list/list.js";
import Registration from "./components/pages/auth/register/register.js";
import SigninPage from "./components/pages/auth/sign-in/sign-in.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={MainComponentLanding} />
        <Route exact path="/display/jobs/main" component={JobListPage} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/sign-in" component={SigninPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
