import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import FifthProfileLanguageSelectionHelper from "../../../../helpers/signup_helpers/freelancer/languages/index.js";

const FifthPageSignupFreelancer = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <FifthProfileLanguageSelectionHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default FifthPageSignupFreelancer;