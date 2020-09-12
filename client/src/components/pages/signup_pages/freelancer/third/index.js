import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import ThirdSignupPageHelper from "../../../../helpers/signup_helpers/freelancer/third/index.js";

const ThirdPageFreelancerSignUp = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <ThirdSignupPageHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default ThirdPageFreelancerSignUp;