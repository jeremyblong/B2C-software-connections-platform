import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import SecondSignupPageHelper from "../../../../helpers/signup_helpers/freelancer/second/index.js";

const SecondPageSignupFreelancer = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <SecondSignupPageHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default SecondPageSignupFreelancer;