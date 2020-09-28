import React from 'react';
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../../helpers/universal/footer/footer.js';
import ReviewTokenPurchaseHelper from "../../../helpers/tokens/review/review.js";

const PurchaseTokensReviewPage = props => {
    return (
        <div>
            <Navigation />
            <ReviewTokenPurchaseHelper props={props} />
            <FooterFooter />
        </div>
    );
}
export default PurchaseTokensReviewPage;