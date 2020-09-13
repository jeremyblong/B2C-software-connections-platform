import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import HourlyRateFreelancerHelper from "../../../../helpers/signup_helpers/freelancer/hourly-rate/index.js";

const SixthPageFreelancerSignUp = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <HourlyRateFreelancerHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default SixthPageFreelancerSignUp;