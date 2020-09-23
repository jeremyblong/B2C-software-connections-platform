import React, { Fragment } from "react";
import ManageJobsApplicationsHelper from "../../../helpers/dashboard/manage-jobs/manage.js";
import FooterFooter from "../../../helpers/universal/footer/footer.js";
import Navigation from "../../../helpers/universal/navigation/navigation.js";

const ManageJobsApplicationsPage = (props) => {
    return (
        <Fragment>
            <Navigation />
            <ManageJobsApplicationsHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default ManageJobsApplicationsPage;
