import React from "react";
import Navigation from "../helpers/universal/navigation/navigation.js";
import FooterFooter from "../helpers/universal/footer/footer.js";
import ThankYouHelper from "../helpers/payments/thankYouPage.js";

const ThankYouPage = (props) => {
    return (
        <div>
            <Navigation />
            <ThankYouHelper />
            <FooterFooter />
        </div>
    );
}
export default ThankYouPage;