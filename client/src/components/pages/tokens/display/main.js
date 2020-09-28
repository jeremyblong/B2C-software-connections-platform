import React from 'react';
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../../helpers/universal/footer/footer.js';
import PurchaseCoinsSelectionHelper from "../../../helpers/tokens/display/index.js";

const PurchaseTokensPage = props => {
    return (
        <div>
            <Navigation />
            <PurchaseCoinsSelectionHelper />
            <FooterFooter />
        </div>
    );
}
export default PurchaseTokensPage;