import React from 'react';
import Navigation from "../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../helpers/universal/footer/footer.js';
import ContactHelper from "../../helpers/contact/contactHelper.js";

const ContactPage = props => {
    return (
        <div>
            <Navigation />
            <ContactHelper />
            <FooterFooter />
        </div>
    );
}
export default ContactPage;