import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import LocationSignupBusinessHelper from "../../../../helpers/signup_helpers/business/location/locationHelper.js";

const LocationBusinessSignupPage = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <LocationSignupBusinessHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default LocationBusinessSignupPage;