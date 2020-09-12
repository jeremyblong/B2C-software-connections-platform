import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import InitialHelperLanding from "../../../../helpers/signup_helpers/freelancer/initial/landing.js";

const InitialSignupPageFreelancer = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <InitialHelperLanding />
            <FooterFooter />
        </Fragment>
    );
}
export default InitialSignupPageFreelancer;