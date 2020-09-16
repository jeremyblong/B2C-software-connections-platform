import React from 'react';
import Navigation from "../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../helpers/universal/footer/footer.js';
import PayForMembershipHelper from "../../helpers/memberships/pay.js";

const PaymentMemebershipPage = props => {
    console.log("!", props);
    return (
        <div>
            <Navigation />
            <PayForMembershipHelper amount={props.location.query} />
            <FooterFooter />
        </div>
    );
}
export default PaymentMemebershipPage;