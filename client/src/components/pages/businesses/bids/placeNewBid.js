import React from "react";
import PlaceNewBidHelper from "../../../helpers/businesses/bids/placeNewBid.js";
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../../helpers/universal/footer/footer.js';


const PlaceNewBidBusinessPage = props => {
    return (
        <div>
            <Navigation />
            <PlaceNewBidHelper data={props.location.data ? props.location.data.data : null} />
            <FooterFooter />
        </div>
    );
}
export default PlaceNewBidBusinessPage;