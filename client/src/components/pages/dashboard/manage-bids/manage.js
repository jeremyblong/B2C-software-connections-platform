import React, { Fragment } from "react";
import ManageBidsFreelancerHelper from "../../../helpers/dashboard/mange-bids/manage.js";
import FooterFooter from "../../../helpers/universal/footer/footer.js";
import Navigation from "../../../helpers/universal/navigation/navigation.js";

const ManageBidsFreelancerPageMain = (props) => {
    return (
        <Fragment>
            <Navigation />
            <ManageBidsFreelancerHelper props={props} />
            <FooterFooter />
        </Fragment>
    );
}
export default ManageBidsFreelancerPageMain;