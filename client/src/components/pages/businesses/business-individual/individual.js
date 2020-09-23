import React from "react";
import BusinessPostingsIndividual from "../../../helpers/businesses/business-posting-individual/individual.js";
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../../helpers/universal/footer/footer.js';


const BusinessIndividualListing = props => {
    return (
        <div>
            <Navigation />
            <BusinessPostingsIndividual job={props.location.data} general={props} />
            <FooterFooter />
        </div>
    );
}
export default BusinessIndividualListing;