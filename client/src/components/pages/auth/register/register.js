import React from "react";
import Navigation from "../../../helpers/homepage/navigation/navigation.js";
import FooterFooter from "../../../helpers/universal/footer/footer.js";
import RegisterHelper from "../../../helpers/auth/register/register.js";

const Registration = (props) => {
    return (
        <div>
            <Navigation />
            <RegisterHelper />
            <FooterFooter />
        </div>
    );
}
export default Registration;