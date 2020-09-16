import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import SignupDescriptionHelper from "../../../../helpers/signup_helpers/business/description/description.js";

const BusinessSignupPageDescription = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <SignupDescriptionHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default BusinessSignupPageDescription;