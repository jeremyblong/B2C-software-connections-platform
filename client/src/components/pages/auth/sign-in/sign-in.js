import React from 'react';
import SignInHelper from "../../../helpers/auth/sign-in/sign-in.js";
import FooterFooter from '../../../helpers/universal/footer/footer.js';
import Navigation from "../../../helpers/universal/navigation/navigation.js";

const SigninPage = props => {
    return (
        <div>
            <Navigation />
            <SignInHelper />
            <FooterFooter />
        </div>
    )
}
export default SigninPage;