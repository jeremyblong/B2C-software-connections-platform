import React from 'react';
import IndividualFreelancerProfileHelper from "../../../../helpers/jobs/jobs-open-by-client/individual/index.js";
import Navigation from "../../../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../../../helpers/universal/footer/footer.js';


const FreelancerProfileIndividualPublic = (props) => {
    console.log("p :", props);
    return (
        <div>
            <Navigation />
            <IndividualFreelancerProfileHelper user={props.location.state.user} id={props.match.params.id} />
            <FooterFooter />
        </div>
    );
}
export default FreelancerProfileIndividualPublic;