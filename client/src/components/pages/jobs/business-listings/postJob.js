import React from "react";
import FooterFooter from "../../../helpers/universal/footer/footer";
import Navigation from "../../../helpers/universal/navigation/navigation.js";
import PostAJob from "../../../helpers/jobs/post-a-job/post.js";

const PostNewJobPage = props => {
    return (
        <div>
            <Navigation />
            <PostAJob />
            <FooterFooter />
        </div>
    );
}
export default PostNewJobPage;