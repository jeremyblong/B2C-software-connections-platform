import React, { Component, Fragment } from 'react';
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import FooterFooter from '../../../helpers/universal/footer/footer.js';
import VideoCallingHomeDashHelper from "../../../helpers/video-skype/home/home-dash.js";

const VideoStreamingHomepagePage = (props) => {
    return (
        <Fragment>
            <Navigation />
            <VideoCallingHomeDashHelper />
            <FooterFooter />
        </Fragment>
    );
}
export default VideoStreamingHomepagePage;