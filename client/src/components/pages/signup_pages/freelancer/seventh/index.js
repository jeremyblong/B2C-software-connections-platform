import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import LocationFreelancerSignupHelper from "../../../../helpers/signup_helpers/freelancer/location/index.js";

const SeventhFreelancerSignupPage = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <LocationFreelancerSignupHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default SeventhFreelancerSignupPage;