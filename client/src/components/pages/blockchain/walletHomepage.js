import React, { Fragment } from 'react';
import Navigation from "../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../helpers/universal/footer/footer.js';
import HomepageWalletHelper from "../../helpers/blockchain/wallet/index.js";

const WalletHomepagePage = props => {
    return (
        <Fragment>
            <Navigation />
            <HomepageWalletHelper props />
            <FooterFooter />
        </Fragment>
    );
}
export default WalletHomepagePage;