import React, { Component } from 'react';
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import LandingTopHelper from "../../../helpers/homepage/landing-top/landing.js";
import CategoriesHelper from "../../../helpers/homepage/categories/categories.js";
import FeaturedJobsHelper from "../../../helpers/homepage/featured-jobs/featured.js";
import FeaturedCities from "../../../helpers/homepage/featured-cities/featured-cities.js";
import TopRatedWorkers from "../../../helpers/homepage/sliders/top-rated-workers/topRated.js";
import MembershipPlans from "../../../helpers/homepage/membership-plans/membership.js";
import FooterFooter from "../../../helpers/universal/footer/footer.js";


class MainComponentLanding extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <LandingTopHelper />
                <CategoriesHelper />
                <FeaturedJobsHelper />
                <FeaturedCities />
                <TopRatedWorkers />
                <MembershipPlans />
                <FooterFooter />
            </div>
        )
    }
}

export default MainComponentLanding;