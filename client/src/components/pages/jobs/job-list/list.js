import React, { Component } from 'react';
import FooterFooter from "../../../helpers/universal/footer/footer.js";
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import BusinessPostingsHomepage from "../../../helpers/jobs/jobs-open-by-business/business-listings/listingsHomepage.js";

class JobListPage extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <BusinessPostingsHomepage />
                <FooterFooter />
            </div>
        )
    }
}
export default JobListPage;