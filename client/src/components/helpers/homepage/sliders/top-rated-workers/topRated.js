import React, { Component } from 'react';
import Slider from "react-slick";
import "./style.css";

class TopRatedWorkers extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        data: [{
            image: "/images/user-avatar-big-01.jpg",
            name: "Tom Smith",
            title: "UI/UX Designer",
            location: "London",
            rate: "$60",
            success: "95%"
        }, {
            image: "/images/user-avatar-big-02.jpg",
            name: "Ronald Becans",
            title: "Software Engineer",
            location: "United States",
            rate: "$40",
            success: "65%"
        }, {
            image: "/images/user-avatar-big-03.jpg",
            name: "Jacob Smith",
            title: "iOS/Android Developer",
            location: "London",
            rate: "$68",
            success: "55%"
        }, {
            image: "/images/user-avatar-big-02.jpg",
            name: "Luke Renolds",
            title: "UI/UX Designer",
            location: "United States",
            rate: "$30",
            success: "85%"
        }, {
            image: "/images/user-avatar-big-01.jpg",
            name: "Abigail Smith",
            title: "Full-Stack Developer",
            location: "London",
            rate: "$35",
            success: "80%"
        }, {
            image: "/images/user-avatar-big-03.jpg",
            name: "Yellandra Adams",
            title: "UI/UX Designer",
            location: "India",
            rate: "$60",
            success: "70%"
        }, {
            image: "/images/user-avatar-big-01.jpg",
            name: "Tom Smith",
            title: "UI/UX Designer",
            location: "London",
            rate: "$60",
            success: "95%"
        }, {
            image: "/images/user-avatar-big-02.jpg",
            name: "Ronald Becans",
            title: "Software Engineer",
            location: "United States",
            rate: "$40",
            success: "65%"
        }, {
            image: "/images/user-avatar-big-03.jpg",
            name: "Jacob Smith",
            title: "iOS/Android Developer",
            location: "London",
            rate: "$68",
            success: "55%"
        }]
    }
}

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            autoplaySpeed: 2000,
            autoplay: true,
            infinite: false
        };
        return (
            <div>
                <div class="section gray padding-top-65 padding-bottom-70 full-width-carousel-fix">
                    <div class="container">
                        <div class="row">

                            <div class="col-xl-12">
                                <div class="section-headline margin-top-0 margin-bottom-25">
                                    <h3>Highest Rated Freelancers</h3>
                                    <a href="freelancers-grid-layout.html" class="headline-link">Browse All Freelancers</a>
                                </div>
                            </div>

                            <div class="col-xl-12">
                                <Slider className="freelancers-container freelancers-grid-layout" {...settings}>
                                    {this.state.data ? this.state.data.map((freelancer, index) => {
                                        console.log("freelancer :", freelancer)
                                        return (
                                            <div>
                                                <div class="freelancer">
                                                    <div class="freelancer-overview">
                                                        <div class="freelancer-overview-inner">
                                                            <span class="bookmark-icon"></span>
                                                            <div class="freelancer-avatar">
                                                                <div class="verified-badge"></div>
                                                                <a href="/"><img src={freelancer.image} alt="profile-pic" /></a>
                                                            </div>
                                                            <div class="freelancer-name">
                                                                <h4><a href="/">{freelancer.name} <img class="flag" src="/images/flags/gb.svg" alt="" title="United Kingdom" data-tippy-placement="top"/></a></h4>
                                                                <span>{freelancer.title}</span>
                                                            </div>
                                                            <div class="freelancer-rating">
                                                                <div class="star-rating" data-rating="5.0"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="freelancer-details">
                                                        <div class="freelancer-details-list">
                                                            <ul>
                                                                <li>Location <strong><i class="icon-material-outline-location-on"></i> {freelancer.location}</strong></li>
                                                                <li>Rate <strong>{freelancer.rate} / hr</strong></li>
                                                                <li>Job Success <strong>{freelancer.success}</strong></li>
                                                            </ul>
                                                        </div>
                                                        <a href="/" class="button blue-btn button-sliding-icon ripple-effect">View Profile <i class="icon-material-outline-arrow-right-alt"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }) : <h1 className="text-center">Loading...</h1>}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TopRatedWorkers;