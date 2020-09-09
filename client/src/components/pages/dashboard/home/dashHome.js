import React, { Fragment } from "react";
import FooterFooter from "../../../helpers/universal/footer/footer.js";
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import DashboardHomeHelper from "../../../helpers/dashboard/home/home.js";

const DashHomepagePage = (props) => {
    return (
        <Fragment>
            <Navigation />
            <DashboardHomeHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default DashHomepagePage;