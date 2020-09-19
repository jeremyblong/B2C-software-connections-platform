import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import VisibilityHelperBusinessSignup from "../../../../helpers/signup_helpers/business/visibility/index.js";

const VisibilitySignupBusinessPage = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <VisibilityHelperBusinessSignup />
            <FooterFooter />
        </Fragment>
    );
}
export default VisibilitySignupBusinessPage;