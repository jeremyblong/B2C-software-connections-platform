import React, { Fragment } from "react";
import BusinessSignupBillingSetupHelper from "../../../../helpers/signup_helpers/business/billing-rate/billing.js";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";

const BillingBusinessPage = (props) => {
    return (
       <Fragment>
            <NavigationTwo />
            <BusinessSignupBillingSetupHelper />
            <FooterFooter />
       </Fragment>
    );
}
export default BillingBusinessPage;