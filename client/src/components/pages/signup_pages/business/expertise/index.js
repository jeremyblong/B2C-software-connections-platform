import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import ExpertiseHelper from "../../../../helpers/signup_helpers/business/expertise/expertise.js";

const ExpertisePage = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <ExpertiseHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default ExpertisePage;