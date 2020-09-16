import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import InitialPageBusinessSignupHelper from "../../../../helpers/signup_helpers/business/initial/init.js";

const InitialSignupPageBusiness = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <InitialPageBusinessSignupHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default InitialSignupPageBusiness;