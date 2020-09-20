import React from 'react';
import VerifyPhoneNumberHelper from "../../../helpers/twilio/verifyPhoneNumber.js";
import FooterFooter from '../../../helpers/universal/footer/footer.js';
import Navigation from "../../../helpers/universal/navigation/navigation.js";

const VerifyPhoneNumberPage = (props) => {
    return (
        <div>
            <Navigation />
            <VerifyPhoneNumberHelper passed={props.location.state.passed} sid={props.location.state.sid} />
            <FooterFooter />
        </div>
    )
}
export default VerifyPhoneNumberPage;