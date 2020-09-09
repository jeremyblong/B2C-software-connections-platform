import React, { Fragment } from "react";
import FooterFooter from "../../../helpers/universal/footer/footer";
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import MessagesHelper from "../../../helpers/dashboard/messages/messages.js";

const MessagesPage = (props) => {
    return (
        <Fragment>
            <Navigation />
            <MessagesHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default MessagesPage;