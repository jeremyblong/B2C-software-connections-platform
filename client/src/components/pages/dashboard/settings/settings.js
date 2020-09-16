import React, { Fragment } from "react";
import FooterFooter from "../../../helpers/universal/footer/footer";
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import SettingsHelper from "../../../helpers/dashboard/settings/settings.js";

const SettingsPageMain = (props) => {
    return (
        <Fragment>
            <Navigation />
            <SettingsHelper />
        </Fragment>
    );
}
export default SettingsPageMain;