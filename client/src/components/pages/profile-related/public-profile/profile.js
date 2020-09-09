import React from "react";
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import FooterFooter from "../../../helpers/universal/footer/footer.js";
import ViewProfileHelperPublic from "../../../helpers/profile-related/public-profile/view/viewProfile.js";

const PublicProfilePage = (props) => {
    return (
        <div>
            <Navigation />
            <ViewProfileHelperPublic />
            <FooterFooter />
        </div>
    );
}
export default PublicProfilePage;