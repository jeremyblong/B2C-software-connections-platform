import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import FourthSignupPageFreelancerHelper from "../../../../helpers/signup_helpers/freelancer/four-employment/index.js";

const FourthPageSignupFreelancer = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <FourthSignupPageFreelancerHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default FourthPageSignupFreelancer;