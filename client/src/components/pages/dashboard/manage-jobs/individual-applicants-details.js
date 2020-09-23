import React, { Fragment } from "react";
import IndividualJobsHelperDetails from "../../../helpers/dashboard/manage-jobs/individual-job-details.js";
import FooterFooter from "../../../helpers/universal/footer/footer.js";
import Navigation from "../../../helpers/universal/navigation/navigation.js";

const DashboardManageApplicantsPage = (props) => {
    return (
        <Fragment>
            <Navigation />
            <IndividualJobsHelperDetails props={props} />
            <FooterFooter />
        </Fragment>
    );
}
export default DashboardManageApplicantsPage;
