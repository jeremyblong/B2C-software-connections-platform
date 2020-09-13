import React from 'react';
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../../helpers/universal/footer/footer.js';
import FreelancerListView from "../../../helpers/jobs/jobs-open-by-client/freelancers-list/locateFreelancers.js";



const FreelancersListPage = props => {
    return (
        <div>
            <Navigation />
            <FreelancerListView />
            <FooterFooter />
        </div>
    );
}
export default FreelancersListPage;