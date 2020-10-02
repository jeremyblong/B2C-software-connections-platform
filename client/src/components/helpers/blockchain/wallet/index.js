import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

class HomepageWalletHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        blocks: []
    }
}
    componentDidMount() {
        axios.get("/gather/blockchain/blocks").then((res) => {
			console.log(res.data);
			this.setState({
				blocks: res.data.chain
			})
		}).catch((err) => {
			console.log(err); 
		})
    }
    mineCryptocurrency = () => {
        axios.get("/mine").then((res) => {
			console.log(res.data);
			// this.setState({
			// 	blocks: res.data.chain
			// })
		}).catch((err) => {
			console.log(err); 
		})
    }
    render() {
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div style={{ minHeight: "100vh" }} class="dashboard-content-container" data-simplebar>
                        <div class="dashboard-content-inner" >
                            <div class="dashboard-headline">
                                <h3 className="text-left">Welcome to your crypto wallet!</h3>
                                <span className="text-left">This is a place where you can keep track of your currency and observe the blockchain network transactions!</span>

                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li>Crypto-Wallet</li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <button onClick={this.mineCryptocurrency} class="btn blue-btn" style={{ width: "100%", marginBottom: "20px" }}>Mine CryptoCurrency</button>
                            </div>
                            <div class="fun-facts-container">
                            <div class="fun-fact col-md-3 col-sm-12 col-xs-12 col-lg-3" data-fun-fact-color="#2a41e6">
                                <div class="fun-fact-text">
                                    <span>Combined Business Listing Views</span>
                                    <h4>11</h4>
                                </div>
                                <div class="fun-fact-icon fun-fact-one"><i class="icon-feather-trending-up" style={{ color: "white" }}></i></div>
                            </div>
                            <div class="fun-fact col-md-3 col-sm-12 col-xs-12 col-lg-3" data-fun-fact-color="#2a41e6">
                                <div class="fun-fact-text">
                                    <span>Combined Business Listing Views</span>
                                    <h4>462</h4>
                                </div>
                                <div class="fun-fact-icon fun-fact-two"><i class="icon-feather-trending-up" style={{ color: "white" }}></i></div>
                            </div>
                                <div class="fun-fact col-md-3 col-sm-12 col-xs-12 col-lg-3" data-fun-fact-color="#efa80f">
                                    <div class="fun-fact-text">
                                        <span>Reviews</span>
                                        <h4>0</h4>
                                    </div>
                                    <div class="fun-fact-icon fun-fact-three"><i class="icon-material-outline-rate-review" style={{ color: "white" }}></i></div>
                                </div>

                                <div class="fun-fact col-md-3 col-sm-12 col-xs-12 col-lg-3" data-fun-fact-color="#2a41e6">
                                    <div class="fun-fact-text">
                                        <span>Combined Business Listing Views</span>
                                        <h4>93</h4>
                                    </div>
                                    <div class="fun-fact-icon fun-fact-four"><i class="icon-feather-trending-up" style={{ color: "white" }}></i></div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default HomepageWalletHelper;
