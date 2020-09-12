import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "./style.css";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Dropzone from 'react-dropzone';
import { Document, Page, pdfjs } from "react-pdf";




class ProfileHelperSettingOne extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        hourly: 0,
        skill: "",
        skills: [],
        skillErr: "",
        isPaneOpen: false,
        file: null,
        normalFile: null,
        callbackRan: false,
        name: "",
        result: null,
        tagline: "",
        introduction: "",
        nationality: ""
    }

    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
}
    updateHourly = () => {
        console.log("update hourly.");

        const { hourly } = this.state;

        axios.post("/update/hourly/pay", {
            username: this.props.username,
            hourly
        }).then((res) => {
            if (res.data.message === "Success!") {
                console.log(res.data);
                
                this.setState({
                    hourly: 0
                }, () => {
                    alert("Successfully updated hourly rate!")
                })
            } else if (res.data.err) {
                alert("An error occurred while updating your hourly rate infomation, Please try again later.")
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    removeElement = (skill, index) => {
        console.log("skill", skill);
        console.log("index", index);

        const skillz = [...this.state.skills];

        let indexxx = skillz.indexOf(skill);

        if (indexxx !== -1) {
            skillz.splice(index, 1);

            this.setState({
                skills: skillz
            })
        }
    }
    submitSkills = () => {
        console.log("submitted.");

        const { skills } = this.state;

        axios.post("/update/skills/profile", {
            username: this.props.username,
            skills
        }).then((res) => {
            if (res.data.message === "Successfully added replaced skills!") {
                console.log(res.data);
                this.setState({
                    skills: []
                }, () => {
                    alert("Successfully updated your skills!")
                })
            } else if (res.data.err) {
                alert("An error occurred updating your skills, please try again later.");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    updateAcceptedFiles = (files) => {
        console.log("FILES :", files);
        this.setState({
            name: files[0].name
        }, () => {
            this.getBase64(files[0], this.callback);
        })
        
    }
    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    callback = (result) => {
        console.log("Callback RESULT... :", result);
        // prepare for axios upload - trim
        const trimmed = result.split("officedocument.wordprocessingml.document;base64,")[1];
        // set state for axios call
        this.setState({
            callbackRan: true,
            result: trimmed
        });
    }
    handleSubmissionResume = () => {

        const { result } = this.state;

        axios.post("/upload/resume/profile", {
            username: this.props.username,
            base64: result
        }).then((res) => {
            if (res.data.message === "Successfully uploaded file!") {
                console.log("magical... :", res.data);   
            } else {
                console.log("something happened.")
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    onDocumentLoadSuccess = (data) => {
        console.log(data);
    }
    handleSubmissionAbout = () => {
        console.log("submitted.");

        const { introduction } = this.state;

        axios.post("/upload/profile/data/introduction", {
            username: this.props.username,
            introduction
        }).then((res) => {
            if (res.data.message === "Successfully saved changes!") {
                console.log("magical... :", res.data);   
                this.setState({
                    introduction: ""
                }, () => {
                    alert("Successfully updated account!")
                })
            } else {
                console.log("something happened.");
                alert("An error occurred...");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderSlideOut = () => {
        return (
            <SlidingPane
                    className="sliding-pane"
                    overlayClassName="sliding-pane-overlay"
                    isOpen={this.state.isPaneOpen}
                    title="Upload Documents"
                    subtitle="Please use the form below to upload your documents"
                    onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                     this.setState({ isPaneOpen: false });
                    }}
                >
                   <div className="container-fluid">
                       <div className="row">
                       <Tabs>
                            <TabList>
                            <Tab>Upload Resume</Tab>
                            <Tab>Upload Cover Letter</Tab>
                            </TabList>
                        
                            <TabPanel style={{ width: "65vw" }}>
                                <div id="container">
                                
                                    <div class="wrapper">
                                        <div class="container">
                                            <h1 className="h1">Upload <strong style={{ color: "darkblue" }}>Resume</strong></h1>
                                            <div class="upload-container">
                                            <div class="border-container">
                                            <Dropzone onDrop={acceptedFiles => {
                                                this.updateAcceptedFiles(acceptedFiles);
                                            }}>
                                                {({getRootProps, getInputProps}) => (
                                                    <section>
                                                    <div style={{ minHeight: "400px" }} {...getRootProps()}>
                                                        <input style={{ minHeight: "500px" }} {...getInputProps()} />
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                        {this.state.callbackRan ? <div style={{ margin: "40px", backgroundColor: "black" }} className="attachment-box ripple-effect">
                                                            <span className="text-white">Resume - {this.state.name ? this.state.name : "Uknown"}</span>
                                                            <i className="text-white">DOC</i>
                                                        </div> : null}
                                                    </div>
                                                    </section>
                                                )}
                                                </Dropzone>
                                            </div>
                                            </div>
                                        </div>
                                        {this.state.result ? <div className="mx-auto">
                                            <button onClick={this.handleSubmissionResume} className="btn black-btn" style={{ width: "60vw", marginTop: "20px", color: "white" }}>UPLOAD FILE</button>
                                        </div> : null}
                                                    


                                        <Document
                                            file="https://s3.us-west-1.wasabisys.com/software-gateway-platform/8d4024af-5c01-43c8-ae20-510f14429f1d"
                                            onLoadSuccess={this.onDocumentLoadSuccess}
                                        >
                                            <Page pageNumber={1} />
                                        </Document>







                                    </div>
                                    
                                </div>
                            </TabPanel>
                            <TabPanel style={{ width: "65vw" }}>
                                <div id="container">
                                
                                    <div class="wrapper">
                                        <div class="container">
                                            <h1 className="h1">Upload <strong style={{ color: "darkblue" }}>Cover Letter</strong></h1>
                                            <div class="upload-container">
                                            <div class="border-container">
                                            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                                {({getRootProps, getInputProps}) => (
                                                    <section style={{ minHeight: "500px" }}>
                                                    <div style={{ minHeight: "500px" }} {...getRootProps()}>
                                                        <input style={{ minHeight: "500px" }} {...getInputProps()} />
                                                        <p>Drag 'n' drop some files here, or click to select files</p>

                                                        {this.state.callbackRan ? <div className="attachment-box ripple-effect">
                                                            <span>Cover Letter</span>
                                                            <i>DOC</i>
                                                        </div> : null}
                                                    </div>
                                                    </section>
                                                )}
                                                </Dropzone>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="mx-auto">
                                            <button className="btn black-btn" style={{ width: "60vw", marginTop: "20px", color: "white" }}>UPLOAD FILE</button>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                       </div>
                   </div>
            </SlidingPane>
        );
    }
    handleSubmissionNationality = () => {
        console.log("handle submission...");

        const { nationality } = this.state;

        axios.post("/upload/profile/data/nationality", {
            username: this.props.username,
            nationality
        }).then((res) => {
            if (res.data.message === "Successfully saved changes!") {
                console.log("magical... :", res.data);   
                this.setState({
                    nationality: ""
                }, () => {
                    alert("Successfully updated account!")
                })
            } else {
                console.log("something happened.");
                alert("An error occurred...");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleSubmissionTagline = () => {
        console.log("handleSubmissionTagline... submit.");

        const { tagline } = this.state;

        axios.post("/upload/profile/data/tagline", {
            username: this.props.username,
            tagline
        }).then((res) => {
            if (res.data.message === "Successfully saved changes!") {
                console.log("magical... :", res.data);   
                this.setState({
                    tagline: ""
                }, () => {
                    alert("Successfully updated account!")
                })
            } else {
                console.log("something happened.");
                alert("An error occurred...");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <div className="col-xl-12">
                <div className="dashboard-box">

                    {this.renderSlideOut()}
                    <div className="headline">
                        <h3><i className="icon-material-outline-face"></i> My Profile</h3>
                    </div>

                    <div className="content">
                        <ul className="fields-ul">
                        <li>
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <div className="bidding-widget">
                                            
                                            <span className="bidding-detail">Set your <strong>minimal hourly rate</strong></span>

                                        
                                            {/* <div className="bidding-value margin-bottom-10">$<span id="biddingVal"></span></div> */}
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                    <Input value={this.state.hourly} onChange={(e) => {
                                                        this.setState({
                                                            hourly: Number(e.target.value)
                                                        })
                                                    }} placeholder="Amount" min={0} max={100} type="number" step="1" />
                                                    <InputGroupAddon addonType="append">.00</InputGroupAddon>
                                                </InputGroup>
                                        </div>
                                        {this.state.hourly !== 0 ? <div>
                                            <button onClick={this.updateHourly} className="btn blue-btn" style={{ width: "100%", color: "white", marginTop: "30px" }}>Submit Changes</button>
                                        </div> : null}
                                    </div>
                                </div>

                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <h5>Skills <i className="help-icon" data-tippy-placement="right" title="Add up to 10 skills"></i></h5>

                                        <div className="keywords-container">
                                            <div className="keyword-input-container">
                                                <input value={this.state.skill} onChange={(e) => {
                                                    this.setState({
                                                        skill: e.target.value,
                                                        skillErr: ""
                                                    })
                                                }} type="text" className="keyword-input with-border" placeholder="e.g. Angular, Laravel"/>
                                                {this.state.skillErr.length !== 0 ? <h4 className="text-center" style={{ color: "red" }}>{this.state.skillErr}</h4> : null}
                                                <button onClick={() => {
                                                    if (this.state.skill.length > 0) {
                                                        this.setState({
                                                            skills: [...this.state.skills, this.state.skill],
                                                            skill: ""
                                                        })
                                                    } else {
                                                        this.setState({
                                                            skillErr: "Please enter a skill before submission..."
                                                        })
                                                    }
                                                }} className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
                                            </div>
                                            <div className="keywords-list">
                                            {this.state.skills.map((skill, index) => {
                                                return (
                                                
                                                        <span className="keyword"><span onClick={() => {
                                                            this.removeElement(skill, index);
                                                        }} className="keyword-remove"></span><span className="keyword-text">{skill}</span></span>
                                                  
                                                );
                                            })}
                                                {/* map over each "skill" and display them...  */}
                                                {/* <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Angular</span></span>
                                                <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Vue JS</span></span>
                                                <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">iOS</span></span>
                                                <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Android</span></span>
                                                <span className="keyword"><span className="keyword-remove"></span><span className="keyword-text">Laravel</span></span> */}
                                            </div>
                                            {this.state.skills.length !== 0 ? <button onClick={this.submitSkills} style={{ width: "100%" }} className="btn black-btn">Submit Skills</button> : null}
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <h5>Attachments</h5>
                                        
                                
                                        <div className="attachments-container margin-top-0 margin-bottom-0">
                                            <div className="attachment-box ripple-effect">
                                                <span>Cover Letter</span>
                                                <i>PDF</i>
                                                <button className="remove-attachment" data-tippy-placement="top" title="Remove"></button>
                                            </div>
                                            <div className="attachment-box ripple-effect">
                                                <span>Contract</span>
                                                <i>DOCX</i>
                                                <button className="remove-attachment" data-tippy-placement="top" title="Remove"></button>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        
                            
                                        <div className="uploadButton margin-top-0">
                                            {/* <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple/> */}
                                            <label onClick={() => {
                                                this.setState({
                                                    isPaneOpen: true
                                                })
                                            }} className="uploadButton-button ripple-effect" for="upload">Upload Files</label>
                                            <span className="uploadButton-file-name">Maximum file size: 10 MB</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div className="col-xl-6 col-md-6 col-lg-6">
                                    <div className="null">
                                        <h5>Tagline</h5>
                                        <input onChange={(e) => {
                                            this.setState({
                                                tagline: e.target.value
                                            })
                                        }} type="text" value={this.state.tagline} className="form-control" placeholder={"iOS Expert + Node Dev"}/>
                                        
                                    </div>
                                    {this.state.tagline.length !== 0 ? <button onClick={this.handleSubmissionTagline} className="btn blue-btn" style={{ color: "white", width: "100%" }}>Submit Tagline Changes</button> : null}
                                </div>

                                <div className="col-xl-6">
                                    <div className="submit-field">
                                        <h5>Nationality</h5>
                                        <select value={this.state.nationality} onChange={(e) => {
                                            this.setState({
                                                nationality: e.target.value
                                            })
                                        }} className="form-control">
                                            <option value="">-- select one --</option>
                                            <option value="afghan">Afghan</option>
                                            <option value="albanian">Albanian</option>
                                            <option value="algerian">Algerian</option>
                                            <option value="american">American</option>
                                            <option value="andorran">Andorran</option>
                                            <option value="angolan">Angolan</option>
                                            <option value="antiguans">Antiguans</option>
                                            <option value="argentinean">Argentinean</option>
                                            <option value="armenian">Armenian</option>
                                            <option value="australian">Australian</option>
                                            <option value="austrian">Austrian</option>
                                            <option value="azerbaijani">Azerbaijani</option>
                                            <option value="bahamian">Bahamian</option>
                                            <option value="bahraini">Bahraini</option>
                                            <option value="bangladeshi">Bangladeshi</option>
                                            <option value="barbadian">Barbadian</option>
                                            <option value="barbudans">Barbudans</option>
                                            <option value="batswana">Batswana</option>
                                            <option value="belarusian">Belarusian</option>
                                            <option value="belgian">Belgian</option>
                                            <option value="belizean">Belizean</option>
                                            <option value="beninese">Beninese</option>
                                            <option value="bhutanese">Bhutanese</option>
                                            <option value="bolivian">Bolivian</option>
                                            <option value="bosnian">Bosnian</option>
                                            <option value="brazilian">Brazilian</option>
                                            <option value="british">British</option>
                                            <option value="bruneian">Bruneian</option>
                                            <option value="bulgarian">Bulgarian</option>
                                            <option value="burkinabe">Burkinabe</option>
                                            <option value="burmese">Burmese</option>
                                            <option value="burundian">Burundian</option>
                                            <option value="cambodian">Cambodian</option>
                                            <option value="cameroonian">Cameroonian</option>
                                            <option value="canadian">Canadian</option>
                                            <option value="cape verdean">Cape Verdean</option>
                                            <option value="central african">Central African</option>
                                            <option value="chadian">Chadian</option>
                                            <option value="chilean">Chilean</option>
                                            <option value="chinese">Chinese</option>
                                            <option value="colombian">Colombian</option>
                                            <option value="comoran">Comoran</option>
                                            <option value="congolese">Congolese</option>
                                            <option value="costa rican">Costa Rican</option>
                                            <option value="croatian">Croatian</option>
                                            <option value="cuban">Cuban</option>
                                            <option value="cypriot">Cypriot</option>
                                            <option value="czech">Czech</option>
                                            <option value="danish">Danish</option>
                                            <option value="djibouti">Djibouti</option>
                                            <option value="dominican">Dominican</option>
                                            <option value="dutch">Dutch</option>
                                            <option value="east timorese">East Timorese</option>
                                            <option value="ecuadorean">Ecuadorean</option>
                                            <option value="egyptian">Egyptian</option>
                                            <option value="emirian">Emirian</option>
                                            <option value="equatorial guinean">Equatorial Guinean</option>
                                            <option value="eritrean">Eritrean</option>
                                            <option value="estonian">Estonian</option>
                                            <option value="ethiopian">Ethiopian</option>
                                            <option value="fijian">Fijian</option>
                                            <option value="filipino">Filipino</option>
                                            <option value="finnish">Finnish</option>
                                            <option value="french">French</option>
                                            <option value="gabonese">Gabonese</option>
                                            <option value="gambian">Gambian</option>
                                            <option value="georgian">Georgian</option>
                                            <option value="german">German</option>
                                            <option value="ghanaian">Ghanaian</option>
                                            <option value="greek">Greek</option>
                                            <option value="grenadian">Grenadian</option>
                                            <option value="guatemalan">Guatemalan</option>
                                            <option value="guinea-bissauan">Guinea-Bissauan</option>
                                            <option value="guinean">Guinean</option>
                                            <option value="guyanese">Guyanese</option>
                                            <option value="haitian">Haitian</option>
                                            <option value="herzegovinian">Herzegovinian</option>
                                            <option value="honduran">Honduran</option>
                                            <option value="hungarian">Hungarian</option>
                                            <option value="icelander">Icelander</option>
                                            <option value="indian">Indian</option>
                                            <option value="indonesian">Indonesian</option>
                                            <option value="iranian">Iranian</option>
                                            <option value="iraqi">Iraqi</option>
                                            <option value="irish">Irish</option>
                                            <option value="israeli">Israeli</option>
                                            <option value="italian">Italian</option>
                                            <option value="ivorian">Ivorian</option>
                                            <option value="jamaican">Jamaican</option>
                                            <option value="japanese">Japanese</option>
                                            <option value="jordanian">Jordanian</option>
                                            <option value="kazakhstani">Kazakhstani</option>
                                            <option value="kenyan">Kenyan</option>
                                            <option value="kittian and nevisian">Kittian and Nevisian</option>
                                            <option value="kuwaiti">Kuwaiti</option>
                                            <option value="kyrgyz">Kyrgyz</option>
                                            <option value="laotian">Laotian</option>
                                            <option value="latvian">Latvian</option>
                                            <option value="lebanese">Lebanese</option>
                                            <option value="liberian">Liberian</option>
                                            <option value="libyan">Libyan</option>
                                            <option value="liechtensteiner">Liechtensteiner</option>
                                            <option value="lithuanian">Lithuanian</option>
                                            <option value="luxembourger">Luxembourger</option>
                                            <option value="macedonian">Macedonian</option>
                                            <option value="malagasy">Malagasy</option>
                                            <option value="malawian">Malawian</option>
                                            <option value="malaysian">Malaysian</option>
                                            <option value="maldivan">Maldivan</option>
                                            <option value="malian">Malian</option>
                                            <option value="maltese">Maltese</option>
                                            <option value="marshallese">Marshallese</option>
                                            <option value="mauritanian">Mauritanian</option>
                                            <option value="mauritian">Mauritian</option>
                                            <option value="mexican">Mexican</option>
                                            <option value="micronesian">Micronesian</option>
                                            <option value="moldovan">Moldovan</option>
                                            <option value="monacan">Monacan</option>
                                            <option value="mongolian">Mongolian</option>
                                            <option value="moroccan">Moroccan</option>
                                            <option value="mosotho">Mosotho</option>
                                            <option value="motswana">Motswana</option>
                                            <option value="mozambican">Mozambican</option>
                                            <option value="namibian">Namibian</option>
                                            <option value="nauruan">Nauruan</option>
                                            <option value="nepalese">Nepalese</option>
                                            <option value="new zealander">New Zealander</option>
                                            <option value="ni-vanuatu">Ni-Vanuatu</option>
                                            <option value="nicaraguan">Nicaraguan</option>
                                            <option value="nigerien">Nigerien</option>
                                            <option value="north korean">North Korean</option>
                                            <option value="northern irish">Northern Irish</option>
                                            <option value="norwegian">Norwegian</option>
                                            <option value="omani">Omani</option>
                                            <option value="pakistani">Pakistani</option>
                                            <option value="palauan">Palauan</option>
                                            <option value="panamanian">Panamanian</option>
                                            <option value="papua new guinean">Papua New Guinean</option>
                                            <option value="paraguayan">Paraguayan</option>
                                            <option value="peruvian">Peruvian</option>
                                            <option value="polish">Polish</option>
                                            <option value="portuguese">Portuguese</option>
                                            <option value="qatari">Qatari</option>
                                            <option value="romanian">Romanian</option>
                                            <option value="russian">Russian</option>
                                            <option value="rwandan">Rwandan</option>
                                            <option value="saint lucian">Saint Lucian</option>
                                            <option value="salvadoran">Salvadoran</option>
                                            <option value="samoan">Samoan</option>
                                            <option value="san marinese">San Marinese</option>
                                            <option value="sao tomean">Sao Tomean</option>
                                            <option value="saudi">Saudi</option>
                                            <option value="scottish">Scottish</option>
                                            <option value="senegalese">Senegalese</option>
                                            <option value="serbian">Serbian</option>
                                            <option value="seychellois">Seychellois</option>
                                            <option value="sierra leonean">Sierra Leonean</option>
                                            <option value="singaporean">Singaporean</option>
                                            <option value="slovakian">Slovakian</option>
                                            <option value="slovenian">Slovenian</option>
                                            <option value="solomon islander">Solomon Islander</option>
                                            <option value="somali">Somali</option>
                                            <option value="south african">South African</option>
                                            <option value="south korean">South Korean</option>
                                            <option value="spanish">Spanish</option>
                                            <option value="sri lankan">Sri Lankan</option>
                                            <option value="sudanese">Sudanese</option>
                                            <option value="surinamer">Surinamer</option>
                                            <option value="swazi">Swazi</option>
                                            <option value="swedish">Swedish</option>
                                            <option value="swiss">Swiss</option>
                                            <option value="syrian">Syrian</option>
                                            <option value="taiwanese">Taiwanese</option>
                                            <option value="tajik">Tajik</option>
                                            <option value="tanzanian">Tanzanian</option>
                                            <option value="thai">Thai</option>
                                            <option value="togolese">Togolese</option>
                                            <option value="tongan">Tongan</option>
                                            <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                                            <option value="tunisian">Tunisian</option>
                                            <option value="turkish">Turkish</option>
                                            <option value="tuvaluan">Tuvaluan</option>
                                            <option value="ugandan">Ugandan</option>
                                            <option value="ukrainian">Ukrainian</option>
                                            <option value="uruguayan">Uruguayan</option>
                                            <option value="uzbekistani">Uzbekistani</option>
                                            <option value="venezuelan">Venezuelan</option>
                                            <option value="vietnamese">Vietnamese</option>
                                            <option value="welsh">Welsh</option>
                                            <option value="yemenite">Yemenite</option>
                                            <option value="zambian">Zambian</option>
                                            <option value="zimbabwean">Zimbabwean</option>
                                        </select>
                                    </div>
                                    {this.state.nationality.length !== 0 ? <button onClick={this.handleSubmissionNationality} className="btn blue-btn" style={{ color: "white", width: "100%", marginBottom: "30px" }}>Submit Nationality Changes</button> : null}
                                </div>

                                <div className="col-xl-12">
                                    <div className="submit-field">
                                        <h5>Introduce Yourself</h5>
                                        <textarea onChange={(e) => {
                                            this.setState({
                                                introduction: e.target.value
                                            })
                                        }} value={this.state.introduction} placeholder={"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."} cols="30" rows="5" className="with-border"></textarea>
                                    </div>
                                </div>
                                {this.state.introduction.length !== 0 ? <button onClick={this.handleSubmissionAbout} className="btn blue-btn" style={{ color: "white", width: "100%" }}>Submit Introduction Changes</button> : null}
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
               
            </div>
            
            </div>
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
        const obj = state.auth;
        if (obj.authenticated.hasOwnProperty("email")) {
            return {
                username: state.auth.authenticated.username
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, { })(ProfileHelperSettingOne));