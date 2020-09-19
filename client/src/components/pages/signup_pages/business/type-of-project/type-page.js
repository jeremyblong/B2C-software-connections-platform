import React, { Fragment } from "react";
import NavigationTwo from "../../../../helpers/universal/secondary-navigation/index.js";
import FooterFooter from "../../../../helpers/universal/footer/footer.js";
import TypeOfProjectHelper from "../../../../helpers/signup_helpers/business/type-of-project/type.js";

const TypeOfProjectPage = (props) => {
    return (
        <Fragment>
            <NavigationTwo />
            <TypeOfProjectHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default TypeOfProjectPage;